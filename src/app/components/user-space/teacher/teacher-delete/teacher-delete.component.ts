import { Component } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute,Router,RouterModule } from '@angular/router';
import { TeacherService } from '../../../../shared/services/teacher/teacher.service';

import { Teacher } from '../../../../shared/models/teacher.model';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-teacher-delete',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './teacher-delete.component.html',
  styleUrl: './teacher-delete.component.css'
})
export class TeacherDeleteComponent {
  teacher!:Teacher;
  errorMessage!: string;

  teacherForm = new FormGroup({
    nom: new FormControl('', [Validators.required])  // Renommez `name` en `nom` pour correspondre au template
  });

  constructor(
    private teacherService: TeacherService,
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
      const tmp = await this.teacherService.getTeacherById(id).toPromise();
      if (tmp) {
        this.teacher = tmp.data;
        this.teacherForm.patchValue({
          nom: this.teacher.nom
        });
      }
    } catch (error) {
      console.error('Failed to load auteur', error);
    }
  }

  async submit() {
    try {
      const result= await this.teacherService.deleteTeacher(this.teacher._id).toPromise();
      if(result){
        if(result.status==200){
          console.log('Student updated successfully');
          this.router.navigate(['/teacher']);
        } else {
          this.errorMessage = result.message;
        }
      }
  } catch (error) {
    console.error('Failed to load auteur', error);
  }

  }
}
