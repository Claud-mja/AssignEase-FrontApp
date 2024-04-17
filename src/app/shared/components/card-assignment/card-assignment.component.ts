import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Assignment } from '../../models/assignment.model';

@Component({
  selector: 'app-card-assignment',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-assignment.component.html',
  styleUrl: './card-assignment.component.css'
})
export class CardAssignmentComponent implements OnInit {

  @Input() assignment : Assignment | undefined;

  constructor(){}

  ngOnInit(): void {
    console.log(this.assignment," assigmeny");
    
  }
}
