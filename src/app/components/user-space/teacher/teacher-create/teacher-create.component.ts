import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../../shared/services/teacher/teacher.service';

import { Teacher } from '../../../../shared/models/teacher.model';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-teacher-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './teacher-create.component.html',
  styleUrl: './teacher-create.component.css'
})
export class TeacherCreateComponent {
  professeurForm!: FormGroup;
  fileToUpload!: File;

  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.professeurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      photo: ['', Validators.required]
      // Vous pouvez ajouter d'autres contrôles de formulaire ici
    });
  }

  async onSubmit() {
    try {
      if (this.professeurForm.valid) {
        console.log('Student data:', this.professeurForm.value);
        const formData = new FormData();
      formData.append('nom', this.professeurForm.get('nom')!.value);
      formData.append('prenom', this.professeurForm.get('prenom')!.value);
      if (this.fileToUpload) { // Vérifiez si un fichier est sélectionné
        formData.append('photo', this.fileToUpload);
      }


        const result = await this.teacherService.createTeacher(formData).toPromise();
        if (result) {
          if (result.status == 200) {
            console.log('Student created successfully');
            this.router.navigate(['/teacher']);
          } else {
            this.errorMessage = result.message;
          }
        }
      }
    } catch (error) {
      console.error('Failed to create auteur', error);
    }

  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  this.fileToUpload = file;
  }


}
