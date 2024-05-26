import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../../shared/interfaces/table-config';
import { TableDynamicComponent } from '../../../shared/components/table-dynamic/table-dynamic.component';
import { Router, RouterLink, RouterOutlet,NavigationEnd } from '@angular/router';

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

  currentUrl !:string;
  showNavbar: boolean = true;


  constructor(private router : Router) {
    this.currentUrl = this.router.url;
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Vérifiez si l'URL actuelle est '/login'
        this.showNavbar = event.url !== '/login';
      }
    });
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
