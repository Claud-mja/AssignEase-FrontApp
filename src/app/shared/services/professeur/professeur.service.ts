import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Professeur } from '../../models/professeur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {

  professeur_uri !: string;

  constructor(private http : HttpClient) {
    this.professeur_uri = environment.baseUrl+"/professeur";
  }

  getProfesseurs(){
    return this.http.get<Professeur[]>(`${this.professeur_uri}`);
  }

  getProfesseurPagines(page:number, limit:number):Observable<any>{
    return this.http.get<Professeur[]>(`${this.professeur_uri}` + "?page=" + page + "&limit=" + limit);
  }

}
