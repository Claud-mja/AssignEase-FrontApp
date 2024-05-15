import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { TableDynamicComponent } from '../../../shared/components/table-dynamic/table-dynamic.component';

@Component({
  selector: 'app-professeur',
  standalone: true,
  imports: [TableDynamicComponent],
  templateUrl: './professeur.component.html',
  styleUrl: './professeur.component.css'
})
export class ProfesseurComponent implements OnInit {

  tableConfig !: TableConfig;


  constructor(){}

  ngOnInit(): void {
    this.initTbaleConfig();
  }

  initTbaleConfig(){
    this.tableConfig = {
      tools : "professeur",
      header : {
        fields : [
          { name : "photo" , type: 'image' },
          { name : "nom" , type : 'string' },
          { name : "prenom" , type: 'string' },
        ],
        labels : {
          "photo" : "Photo professeur",
          "nom" : "Nom professeur",
          "prenom" : "Prenom professeur",
        },
        filters : [],
        sorts : []
      }
    }
  }

}
