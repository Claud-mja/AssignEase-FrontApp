import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LogginService } from '../utils/loggin.service';
import { ResponseListPaginate } from '../../interfaces/ResponseListPaginate';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService implements OnInit {

  assigment_uri !: string;
  
  constructor(private http : HttpClient , private logService : LogginService) {
    this.assigment_uri = environment.baseUrl+'/assignment';
  }
  
  ngOnInit(): void {
  }


  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.assigment_uri}`);
  }

  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    return this.http.get<ResponseListPaginate>(`${this.assigment_uri}` + "?page=" + page + "&limit=" + limit);
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id:number):Observable<Assignment|undefined> {
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
    //return of("Assignment ajouté avec succès");
    return this.http.post<Assignment>(`${this.assigment_uri}`, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
   // l'assignment passé en paramètre est le même objet que dans le tableau
   // plus tard on verra comment faire avec une base de données
   // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(assignment.nom, "modifié");
    //return of("Assignment modifié avec succès");
    return this.http.put<Assignment>(`${this.assigment_uri}`, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    // on va supprimer l'assignment dans le tableau
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    this.logService.log(assignment.nom, "supprimé");
    //return of("Assignment supprimé avec succès");
    return this.http.delete(`${this.assigment_uri}/${assignment}`);
  }

}
