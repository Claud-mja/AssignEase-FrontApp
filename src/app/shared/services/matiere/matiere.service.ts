import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Matiere } from '../../models/matiere.model';
import { Observable } from 'rxjs';
import { ResponseListPaginate } from '../../interfaces/ResponseListPaginate';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  matiere_uri !: string;

  constructor(private http : HttpClient) {
    this.matiere_uri = environment.baseUrl+'/matiere';
  }

  getMatieres(){
    return this.http.get<ResponseListPaginate>(`${this.matiere_uri}`);
  }

  getMatierePagines(page:number, limit:number):Observable<any> {
    return this.http.get<ResponseListPaginate>(`${this.matiere_uri}` + "?page=" + page + "&limit=" + limit);
  }

}
