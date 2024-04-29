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
import { Router } from '@angular/router';

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
    CardAssignmentComponent,
    HeaderComponent,
    ScrollingModule,
    
  ],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent implements OnInit {

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  assignments !: Assignment[];
  currentData !: Assignment[]; 
  pageSize: number = 20; 
  totalPages: number = 0; 
  currentPage: number = 1; 
  page = 0;

  constructor(private assignmentService : AssignmentService,private router : Router){}

  ngOnInit(): void {
    this.assignmentService.getAssignment().subscribe((assignmets : Assignment[])=>{
      this.assignments = assignmets;
      this.totalPages = Math.ceil(this.assignments.length / this.pageSize);
    this.updateCurrentData();
      console.log(this.assignments[0]);
      
    });
  }

  updateCurrentData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentData = this.assignments.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentData();
    }
  }

  onAdd(){
    this.router.navigate(['add-assignment'])
  }

}
