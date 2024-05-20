import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { Observable, Subject, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LogginService } from '../utils/loggin.service';
import { ResponseListPaginate } from '../../interfaces/ResponseListPaginate';
import { HeaderConfig } from '../../interfaces/Header-config';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService implements OnInit {

  assigment_uri !: string;
  private refreshListSource = new Subject<void>();
  refreshList$ = this.refreshListSource.asObservable();

  
  constructor(private http : HttpClient , private logService : LogginService) {
    this.assigment_uri = environment.baseUrl+'/assignment';
  }
  
  ngOnInit(): void {
  }


  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.assigment_uri}`);
  }

  getAssignmentsPagines(page:number, limit:number , config : any = null):Observable<any> {
    const body = {
      filters : config!=null && config.filters!=null ? config.filters : [],
      sorts : config!=null && config.sorts!=null ? config.sorts : [],

    }
    return this.http.post<ResponseListPaginate>(`${this.assigment_uri}` + "?page=" + page + "&limit=" + limit , body);
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id:string):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(`${this.assigment_uri}/${id}`)
    .pipe(
           catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
      /*
      map(a => {
        a.nom += " MODIFIE PAR LE PIPE !"
        return a;
      }),
      tap(a => console.log("Dans le pipe avec " + a.nom)),
      map(a => {
        a.nom += " MODIFIE UNE DEUXIEME FOIS PAR LE PIPE !";
        return a;
      })
      */
    );
  }


  // Methode appelée par catchError, elle doit renvoyer
  // i, Observable<T> où T est le type de l'objet à renvoyer
  // (généricité de la méthode)
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    }
 }


  // ajoute un assignment et retourne une confirmation
  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);
    this.logService.log(assignment.nom, "ajouté");
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    //return of("Assignment ajouté avec succès");
    return this.http.post<Assignment>(`${this.assigment_uri}/add`, assignment , {headers : headers});
  }

  updateAssignment(assignment:Assignment):Observable<any> {
   // l'assignment passé en paramètre est le même objet que dans le tableau
   // plus tard on verra comment faire avec une base de données
   // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(assignment.nom, "modifié");
    //return of("Assignment modifié avec succès");
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.put<Assignment>(`${this.assigment_uri}/`, assignment , {headers : headers});
  }

  deleteAssignment(id : string):Observable<any> {
    // on va supprimer l'assignment dans le tableau
    //let pos = this.assignments.indexOf(assignment);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${token}`
    );
    return this.http.delete(`${this.assigment_uri}/${id}` , { headers : headers });
  }

  triggerRefreshList() {
    this.refreshListSource.next();
  }

}
