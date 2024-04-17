import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CardAssignmentComponent } from '../../../shared/components/card-assignment/card-assignment.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Assignment } from '../../../shared/models/assignment.model';
import { AssignmentService } from '../../../shared/services/assignment/assignment.service';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    ScrollingModule,
    CardAssignmentComponent,
    ScrollingModule
  ],
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent implements OnInit,AfterViewInit {

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  assignments !: Assignment[];
  page = 0;

  constructor(private assignmentService : AssignmentService,private ngZone : NgZone){}

  ngAfterViewInit(): void {
    if (!this.scroller) return;

    // on s'abonne à l'évènement scroll du virtual scroller
    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => {
          //const dist = this.scroller.measureScrollOffset('bottom');
          /*console.log(
            'dans le tap, distance par rapport au bas de la fenêtre = ' + dist
          );*/
        }),
        map((event) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200)
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
          console.log('On demande de nouveaux assignments');
          // on va faire une requête pour demander les assignments suivants
          // et on va concatener le resultat au tableau des assignments courants
          console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
          this.ngZone.run(() => {
            console.log("Next ==> ");
            
            // if (!this.hasNextPage) return;
            // this.page = this.nextPage;
            // this.getAssignmentsFromServicePourScrollInfini();
          });
      });
  }

  ngOnInit(): void {
    this.assignmentService.getAssignment().subscribe((assignmets : Assignment[])=>{
      this.assignments = assignmets;
      console.log(this.assignments[0]);
      
    });
  }

}
