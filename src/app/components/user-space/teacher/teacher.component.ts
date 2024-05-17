import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';

import { Teacher } from '../../../shared/models/teacher.model';

import { TeacherService } from '../../../shared/services/teacher/teacher.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [MatTableModule,RouterModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  teachers: Teacher[] = []; // Initialisez auteurs avec un tableau vide
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-firstname', 'demo-weight', 'demo-actions'];
  baseUrl : string = environment.baseUrlImg;
  constructor(private teacherService: TeacherService,private router: Router) { }

  ngOnInit():void{

    this.getAll();
  }

  async getAll(): Promise<void> {
    try {
      const auteursData = await this.teacherService.getTeachers().toPromise();
      if (auteursData) {
        this.teachers = auteursData;
      } else {
        console.error('Les données renvoyées par le service sont null ou undefined');
      }
      console.log("Données récupérées :", this.teachers);

    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  }

  editStudent(id: number) {
    this.router.navigate(['/edit-student', id]);
  }
}

