import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Auteur } from '../../models/auteur.model';
import { ResponseListPaginate } from '../../interfaces/ResponseListPaginate';
import { Observable } from 'rxjs';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  auteur_uri !: string;

  constructor(private http : HttpClient , private utilsService : UtilsService) {
    this.auteur_uri = environment.baseUrl+'/auteur';
  }

  getAuteurs(){
    return this.http.get<ResponseListPaginate>(`${this.auteur_uri}`);
  }

  getStudents(): Observable<Auteur[]> {
    return this.http.get<Auteur[]>(`${environment.baseUrl}/auteur`);
  }

  getAuteur(id :string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auteur/${id}`);
  }

  createAuteur(dataCreate: { nom: string}): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.post<any>(`${environment.baseUrl}/auteur`,dataCreate, { headers });
  }

  addAuteur(profeseur: Auteur , file : File):Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    const formData = new FormData();
    const uniqueFilename = this.utilsService.makeFileUniqueName(file.name); 
    profeseur.photo = uniqueFilename;
    
    formData.append("auteur" , JSON.stringify(profeseur));
    formData.append("fileName" , uniqueFilename);
    formData.append("imageFile" , file);
    return this.http.post<Auteur>(`${environment.baseUrl}/auteur/auteur`, formData , {headers : headers});
  }

  updateAuteur(auteur : Auteur , file : File):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    const formData = new FormData();
    formData.append("auteur" , JSON.stringify(auteur));
    if (file) {   
      const uniqueFilename = this.utilsService.makeFileUniqueName(file.name); 
      auteur.photo = uniqueFilename;
      formData.append("fileName" , uniqueFilename);
      formData.append("imageFile" , file);
    }
    return this.http.put<Auteur>(`${environment.baseUrl}/auteur/${auteur._id}/auteur`, formData , {headers : headers});
  }

  deleteAuteur(idStudent:any): Observable<any> {
    const jwt = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });

    return this.http.delete<any>(`${environment.baseUrl}/auteur/${idStudent}`, { headers });
  }

}
