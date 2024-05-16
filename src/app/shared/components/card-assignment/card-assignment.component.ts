import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Assignment } from '../../models/assignment.model';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule, DatePipe } from '@angular/common';
import { UtilsService } from '../../services/utils/utils.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';

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

  constructor(private router : Router ,private datePipe: DatePipe, private utilsService : UtilsService){
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
      const day = parseInt(dateParts[0]);
      const date = new Date(year, month, day);
      return this.datePipe.transform(date, 'EEE, dd MMM yyyy', 'fr');
    }
    return ''; 
  }

  onImageError(event: Event , section : string): void {
    console.log(event);
    
    this.utilsService.handleImageError(event , section);
  }


}
