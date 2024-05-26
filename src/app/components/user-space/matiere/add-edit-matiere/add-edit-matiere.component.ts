import { Component, OnInit } from '@angular/core';
import { Matiere } from '../../../../shared/models/matiere.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../shared/services/utils/notification.service';
import { MatiereService } from '../../../../shared/services/matiere/matiere.service';
import { Teacher } from '../../../../shared/models/teacher.model';
import { TeacherService } from '../../../../shared/services/teacher/teacher.service';
import { environment } from '../../../../../environments/environment';
import { UploadFileComponent } from '../../../../shared/components/upload-file/upload-file.component';
import { UtilsService } from '../../../../shared/services/utils/utils.service';

@Component({
  selector: 'app-add-edit-matiere',
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
    ReactiveFormsModule,
    UploadFileComponent
  ],
  templateUrl: './add-edit-matiere.component.html',
  styleUrl: './add-edit-matiere.component.css'
})
export class AddEditMatiereComponent implements OnInit {

  matiere : Matiere = new Matiere();
  matiereForm !: FormGroup;
  headTitle : any;

  professeurs !: Teacher[];
  filterProfs !: Teacher[];

  img_uri !: string;
  imageFile !: File;

  dataChecked : any = {state : '' , message :'' }

  configUpload : any = {
    label: 'Upload your image file',
    button: 'Browse upload',
    tools : 'matiere'
  }

  constructor(
      private route : ActivatedRoute ,
      private router : Router, 
      private notif : NotificationService , 
      private matiereService : MatiereService , 
      private teacherService : TeacherService ,
      private utilsService : UtilsService, 
      private fb : FormBuilder){
        this.img_uri = environment.baseUrlImg;
  }

  ngOnInit(): void {
    this.headTitle = {
      title : "Ajout de Matière"
    }
    const idMatiere = this.route.snapshot.params['id'];
    this.initData()
    if(idMatiere){
      this.getMatiere(idMatiere);
    }
  }

  initData(){
    this.initForm();
    this.getPorfesseur();
  }

  initForm(){
    this.matiereForm = this.fb.group({
      nom: [this.matiere.nom ? this.matiere.nom : '', Validators.required],
      prof : [this.matiere.prof ? this.matiere.prof : '', Validators.required],
      image : [this.matiere.image ? this.matiere.image : '']
    });
  }

  getMatiere(id : string){
    const success = (response : Matiere)=>{
      this.matiere = response;
      
      this.initForm();
      if (this.matiere.image.trim()!='') {
        this.img_uri = `${this.img_uri}/matiere/${this.matiere.image}`
        this.dataChecked = {
          state : 'success',
          message: 'Successfully uploaded',
        }
      }
    }

    const error = (error : HttpErrorResponse) =>{
      this.notif.showWarning(error.message,"Erreur d'ajout de get Matiere")
    }
    this.matiereService.getMatiere(id).subscribe(success , error);
  }

  getPorfesseur(){
    const success = (response : Teacher[])=>{
      this.professeurs = response;
      this.filterProfs  = response;
    }

    const error = (error : HttpErrorResponse) =>{
      this.notif.showWarning(error.message,"Erreur de get Matiere")
    }
    this.teacherService.getTeachers().subscribe(success , error);
  }

  onFilterProf(event: Event){
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.filterProfs = this.professeurs.filter((prof : Teacher) => prof.nom.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.filterProfs = this.professeurs; 
    }
    this.onIputProfSelect(value);
  }

  onIputProfSelect(value :string ){
    if(value){
      const prof = this.profExist(value);
      if (prof) {
        this.matiere.prof = prof;
      }
    }
  }

  profExist(value : string):Teacher | undefined {
    const prof = this.professeurs.find((prof : Teacher) => prof.nom.toLowerCase().includes(value.toLowerCase()));
    return prof;
  }

  displayProf(prof: Teacher): string {
    return prof && prof.nom ? prof.nom : '';
  }

  saveMatiere(){
    if(this.matiereForm.valid){
      this.matiere = this.matiereForm.value;

      const success = (response : any)=>{
        this.notif.showSuccess("Matiere ajouté avec success ! ", 'Ajout d\'Matiere ');
        this.router.navigate(['matiere']);
      }

      const error = (error : HttpErrorResponse) =>{
        const httpError = error.error;
        const message = "Ajout "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Ajout de Matière");
      }

      this.matiereService.addMatiere(this.matiere, this.imageFile).subscribe(success , error);
    }
  }

  updateMatiere(){
    if(this.matiereForm.valid){
      const success = (response : any)=>{
        this.notif.showSuccess("Matiere modifié avec success ! ", 'Modification d\'Matiere ');
        this.router.navigate(['matiere']);
      }

      const error = (error : HttpErrorResponse) =>{
        const httpError = error.error;
        const message = "Modification "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Modification de Matière");
      }
      
      const image = this.matiere.image; 
      this.matiere = {_id : this.matiere._id ,... this.matiereForm.value};
      this.matiereService.updateMatiere(this.matiere , this.imageFile , image).subscribe(success , error);
    }
  }

  isFormDirty(): boolean {
    return !this.matiereForm.pristine && !this.isFormValueEqualToMatiere();
  }
  
  private isFormValueEqualToMatiere(): boolean {
    const formValue = this.matiereForm.value;
    return formValue.nom === this.matiere.nom
      && formValue.prof === this.matiere.prof
      && formValue.image === this.matiere.image;
  }

  onChangeFile(file : File){
    this.imageFile = file;
    this.matiereForm.value['image'] = file.name;
  }

} 
