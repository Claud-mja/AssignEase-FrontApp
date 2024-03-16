import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

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

  constructor(){}

  login(){}

}
