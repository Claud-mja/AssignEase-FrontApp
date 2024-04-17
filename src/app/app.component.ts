import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { CardAssignmentComponent } from './shared/components/card-assignment/card-assignment.component';
import { IMenu } from './shared/interfaces/IMenu';
import { CommonModule } from '@angular/common';
import { sideBarMenu } from './shared/config/side-menu.config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            CommonModule,
            RouterOutlet , 
            RouterLink,
            MatToolbarModule,MatIconModule,MatMenuModule,MatButtonModule
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'AssignEase-frontApp';

  menuList !: IMenu[];
  showSideBar : boolean = false;
  currentlyOpenItemIndex: number = -1;
  currentUrl !:string;

  constructor(private router : Router) {
    this.currentUrl = this.router.url;
  }
  ngAfterViewInit(): void {
    this.sideBarEvent();
  }
  
  ngOnInit(): void {
    this.menuList = sideBarMenu;
    this.currentUrl = this.router.url;
  }

  sideBarEvent(){
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', () => {
        
        this.showSideBar = !this.showSideBar;
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          const toolbar = document.querySelector('.tool-bar') as HTMLElement;
          const body = document.querySelector('.content-body') as HTMLElement
          
          if (this.showSideBar) {
            sidebar.classList.add('active');
            toolbar.style.padding="0 60px";
            body.style.padding="0 60px";
          } else {
            sidebar.classList.remove('active');
            toolbar.style.padding="0 40px";
            body.style.padding="40px";
          }
        }
      });
    }
  }



  onLogOut(){
    // this.authService.logOut();
    // this.router.navigate(['/auth']);
  }

  toggleCollapse(index: number) {
    if (this.currentlyOpenItemIndex === index) {
      this.currentlyOpenItemIndex = -1; // Fermez l'élément actuel s'il est déjà ouvert
    } else {
      this.currentlyOpenItemIndex = index; // Ouvrez l'élément cliqué
    }
  }

  isActive(route: string) {
    return this.router.url == route;
  }
}
