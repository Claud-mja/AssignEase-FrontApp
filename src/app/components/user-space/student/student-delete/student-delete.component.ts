import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { AuteurService } from '../../../../shared/services/auteur/auteur.service';

import { Auteur } from '../../../../shared/models/auteur.model';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-student-delete',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './student-delete.component.html',
  styleUrl: './student-delete.component.css'
})
export class StudentDeleteComponent {
 student!:Auteur;
  errorMessage!: string;

  studentForm = new FormGroup({
    nom: new FormControl('', [Validators.required])  // Renommez `name` en `nom` pour correspondre au template
  });


  constructor(
    private auteurService: AuteurService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadAuteur(id);
    }
  }

  async loadAuteur(id: number) {
    try {
      const tmp = await this.auteurService.getAuteurById(id).toPromise();
      if (tmp) {
        this.student = tmp.data;
        this.studentForm.patchValue({
          nom: this.student.nom
        });
      }
    } catch (error) {
      console.error('Failed to load auteur', error);
    }
  }

  async submit() {
    try {
      const result= await this.auteurService.deleteAuteur(this.student._id).toPromise();
      if(result){
        if(result.status==200){
          console.log('Student updated successfully');
          this.router.navigate(['/student']);
        } else {
          this.errorMessage = result.message;
        }
      }
  } catch (error) {
    console.error('Failed to load auteur', error);
  }

  }
}
