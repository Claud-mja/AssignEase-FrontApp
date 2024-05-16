import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Matiere } from '../../models/matiere.model';
import { Observable } from 'rxjs';
import { ResponseListPaginate } from '../../interfaces/ResponseListPaginate';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  matiere_uri !: string;

  constructor(private http : HttpClient, private utilsServices : UtilsService) {
    this.matiere_uri = environment.baseUrl+'/matiere';
  }

  getMatieres():Observable<any>{
    return this.http.get<Matiere[]>(`${this.matiere_uri}`);
  }

  getMatiere(id : string):Observable<any>{
    return this.http.get<Matiere>(`${this.matiere_uri}/${id}`);
  }

  getMatierePagines(page:number, limit:number):Observable<any> {
    return this.http.get<ResponseListPaginate>(`${this.matiere_uri}` + "?page=" + page + "&limit=" + limit);
  }

  updateMatiere(matiere : Matiere , file : File , lastFile : string):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    const formData = new FormData();
    formData.append("matiere" , JSON.stringify(matiere));
    if (file) {   
      const uniqueFilename = this.utilsServices.makeFileUniqueName(file.name); 
      formData.append("fileName" , uniqueFilename);
      formData.append("lastFile" , lastFile);
      formData.append("imageFile" , file);
    }
    return this.http.put<Matiere>(`${this.matiere_uri}/${matiere._id}/matiere`, formData , {headers : headers});
  }


  addMatiere(matiere:Matiere , file : File):Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    const formData = new FormData();
    const uniqueFilename = this.utilsServices.makeFileUniqueName(file.name); 
    matiere.image = uniqueFilename;
    
    formData.append("matiere" , JSON.stringify(matiere));
    formData.append("fileName" , uniqueFilename);
    formData.append("imageFile" , file);
    return this.http.post<Matiere>(`${this.matiere_uri}/matiere`, formData , {headers : headers});
  }


}
