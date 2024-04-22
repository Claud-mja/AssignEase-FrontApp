import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { Assignment } from '../../../../shared/models/assignment.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-edit-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    HeaderComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  templateUrl: './add-edit-assignment.component.html',
  styleUrl: './add-edit-assignment.component.css',
  providers : [provideNativeDateAdapter()]
})
export class AddEditAssignmentComponent implements OnInit {
  assignment : Assignment = new Assignment();

  
  matiers= [
    'Base de donné',
    'Intelligence artificielle',
    'Grails',
  ]
  filtredMatiere : string[] = [];
  filtredAuteur : string[] = [];
  selectedMatiere : string = '';
  selectdAuteur : string = '';
  
  constructor(){}

  ngOnInit(): void {
    this.filtredMatiere = this.matiers;
    this.filtredAuteur = this.matiers;
  }


  onFilterMatiere(event: Event){
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.filtredMatiere = this.matiers.filter((matiere) => matiere.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.filtredMatiere = this.matiers; 
    }
  }

  onFilterAuteur(event: Event){
    const value = (event.target as HTMLInputElement).value;
    console.log("Matiere ==> ", this.matiers);
    
    if (value) {
      this.filtredAuteur = this.matiers.filter((matiere) => matiere.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.filtredAuteur = this.matiers; 
    }
  }

}
