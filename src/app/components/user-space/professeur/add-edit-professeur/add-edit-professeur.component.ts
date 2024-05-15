import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../../shared/models/teacher.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { MatiereService } from '../../../../shared/services/matiere/matiere.service';
import { TeacherService } from '../../../../shared/services/teacher/teacher.service';
import { NotificationService } from '../../../../shared/services/utils/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { UploadFileComponent } from '../../../../shared/components/upload-file/upload-file.component';
import { UtilsService } from '../../../../shared/services/utils/utils.service';

@Component({
  selector: 'app-add-edit-professeur',
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
    UploadFileComponent,
  ],
  templateUrl: './add-edit-professeur.component.html',
  styleUrl: './add-edit-professeur.component.css'
})
export class AddEditProfesseurComponent implements OnInit {

  professeur : Teacher = new Teacher();
  professeurForm !: FormGroup;
  headTitle : any;

  img_uri !: string;
  imageFile !: File;

  dataChecked : any = {state : '' , message :'' }

  configUpload : any = {
    label: 'Upload your image file',
    button: 'Browse upload'
  }

  constructor(
    private route : ActivatedRoute ,
    private roter : Router, 
    private notif : NotificationService , 
    private professeurService : TeacherService , 
    private utilsService : UtilsService,
    private fb : FormBuilder){
      this.img_uri = environment.baseUrlImg;
    }

  ngOnInit(): void {
    this.headTitle = {
      title : "Ajout de Professeur"
    }
    console.log(this.professeur._id);
    
    const idProfesseur = this.route.snapshot.params['id'];
    this.initData()
    if(idProfesseur){
      this.getProfesseur(idProfesseur);
    }
  }

  initData(){
    this.initForm();
  }

  initForm(){
    this.professeurForm = this.fb.group({
      nom: [this.professeur.nom ? this.professeur.nom : '', [Validators.required , Validators.max(25) , Validators.min(5)]],
      prenom: [this.professeur.prenom ? this.professeur.prenom : '', [Validators.required , Validators.max(15) , Validators.min(4)]],
      image : [this.professeur.photo ? this.professeur.photo : '']
    });
  }

  getProfesseur(id : string){
    const success = (response : Teacher)=>{
      this.professeur = response;
      console.log(response);
      
      this.initForm();
      if (this.professeur.photo.trim()!='') {
        this.img_uri = `${this.img_uri}/professeur/${this.professeur.photo}`
        this.dataChecked = {
          state : 'success',
          message: 'Successfully uploaded',
        }
      }
    }

    const error = (error : HttpErrorResponse) =>{
      this.notif.showWarning(error.message,"Erreur de recuperation de Professeur")
    }
    this.professeurService.getTeacherById(id).subscribe(success , error);
  }

  saveProfesseur(){
    if(this.professeurForm.valid){
      this.professeur = this.professeurForm.value;

      const success = (response : any)=>{
        this.notif.showSuccess("Professeur ajouté avec success ! ", 'Ajout de Professeur ');
        this.roter.navigate(['professeur']);
      }

      const error = (error : HttpErrorResponse) =>{
        const httpError = error.error;
        const message = "Ajout "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Ajout de Professeur");
      }
      this.professeurService.addProfesseur(this.professeur, this.imageFile).subscribe(success , error);
    }
  }

  updateProfesseur(){
    if(this.professeurForm.valid){
      const success = (response : any)=>{
        this.notif.showSuccess("Professeur modifié avec success ! ", 'Modification de Professeur');
        this.roter.navigate(['professeur']);
      }

      const error = (responseError : HttpErrorResponse) =>{
        const httpError = responseError.error;
        const message = "Modification "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Ajout de Professeur");
      } 
      
      this.professeur = {_id : this.professeur._id ,... this.professeurForm.value};
      this.professeurService.updateProfesseur(this.professeur , this.imageFile).subscribe(success , error);
    }
  }

  onChangeFile(file : File){
    this.imageFile = file;
    this.professeurForm.value['photo'] = file.name;
  }

}
