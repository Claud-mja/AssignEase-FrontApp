import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auteur } from '../../../../shared/models/auteur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../shared/services/utils/notification.service';
import { UtilsService } from '../../../../shared/services/utils/utils.service';
import { AuteurService } from '../../../../shared/services/auteur/auteur.service';
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

@Component({
  selector: 'app-add-edit-auteur',
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
  templateUrl: './add-edit-auteur.component.html',
  styleUrl: './add-edit-auteur.component.css'
})
export class AddEditAuteurComponent implements OnInit {

  auteur : Auteur = new Auteur();
  auteurForm !: FormGroup;
  headTitle : any;

  img_uri !: string;
  imageFile !: File;

  dataChecked : any = {state : '' , message :'' }

  configUpload : any = {
    label: 'Upload your image file',
    button: 'Browse upload',
    tools : 'auteur'
  }

  loadingAction : boolean = false;

  constructor(
    private route : ActivatedRoute ,
    private roter : Router,
    private notif : NotificationService ,
    private auteurService : AuteurService ,
    private utilsService : UtilsService,
    private fb : FormBuilder){
      this.img_uri = environment.baseUrlImg;
    }

  ngOnInit(): void {
    this.headTitle = {
      title : "Ajout de Auteur"
    }
    const idAuteur = this.route.snapshot.params['id'];
    this.headTitle = {
      title : idAuteur ? "Modif d'Auteur" :  "Ajout d'Auteur"
    }
    this.initData()
    if(idAuteur){
      this.getAuteur(idAuteur);
    }
  }

  initData(){
    this.initForm();
  }

  initForm(){
    this.auteurForm = this.fb.group({
      nom: [this.auteur.nom ? this.auteur.nom : '', [Validators.required , Validators.max(25) , Validators.min(5)]],
      photo : [this.auteur.photo ? this.auteur.photo : '']
    });
  }

  getAuteur(id : string){
    const success = (response : Auteur)=>{
      this.auteur = response;
      this.initForm();
      if (this.auteur.photo.trim()!='') {
        this.img_uri = `${this.img_uri}/auteur/${this.auteur.photo}`
        this.dataChecked = {
          state : 'success',
          message: 'Successfully uploaded',
        }
      }
    }

    const error = (error : HttpErrorResponse) =>{
      this.notif.showWarning(error.message,"Erreur de recuperation de Auteur")
    }
    this.auteurService.getAuteur(id).subscribe(success , error);
  }

  saveAuteur(){
    if(this.auteurForm.valid){
      this.loadingAction =  true;
      this.auteur = this.auteurForm.value;

      const success = (response : any)=>{
        this.loadingAction = false;
        this.notif.showSuccess("Auteur ajouté avec success ! ", 'Ajout de Auteur ');
        this.roter.navigate(['auteur']);
      }

      const error = (error : HttpErrorResponse) =>{
        this.loadingAction = false;
        const httpError = error.error;
        const message = "Ajout "+httpError.error;
        console.log(message);
        this.utilsService.handleError(httpError.status , message , "Ajout de Auteur");
      }
      this.auteurService.addAuteur(this.auteur, this.imageFile).subscribe(success , error);
    }
  }

  updateAuteur(){
    if(this.auteurForm.valid){
      this.loadingAction =  true;
      const success = (response : any)=>{
        this.loadingAction = false;
        this.notif.showSuccess("Auteur modifié avec success ! ", 'Modification de Auteur');
        this.roter.navigate(['auteur']);
      }

      const error = (responseError : HttpErrorResponse) =>{
        this.loadingAction = false;
        const httpError = responseError.error;
        const message = "Modification "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Ajout de Auteur");
      }
      const photo = this.auteur.photo;
      this.auteur = {_id : this.auteur._id ,... this.auteurForm.value};
      this.auteurService.updateAuteur(this.auteur , this.imageFile , photo).subscribe(success , error);
    }
  }

  onChangeFile(file : File){
    this.imageFile = file;
    this.auteurForm.value['photo'] = file.name;
  }

}
