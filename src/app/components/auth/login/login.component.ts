import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { NotificationService } from '../../../shared/services/utils/notification.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule
            ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showSpinner : boolean = false;
  errorMessage!: any;

  loginForm !: FormGroup;
  hidePass : boolean = true;

  constructor(private authService: AuthService, private router: Router, private fb : FormBuilder,private notif : NotificationService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']); 
    }else{
      this.initForm()
    }
  }

  onToggleEye(){
    this.hidePass = !this.hidePass;
  }

  initForm(){
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required , Validators.email])],
      password : ['' , Validators.required]
    })
  }

  async onLogin(){
    this.errorMessage=undefined
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      const email = this.loginForm.value['email'];
      const password = this.loginForm.value['password'];
      this.showSpinner=true;
      this.authService.login(email, password)
        .subscribe(success => {
          this.showSpinner=false;
          if (success) {
            this.notif.openSnackBar("Connexion resussi !",2000);
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Identifiants ou mot de passe incorect !';
          }
        }, error => {
          this.showSpinner=false;
          this.notif.showSuccess('Echec de connexion, '+error , "Authentification !");
          this.errorMessage = 'Une erreur s\'est produite, veuillez réessayer.';
        });
    }
  }

}
