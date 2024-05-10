import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Assignment } from '../../../../shared/models/assignment.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
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
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-edit-assignment.component.html',
  styleUrl: './add-edit-assignment.component.css',
  providers : [provideNativeDateAdapter()]
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

  loading : any = {
    matiere : false,
    auteur : false
  }

  isDisabled : boolean = true;
  
  constructor(private matiereService : MatiereService , 
              private auteurService : AuteurService , 
              private notif : NotificationService, 
              private fb: FormBuilder,
              private assignmentService : AssignmentService ){
    this.img_uri = environment.baseUrlImg
  }

  ngOnInit(): void {
    this.initForm();
    this.getMatieres();
    this.getAuteurs();
  }

  initForm(){
    this.assignmentForm = this.fb.group({
      nom: [this.assignment ? this.assignment.nom : '', Validators.required],
      dateDeRendu: [this.assignment ? this.assignment.dateDeRendu : '', Validators.required],
      note: [this.assignment.note ? this.assignment.note : 0 , [Validators.required, Validators.min(0), Validators.max(20)]],
      rendu: [this.assignment.rendu ? this.assignment.rendu : false],
      matiere: [this.assignment.matiere ? this.assignment.matiere : '', Validators.required],
      auteur: [this.assignment.auteur ? this.assignment.auteur : '', Validators.required],
      remarques: [this.assignment.remarques ? this.assignment.remarques : '']
    });
  }


  getMatieres(){
    this.loading.matiere = true;
    const success = (reponse : ResponseListPaginate)=>{
      this.filtredMatiere = reponse.docs as Matiere[];
      this.matiers = reponse.docs as Matiere[];
      console.log(this.filtredMatiere);
      
      this.loading.matiere = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.notif.showWarning(error.message , 'Get matieres error')
      this.loading.matiere = false;
    }

    this.matiereService.getMatieres().subscribe(success, error);
  }

  getAuteurs(){
    this.loading.auteur = true;
    const success = (reponse : ResponseListPaginate)=>{
      this.filtredAuteur = reponse.docs as Auteur[];
      this.auteurs = reponse.docs as Auteur[];
      this.loading.auteur = false;
    }

    const error = (error : HttpErrorResponse)=>{
      this.notif.showWarning(error.message , 'Get auteurs error')
      this.loading.auteur = false;
    }

    this.auteurService.getAuteurs().subscribe(success, error);
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

  saveAssignment(){
    if(this.assignmentForm.valid){
      this.assignment = this.assignmentForm.value;

      const success = (response : any)=>{
        this.notif.showSuccess("Assignment ajouté avec success ! ", 'Ajout d\'assignment ');
      }

      const error = (error : HttpErrorResponse) =>{
        this.notif.showWarning(error.message,"Erreur d'ajout de Assignment")
      }

      this.assignmentService.addAssignment(this.assignment).subscribe(success , error);
    }
  }

}
