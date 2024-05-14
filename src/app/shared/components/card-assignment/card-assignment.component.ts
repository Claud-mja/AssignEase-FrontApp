import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Assignment } from '../../models/assignment.model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule],
  templateUrl: './card-assignment.component.html',
  styleUrl: './card-assignment.component.css'
})
export class CardAssignmentComponent implements OnInit {

  @Input() assignment : Assignment | undefined;
  image_uri !: string;

  constructor(private router : Router){
    this.image_uri = environment.baseUrlImg
  }

  ngOnInit(): void {
    
  }

  onDetails(){
    this.router.navigate(['details-assignment' , this.assignment?._id])
  }
}
