import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Teacher } from '../../models/teacher.model';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.get<Teacher[]>(`${environment.baseUrl}/teacher`, { headers });
  }

  getTeacherById(idTeacher:any): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.get<any>(`${environment.baseUrl}/teacher/${idTeacher}`, { headers });
  }

  createTeacher(formdata: FormData): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.post<any>(`${environment.baseUrl}/teacher`,formdata, { headers });
  }

  updateProfilTeacher(idTeacher:string,formdata: FormData): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.put<any>(`${environment.baseUrl}/teacher/change-profil/${idTeacher}`,formdata, { headers });
  }

  updateTeacher(idTeacher:any,dataUpdate: { nom: string,prenom:string}): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.put<any>(`${environment.baseUrl}/teacher/${idTeacher}`,dataUpdate, { headers });
  }

  deleteTeacher(idTeacher:any): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.delete<any>(`${environment.baseUrl}/teacher/${idTeacher}`, { headers });
  }

}
