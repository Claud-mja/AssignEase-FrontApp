import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { TeacherService } from '../../../../shared/services/teacher/teacher.service';

import { Teacher } from '../../../../shared/models/teacher.model';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-teacher-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,RouterModule],
  templateUrl: './teacher-update.component.html',
  styleUrl: './teacher-update.component.css'
})
export class TeacherUpdateComponent {
  baseUrl : string = environment.baseUrlImg;
  teacher!:Teacher;

  teacherForm = new FormGroup({
    nom: new FormControl('', [Validators.required]) ,
    prenom: new FormControl('', [Validators.required]),
  });
  profilForm !:FormGroup;

  fileToUpload!: File;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.initFormProfil();
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadTeacher(id);
    }
  }

  private initFormProfil(): void {
    this.profilForm = this.fb.group({
       photo: ['', Validators.required]
    });
  }

  async loadTeacher(id: number) {
    try {
      const tmp = await this.teacherService.getTeacherById(id).toPromise();
      console.log("dd",tmp);
      if (tmp) {
        if(tmp.status==403){
          this.router.navigate(['/login']);
        } else {
          this.teacher = tmp.data;
          this.teacherForm.patchValue({
            nom: this.teacher.nom,
            prenom: this.teacher.prenom
          });
        }

      }
    } catch (error) {
      console.error('Failed to load auteur', error);
    }
  }



  async onSubmit() {
    try {
      if (this.teacherForm.valid) {
        console.log('Teacher data:', this.teacherForm.value);
        const formData = new FormData();
        formData.append('nom', this.teacher.nom);
        formData.append('prenom', this.teacher.prenom);

        const result = await this.teacherService.updateTeacher(this.teacher._id,{nom:this.teacher.nom,prenom:this.teacher.prenom}).toPromise();
        if (result) {
          if (result.status == 200) {
            console.log('Teacher created successfully');
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

  async onSubmitProfile() {
    try {
      if (this.profilForm.valid) {
        const formData = new FormData();
      if (this.fileToUpload) {
        formData.append('photo', this.fileToUpload);
      }

        const result = await this.teacherService.updateProfilTeacher(this.teacher._id,formData).toPromise();
        if (result) {
          if (result.status == 200) {
            console.log('Teacher created successfully');
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
