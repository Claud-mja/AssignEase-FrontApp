import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Assignment } from '../../../../shared/models/assignment.model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssignmentService } from '../../../../shared/services/assignment/assignment.service';

@Component({
  selector: 'app-details-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    RouterLink
  ],
  templateUrl: './details-assignment.component.html',
  styleUrl: './details-assignment.component.css'
})
export class DetailsAssignmentComponent implements OnInit {
  assignment !: Assignment;
  idAssigmnent !: string;

  constructor(private router : Router , private route : ActivatedRoute , private assignmentService  : AssignmentService){}

  ngOnInit(): void {
    this.getAsssignment()
  }

  getAsssignment(){
    const id = this.route.snapshot.queryParamMap.get('id');
    if(id!=null){
      this.idAssigmnent = id;
    }
  }


  onEdit(){
    this.router.navigate(['edit-assignment', this.assignment?.id]);
  }

}
