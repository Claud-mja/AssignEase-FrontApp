import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            FormsModule,
            MatCardModule,MatFormFieldModule , MatProgressSpinnerModule,MatInputModule,MatButtonModule
            ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username : string = '';
  password !: string;
  showSpinner : boolean = false;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Vérifiez si l'utilisateur est déjà connecté au chargement du composant
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']); // Redirigez vers la page d'accueil si l'utilisateur est déjà connecté
    }
  }

  login(): void {
    if(this.username.length>2 && this.password.length>1){
      this.showSpinner=true;
      this.authService.login(this.username, this.password)
        .subscribe(success => {
          this.showSpinner=false;
          if (success) {
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Identifiants incorrects';
          }
        }, error => {
          this.showSpinner=false;
          console.error('Erreur lors de la connexion : ', error);
          this.errorMessage = 'Une erreur s\'est produite, veuillez réessayer.';
        });
    } else {
      this.errorMessage = 'Champs invalide';
    }

  }

}
