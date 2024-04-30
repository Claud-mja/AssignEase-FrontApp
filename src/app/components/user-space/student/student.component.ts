import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';

import { Auteur } from '../../../shared/models/auteur.model';

import { AuteurService } from '../../../shared/services/auteur/auteur.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class StudentComponent {
  auteurs: Auteur[] = []; // Initialisez auteurs avec un tableau vide
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-weight'];


  constructor(private auteurService: AuteurService) { }

  ngOnInit():void{

    this.getAll();
  }

  async getAll(): Promise<void> {
    try {
      const auteursData = await this.auteurService.getStudents().toPromise();
      if (auteursData) {
        this.auteurs = auteursData;
      } else {
        console.error('Les données renvoyées par le service sont null ou undefined');
      }
      console.log("Données récupérées :", this.auteurs);

    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants :', error);
    }
  }
}

