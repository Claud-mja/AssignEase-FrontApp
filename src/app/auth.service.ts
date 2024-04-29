import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.baseAuth}/login`, { username, password })
      .pipe(
        map(response => {
          if(response.status==200){
            const token = response.token;
            localStorage.setItem('token', token);
            localStorage.setItem('name', response.name);
            this.loggedIn = true;
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.error('Erreur lors de l\'authentification : ', error);
          return of(false);
        })
      );
  }

  logout(): void {
    // Supprimer le token JWT du stockage local
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    // Vérifier si l'utilisateur est connecté en fonction du token JWT
    return this.loggedIn || !!localStorage.getItem('token');
  }
}
