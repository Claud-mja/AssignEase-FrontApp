import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet,NavigationEnd } from '@angular/router';
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { CardAssignmentComponent } from './shared/components/card-assignment/card-assignment.component';
import { IMenu } from './shared/interfaces/IMenu';
import { CommonModule } from '@angular/common';
import { sideBarMenu } from './shared/config/side-menu.config';
import { MatPaginator } from '@angular/material/paginator';
import { UtilsService } from './shared/services/utils/utils.service';
import { AuthService } from './auth.service';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            CommonModule,
            RouterOutlet ,
            RouterLink,
            MatToolbarModule,MatIconModule,MatMenuModule,MatButtonModule,
            MatPaginator

      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,AfterViewInit,OnDestroy {
  title = 'AssignEase-frontApp';

  menuList !: IMenu[];
  showSideBar : boolean = false;
  currentlyOpenItemIndex: number = -1;
  currentUrl !:string;
  name !: string | null;
  showNavbar: boolean = true;

  private unserNameSbscription !: Subscription;

  constructor(private router : Router,private authService : AuthService) {
    this.currentUrl = this.router.url;
  }

  ngOnDestroy(): void {
    this.unserNameSbscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.sideBarEvent();
  }

  ngOnInit(): void {
    this.menuList = sideBarMenu;
    this.currentUrl = this.router.url;
    if (this.isLogIn()) {
      this.authService.setName(localStorage.getItem('name'));
    }
    this.unserNameSbscription = this.authService.getName().subscribe((name)=>{
      this.name = name;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Vérifiez si l'URL actuelle est '/login'
        this.showNavbar = event.url !== '/login';
      }
    });
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

  isLogIn(){
    let isChecked = false;
    if(localStorage.getItem('token')!=null){
      if(localStorage.getItem('name')!=null){
        isChecked = true
      }
    }
    return isChecked
  }

  onLogin(){
    this.router.navigate(['login']);
  }

  onLogOut(){
    this.authService.logout();
    this.router.navigate(['login']);
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
