import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Teacher } from '../../models/teacher.model';
import { Observable,throwError } from 'rxjs';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient , private utilsServices : UtilsService) { }

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

    return this.http.get<any>(`${environment.baseUrl}/teacher/${idTeacher}` , { headers });
  }

  createTeacher(formdata: FormData): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.post<any>(`${environment.baseUrl}/teacher`,formdata, { headers });
  }

  addProfesseur(profeseur: Teacher , file : File):Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    const formData = new FormData();
    const uniqueFilename = this.utilsServices.makeFileUniqueName(file.name); 
    profeseur.photo = uniqueFilename;
    
    formData.append("professeur" , JSON.stringify(profeseur));
    formData.append("fileName" , uniqueFilename);
    formData.append("imageFile" , file);
    return this.http.post<Teacher>(`${environment.baseUrl}/professeur/professeur`, formData , {headers : headers});
  }

  updateProfesseur(professeur : Teacher , file : File , lastFile : string):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    const formData = new FormData();
    formData.append("professeur" , JSON.stringify(professeur));
    if (file) {   
      const uniqueFilename = this.utilsServices.makeFileUniqueName(file.name); 
      formData.append("fileName" , uniqueFilename);
      formData.append("lastFile" , lastFile);
      formData.append("imageFile" , file);
    }
    return this.http.put<Teacher>(`${environment.baseUrl}/professeur/${professeur._id}/professeur`, formData , {headers : headers});
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
