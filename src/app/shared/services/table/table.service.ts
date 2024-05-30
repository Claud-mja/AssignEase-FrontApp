import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TableConfig } from '../../interfaces/table-config';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http : HttpClient) { }

  addData(configTable : TableConfig, dataBody :  Object):Observable<Object>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.post<Object>(`${environment.baseUrl}/${configTable.tools}`, dataBody , {headers : headers});
  }

  getData(configTable : TableConfig):Observable<Object[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.get<Object[]>(`${environment.baseUrl}/${configTable.tools}` , { headers : headers });
  }

  getDataById(configTable : TableConfig , id : string):Observable<Object>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.get<Object>(`${environment.baseUrl}/${configTable.tools}/${id}` , { headers : headers });
  }

  updateData(configTable : TableConfig ,dataBody :  Object ):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.put<Object>(`${environment.baseUrl}/${configTable.tools}`, dataBody , {headers : headers});
  }

  deleteData(configTable : TableConfig , id :  string){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.delete(`${environment.baseUrl}/${configTable.tools}/${id}` , { headers : headers });
  }

}
