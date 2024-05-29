import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Assignment } from '../../../../shared/models/assignment.model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssignmentService } from '../../../../shared/services/assignment/assignment.service';
import { environment } from '../../../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../shared/services/utils/notification.service';
import { ImageService } from '../../../../shared/services/utils/image.service';
import { CdkDragDrop, CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { RendAssignmentComponent } from '../../../../shared/components/modal/rend-assignment/rend-assignment.component';
import { UtilsService } from '../../../../shared/services/utils/utils.service';

@Component({
  selector: 'app-details-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    RouterLink,
    CdkDropList, CdkDrag
  ],
  templateUrl: './details-assignment.component.html',
  styleUrl: './details-assignment.component.css',
  providers : [
    DatePipe
  ]
})
export class DetailsAssignmentComponent implements OnInit {
  assignment !: Assignment;
  idAssigmnent !: string;
  img_uri !: string;
  loading : boolean = false;
  btnEdit : any;

  headTitle : any;
  isAdminConnected : boolean = false;

  constructor(
    private router : Router ,
    private route : ActivatedRoute ,
    private assignmentService  : AssignmentService ,
    private utilsService : UtilsService,
    private notif : NotificationService,
    private datePipe : DatePipe,
    private dialog : MatDialog){
    this.img_uri = environment.baseUrlImg;
  }

  ngOnInit(): void {
    this.headTitle = {
      title : "Détails Assignment"
    }
    this.idAssigmnent =  this.route.snapshot.params['id'];
    this.btnEdit = {
      functionCall :  this.onEdit.bind(this),
      name : 'Edit'
    }
    this.getAssignment();
  }

  isAdmin() {
    if(localStorage.getItem('role')==="ADMIN" ){
      this.isAdminConnected=true;
    }
   }

  getAssignment(){
    this.isAdmin();

    this.loading = true;
    const succes = (response : Assignment | undefined)=>{
      if(response){
        this.assignment = response;

        this.loading = false;
      }
    }

    const error = (error : HttpErrorResponse)=>{
      this.notif.showWarning(error.message , "Get Assignment Error !");
      this.loading = false;
    }

    this.assignmentService.getAssignment(this.idAssigmnent).subscribe(succes , error);
  }


  onEdit(){
    this.router.navigate(['edit-assignment', this.idAssigmnent]);
  }

  drop(event: CdkDragDrop<Assignment>) {
    const dialogRef = this.dialog.open(RendAssignmentComponent ,
      {
        width : '800px',
        data : {
          assignment : this.assignment
        }
      }
    )

    dialogRef.afterClosed().subscribe((result : any)=>{
      if (result != null) {
        this.assignment = result;
        this.router.navigate(['assignment']);
      }
    })
  }

  async placeHoldImage(url :string ,section : string){
    const response = await this.utilsService.imageExists(url);
    if(response){

    }else{
    }

    return url
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

}
