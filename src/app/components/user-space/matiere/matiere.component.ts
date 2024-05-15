import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../../../shared/services/matiere/matiere.service';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { Matiere } from '../../../shared/models/matiere.model';
import { TableDynamicComponent } from '../../../shared/components/table-dynamic/table-dynamic.component';

@Component({
  selector: 'app-matiere',
  standalone: true,
  imports: [
    TableDynamicComponent
  ],
  templateUrl: './matiere.component.html',
  styleUrl: './matiere.component.css'
})
export class MatiereComponent implements OnInit {
 
  tableConfig !: TableConfig;


  constructor(){}

  ngOnInit(): void {
    this.initTbaleConfig();
  }

  initTbaleConfig(){
    this.tableConfig = {
      tools : "matiere",
      header : {
        fields : [
          { name : "image" , type: 'image' },
          { name : "nom" , type : 'string' },
          { name : "prof.nom" , type: 'object' },
          { name : "prof.photo" , type: 'object' },
        ],
        labels : {
          "image" : "Matiere image",
          "nom" : "Matiere Designation",
          "prof.nom" : "Nom du professeur",
          "prof.photo" : "Photo du professeur"
        },
        filters : [],
        sorts : []
      }
    }
  }

}
