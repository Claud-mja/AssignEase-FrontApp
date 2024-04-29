import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Auteur } from '../../models/auteur.model';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Auteur[]> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.get<Auteur[]>(`${environment.baseUrl}/auteur`, { headers });
  }

}
