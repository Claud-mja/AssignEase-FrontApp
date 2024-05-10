import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Auteur } from '../../models/auteur.model';
import { ResponseListPaginate } from '../../interfaces/ResponseListPaginate';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  auteur_uri !: string;

  constructor(private http : HttpClient) {
    this.auteur_uri = environment.baseUrl+'/auteur';
  }

  getAuteurs(){
    return this.http.get<ResponseListPaginate>(`${this.auteur_uri}`);
  }

}
