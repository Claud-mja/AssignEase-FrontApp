import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../shared/interfaces/table-config';

@Component({
  selector: 'app-auteur',
  standalone: true,
  imports: [],
  templateUrl: './auteur.component.html',
  styleUrl: './auteur.component.css'
})
export class AuteurComponent implements OnInit {
  
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
