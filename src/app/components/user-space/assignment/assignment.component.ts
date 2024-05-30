import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CardAssignmentComponent } from '../../../shared/components/card-assignment/card-assignment.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Assignment } from '../../../shared/models/assignment.model';
import { AssignmentService } from '../../../shared/services/assignment/assignment.service';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ResponseListPaginate } from '../../../shared/interfaces/ResponseListPaginate';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../shared/services/utils/notification.service';
import { environment } from '../../../../environments/environment';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PaginatorModule } from 'primeng/paginator'
import { HeaderConfig } from '../../../shared/interfaces/Header-config';
import { UtilsService } from '../../../shared/services/utils/utils.service';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    ScrollingModule,
    RouterLink,
    CardAssignmentComponent,
    SpinnerComponent,
    HeaderComponent,
    PaginatorModule
  ],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent implements OnInit {

  isAdminConnected : boolean = false;
  assignments !: Assignment[];
  loading : any = {
    data : false
  }

  headerConfig !: HeaderConfig;
  headTitle : any;

  //pagination
  page = 1;
  rows = 12;
  first =0;
  limit = 12;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  constructor(private assignmentService : AssignmentService,
              private router : Router ,
              private utilsService : UtilsService,
              private route: ActivatedRoute ,
              private notif : NotificationService){ }

  ngOnInit(): void {
    this.headTitle = {
      title : "Liste des assignments"
    }
    this.initHeaderConfig();
    this.getAssignments();

    this.assignmentService.refreshList$.subscribe(()=>{
      this.initPaginationData();
      this.getAssignments();
    })
  }

  isAdmin() {
    if(localStorage.getItem('role')==="ADMIN" ){
      this.isAdminConnected=true;
    }
   }

  getAssignments(){
    this.isAdmin();
    this.loading['data'] = true;
    const success = (response: ResponseListPaginate)=>{
      this.assignments = response.docs as Assignment[];
      this.totalDocs = response.totalDocs;
      this.totalPages = response.totalPages;
      this.nextPage = response.nextPage;
      this.prevPage = response.prevPage;
      this.hasNextPage = response.hasNextPage;
      this.hasPrevPage = response.hasPrevPage;
      this.loading['data'] = false;

      // this.notif.showSuccess('Assignments Chargé avec succes !', 'Liste assignment');
    }

    const error = (error : HttpErrorResponse) => {
      this.loading['data'] = false;
      console.log(localStorage.getItem('token'));
      
      this.utilsService.handleError(error.status , error.error.message , "List assignment !")
    }

    this.assignmentService.getAssignmentsPagines(this.page , this.limit , this.headerConfig).subscribe(success , error);
  }


  onAdd(){
    this.router.navigate(['add-assignment'] , { relativeTo: this.route })
  }



   // Pour la pagination
   pagePrecedente() {
      this.page = this.prevPage;
      this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.limit = event.rows;
    this.page = event.page+1;
    this.getAssignments();

  }

  initHeaderConfig(){
    this.headerConfig = {
      fields : [
        { name : 'nom' , type : 'string'  },
        { name : 'rendu' , type : 'boolean'  },
        { name : 'note' , type : 'number'  },
        { name : 'dateDeRendu' , type : 'date'  }
      ],
      sorts : [],
      labels : {
        nom :  'Nom',
        rendu : 'Est Rendu',
        note : "Note",
        dateDeRendu : "Date de Rendue"
      },
      filters : []
    }
  }

  initPaginationData(){
    this.page = 1 ;
    this.rows = 12;
    this.first =0;
    this.limit = 12;
  }

  onFilter(event : HeaderConfig){
    this.page = 1 ;
    this.getAssignments();
  }

}
