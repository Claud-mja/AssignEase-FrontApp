import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assignment } from '../../../models/assignment.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../header/header.component';
import { AssignmentService } from '../../../services/assignment/assignment.service';
import { NotificationService } from '../../../services/utils/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { BtnSpinerComponent } from '../../btn-spiner/btn-spiner.component';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-rend-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    HeaderComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    BtnSpinerComponent
  ],
  templateUrl: './rend-assignment.component.html',
  styleUrl: './rend-assignment.component.css'
})
export class RendAssignmentComponent implements OnInit {

  rendAssignForm !: FormGroup;
  assignment !: Assignment;
  loading : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RendAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { assignment : Assignment; },
    private fb:FormBuilder,
    private assignmentService : AssignmentService,
    private utilsService : UtilsService,
    private notif : NotificationService
  ){}

  ngOnInit(): void {
    this.assignment = this.data.assignment;
    this.initForm();
  }


  onDisagreeClick(){
    this.dialogRef.close(null);
  }

  onAgreeClick(){
    this.loading = true;
    if(this.rendAssignForm.valid){
      const success = (response : any)=>{
        this.notif.showSuccess("Assignment modifié avec success ! ", 'Modification d\'assignment ');
        this.loading = false;
        this.dialogRef.close(this.assignment);
      }

      const error = (responseError : HttpErrorResponse) =>{
        const httpError = responseError.error;
        const message = "Modification "+httpError.error;
        this.utilsService.handleError(httpError.status , message , "Modification d'assignment");
        this.loading = false;
        this.dialogRef.close(null);
      } 
      
      this.assignment = {... this.assignment ,... this.rendAssignForm.value ,  rendu : true};
      this.assignmentService.updateAssignment(this.assignment).subscribe(success , error);
    }
  }

  initForm(){
    this.rendAssignForm = this.fb.group({
      note: [this.assignment.note ? this.assignment.note : 0 , [Validators.required, Validators.min(0), Validators.max(20)]],
      remarques: [this.assignment.remarques ? this.assignment.remarques : '']
    })
  }


}
