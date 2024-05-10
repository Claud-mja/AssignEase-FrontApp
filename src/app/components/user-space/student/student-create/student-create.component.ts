import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute,Router } from '@angular/router';
import { AuteurService } from '../../../../shared/services/auteur/auteur.service';

import { Auteur } from '../../../../shared/models/auteur.model';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {
  nom!:string;
  errorMessage!: string;

  createStudentForm = new FormGroup({
    nom: new FormControl('', [Validators.required])  // Renommez `name` en `nom` pour correspondre au template
  });


  constructor(
    private auteurService: AuteurService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  async ngOnInit() {

  }


  async submit() {
    try {
    if (this.createStudentForm.valid) {
      console.log('Student data:', this.createStudentForm.value);
      const result= await this.auteurService.createAuteur({nom:this.nom}).toPromise();
      if(result){
        if(result.status==200){
          console.log('Student created successfully');
          this.router.navigate(['/student']);
        } else {
          this.errorMessage = result.message;
        }
      }
    }
  } catch (error) {
    console.error('Failed to create auteur', error);
  }

  }
}
