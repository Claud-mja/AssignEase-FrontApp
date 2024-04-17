import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

constructor(private http : HttpClient) { }

  getAssignment():Observable<Assignment[]>{
    return this.http.get<Assignment[]>('assets/data/assignment.json');
  }

}
