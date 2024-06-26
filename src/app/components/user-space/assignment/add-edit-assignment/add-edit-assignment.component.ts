import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule  } from "@angular/material/datepicker";
import { Assignment } from '../../../../shared/models/assignment.model';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Matiere } from '../../../../shared/models/matiere.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatiereService } from '../../../../shared/services/matiere/matiere.service';
import { AuteurService } from '../../../../shared/services/auteur/auteur.service';
import { NotificationService } from '../../../../shared/services/utils/notification.service';
import { Auteur } from '../../../../shared/models/auteur.model';
import { ResponseListPaginate } from '../../../../shared/interfaces/ResponseListPaginate';
import { environment } from '../../../../../environments/environment';
import { AssignmentService } from '../../../../shared/services/assignment/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../shared/services/utils/utils.service';

@Component({
  selector: 'app-add-edit-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    HeaderComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-assignment.component.html',
  styleUrl: './add-edit-assignment.component.css',
  providers : [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    DatePipe
  ]
})
export class AddEditAssignmentComponent implements OnInit {
  assignment : Assignment = new Assignment();
  assignmentForm !: FormGroup;
  matiers !: Matiere[];
  auteurs !: Auteur[];
  filtredMatiere !: Matiere[];
  filtredAuteur !: Auteur[];
  img_uri !: string;

  selectedMatiere : string = '';
  selectdAuteur : string = '';

  headTitle : any;

  loading : any = {
    matiere : false,
    auteur : false
  }

  loadingAction : boolean = false;

  isDisabled : boolean = true;

  constructor(private matiereService : MatiereService ,
              private auteurService : AuteurService ,
              private notif : NotificationService,
              private fb: FormBuilder,
              private assignmentService : AssignmentService,
              private datePipe: DatePipe,
              private utilsService : UtilsService,
              private router : Router,
              private activeRoute : ActivatedRoute  ){
    this.img_uri = environment.baseUrlImg;
  }

  ngOnInit(): void {
    this.headTitle = {
      title : "Ajout d'assignment"
    }
    const id = this.activeRoute.snapshot.params['id'];
    this.initData();
    if (id) {
      this.headTitle = {
        title : "Modifié un assignment"
      }
      this.getAssignment(id)
    }
  }

  getAssignment(id : string){
    const succes = (response : Assignment | undefined)=>{
      if(response){
        this.assignment = response;
        this.initForm();
      }
    }

    const error = (error : HttpErrorResponse)=>{
      this.notif.showWarning(error.message , "Get Assignment Error !");
    }

    this.assignmentService.getAssignment(id).subscribe(succes , error);
  }

  initData(){
    this.initForm();
    this.getMatieres();
    this.getAuteurs();
  }

  initForm(){
    this.assignmentForm = this.fb.group({
      nom: [this.assignment ? this.assignment.nom : '', Validators.required],
      dateDeRendu: [this.assignment.dateDeRendu ?   this.constructDate(this.assignment.dateDeRendu) : '', Validators.required],
      note: [this.assignment.note ? this.assignment.note : 0 , [Validators.required, Validators.min(0), Validators.max(20)]],
      rendu: [this.assignment.rendu ? this.assignment.rendu : false],
      matiere: [this.assignment.matiere ? this.assignment.matiere : '', Validators.required],
      auteur: [this.assignment.auteur ? this.assignment.auteur : '', Validators.required],
      remarques: [this.assignment.remarques ? this.assignment.remarques : '']
    });
  }

  constructDate(dateStr : string){
    if (dateStr) {
      const dateParts = dateStr.split('-');
      const year = parseInt(dateParts[2]);
      const month = parseInt(dateParts[1]) - 1; // Les mois dans JavaScript sont 0-indexés, donc on soustrait 1
      const day = parseInt(dateParts[0])+1;
      const date = new Date(year, month, day);
      return this.datePipe.transform(date, 'yyyy-MM-dd')
    }
    return new Date();
  }


  getMatieres(){
    this.loading.matiere = true;
    const success = (response : any)=>{
      this.filtredMatiere = response.docs ? response.docs  : response as Matiere[];
      this.matiers = response.docs ?  response.docs  : response as Matiere[];

      this.loading.matiere = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.handleError(error.status , error.error.message , "Get matieres assignment !")
      this.loading.matiere = false;
    }

    this.matiereService.getMatieres().subscribe(success, error);
  }

  getAuteurs(){
    this.loading.auteur = true;
    const success = (reponse : Auteur[])=>{
      this.filtredAuteur = reponse;
      this.auteurs = reponse;
      this.loading.auteur = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.utilsService.handleError(error.status , error.error.message , "Get auteurs assignment !")
      this.loading.auteur = false;
    }

    this.auteurService.getStudents().subscribe(success, error);
  }

  onFilterMatiere(event: Event){
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.filtredMatiere = this.matiers.filter((matiere : Matiere) => matiere.nom.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.filtredMatiere = this.matiers;
    }
    this.onIputMatSelect(value);
  }

  onFilterAuteur(event: Event){
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.filtredAuteur = this.auteurs.filter((auteur : Auteur) => auteur.nom.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.filtredAuteur = this.auteurs;
    }
    this.onIputAutSelect(value);
  }

  onChoiceMatiere(){
    const matiere = this.matiers.find((matiere : Matiere)  => matiere.nom.toLowerCase() == this.selectedMatiere.toLowerCase());
    if (matiere) {
      this.assignment.matiere = matiere;
    }
  }

  displayMatiere(matiere: Matiere): string {
    return matiere && matiere.nom ? matiere.nom : '';
  }

  displayAuteur(auteur : Auteur): string {
    return auteur && auteur.nom ? auteur.nom : '';
  }

  onIputMatSelect(value :string ){
    if(value){
      const matiere = this.matiereExist(value);
      if (matiere) {
        this.assignment.matiere = matiere;
      }
    }
  }

  onIputAutSelect(value :string ){
    if(value){
      const auteur = this.auteurExist(value);
      if (auteur) {
        this.assignment.auteur = auteur;
      }
    }
  }

  matiereExist(value : string):Matiere | undefined {
    const matiere = this.matiers.find((matiere : Matiere)=> matiere.nom.toLowerCase() === value.toLowerCase());
    return matiere;
  }

  auteurExist(value : string ):Auteur | undefined{
      const  auteur = this.auteurs.find((auteur : Auteur)=> auteur.nom.toLowerCase() === value.toLowerCase());
      return auteur;
  }

  isFormDirty(): boolean {
    return !this.assignmentForm.pristine && !this.isFormValueEqualToAssignment();
  }

  private isFormValueEqualToAssignment(): boolean {
    const formValue = this.assignmentForm.value;
    return formValue.nom === this.assignment.nom
      && formValue.dateDeRendu === this.assignment.dateDeRendu
      && formValue.note === this.assignment.note
      && formValue.rendu === this.assignment.rendu
      && formValue.matiere === this.assignment.matiere._id
      && formValue.auteur === this.assignment.auteur._id
      && formValue.remarques === this.assignment.remarques;
  }

  saveAssignment(){
    if(this.assignmentForm.valid){
      this.loadingAction = true;
      this.assignment = this.assignmentForm.value;

      const success = (response : any)=>{
          this.loadingAction = false;
          this.notif.showSuccess("Assignment ajouté avec success ! ", 'Ajout d\'un Assignment ');
          this.router.navigate(['assignment']);
      }

      const error = (error : HttpErrorResponse) =>{
        this.loadingAction = false;
        const httpError = error.error;
        const message = "Ajout "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Ajout d\'un Assignment");
      }

      this.assignmentService.addAssignment(this.assignment).subscribe(success , error);
    }
  }

  updateAssignment(){
    if(this.assignmentForm.valid){
      this.loadingAction = true;
      const success = (response : any)=>{
          this.loadingAction = false;
          this.notif.showSuccess("Assignment modifié avec success ! ", 'Modification d\'un Assignment ');
          this.router.navigate(['assignment']);
      }

      const error = (error : HttpErrorResponse) =>{
        this.loadingAction = false;
        const httpError = error.error;
        const message = "Modification "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Modification d'Assignment");
      }

      this.assignment = {_id : this.assignment._id ,... this.assignmentForm.value};


      this.assignmentService.updateAssignment(this.assignment).subscribe(success , error);
    }
  }

  onImageError(event: Event, section : string): void {
    const imagHtml = event.target as HTMLImageElement;
    let defaultImageUrl = "assets/images";

    switch(section){
      case 'auteur':
        defaultImageUrl = `${defaultImageUrl}/etu.png`;
        break;
      case 'professeur':
        defaultImageUrl = `${defaultImageUrl}/prof.png`;
        break;
      case 'matiere':
        defaultImageUrl = `${defaultImageUrl}/matiere.png`;
        break;
    }
    imagHtml.src = defaultImageUrl;
  }

}
