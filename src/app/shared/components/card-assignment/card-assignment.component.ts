import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Assignment } from '../../models/assignment.model';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { UtilsService } from '../../services/utils/utils.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../modal/confirmation/confirmation.component';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { NotificationService } from '../../services/utils/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card-assignment',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule],
  templateUrl: './card-assignment.component.html',
  styleUrl: './card-assignment.component.css',
  providers : [
    DatePipe 
  ]
})
export class CardAssignmentComponent implements OnInit {

  @Input() assignment : Assignment | undefined;
  image_uri !: string;

  constructor(private router : Router ,private datePipe: DatePipe, private utilsService : UtilsService,private dialog : MatDialog, private assigmnentService : AssignmentService, private notifs : NotificationService){
    this.image_uri = environment.baseUrlImg
  }

  ngOnInit(): void {
    
  }

  onDetails(){
    this.router.navigate(['details-assignment' , this.assignment?._id])
  }

  constructDate(){
    const dateAssignment = this.assignment?.dateDeRendu;
    
    if (dateAssignment) {
      const dateParts = dateAssignment.split('-');
      const year = parseInt(dateParts[2]);
      const month = parseInt(dateParts[1]) - 1; 
      const day = parseInt(dateParts[0])+1;
      const date = new Date(year, month, day);
      return this.datePipe.transform(date, 'EEE, dd MMM yyyy', 'fr');
    }
    return ''; 
  }

  onImageError(event: Event , section : string): void { 
    this.utilsService.handleImageError(event , section);
  }

  onDelete(){
    const dialodRef = this.dialog.open(ConfirmationComponent , 
      {
        width : "600px",
        data : {
          title : "Suppression d'Assignment",
          message : "Cette action supprimera l'assignement selectioné, voulez-vous poursuivre?"
        }
      }
    );

    dialodRef.afterClosed().subscribe((result : any)=> {
      if (result) {
        if (this.assignment) {
          this.assigmnentService.deleteAssignment(this.assignment._id).subscribe((response)=>{
            this.notifs.showSuccess("Suppression effectué !" , "Suppression d'assignment");
            this.assigmnentService.triggerRefreshList();
          },
          (error : HttpErrorResponse)=>{
            const httpError = error.error;
            
            const message = "Supression "+httpError.error;
            this.utilsService.handleError(httpError.status , message , "Supression d'Assignment");
          })
        }
      }
    })
  }


}
