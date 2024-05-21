import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { TableDynamicComponent } from '../../../shared/components/table-dynamic/table-dynamic.component';

@Component({
  selector: 'app-auteur',
  standalone: true,
  imports: [
    TableDynamicComponent
  ],
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
      tools : "auteur",
      header : {
        fields : [
          { name : "photo" , type: 'image' },
          { name : "nom" , type : 'string' },
        ],
        labels : {
          "photo" : "Photo auteur",
          "nom" : "Nom auteur",
        },
        filters : [],
        sorts : []
      }
    }
  }
}
