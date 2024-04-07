import { Component } from '@angular/core';
import { CardAssignmentComponent } from '../../../shared/card-assignment/card-assignment.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CardAssignmentComponent,

  ],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent {

}
