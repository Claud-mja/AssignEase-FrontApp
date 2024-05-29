import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { AssignmentComponent } from './components/user-space/assignment/assignment.component';

import { MatiereComponent } from './components/user-space/matiere/matiere.component';
import { AddEditAssignmentComponent } from './components/user-space/assignment/add-edit-assignment/add-edit-assignment.component';
import { DetailsAssignmentComponent } from './components/user-space/assignment/details-assignment/details-assignment.component';

import { AddEditMatiereComponent } from './components/user-space/matiere/add-edit-matiere/add-edit-matiere.component';
import { ProfesseurComponent } from './components/user-space/professeur/professeur.component';
import { AddEditProfesseurComponent } from './components/user-space/professeur/add-edit-professeur/add-edit-professeur.component';
import { AuteurComponent } from './components/user-space/auteur/auteur.component';
import { AddEditAuteurComponent } from './components/user-space/auteur/add-edit-auteur/add-edit-auteur.component';


export const routes: Routes = [
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'assignment',
        component : AssignmentComponent,
        canActivate: [AuthGuard]
    },
    {
        path : "edit-assignment/:id",
        component : AddEditAssignmentComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'add-assignment',
        component : AddEditAssignmentComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'details-assignment/:id',
        component : DetailsAssignmentComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'matiere',
        component : MatiereComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'edit-matiere/:id',
        component : AddEditMatiereComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'add-matiere',
        component : AddEditMatiereComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'professeur',
        component : ProfesseurComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'edit-professeur/:id',
        component : AddEditProfesseurComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'add-professeur',
        component : AddEditProfesseurComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'auteur',
        component : AuteurComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'edit-auteur/:id',
        component : AddEditAuteurComponent,
        canActivate: [AuthGuard]
    },
    {
        path : 'add-auteur',
        component : AddEditAuteurComponent,
        canActivate: [AuthGuard]
    },
    {
        path : '',
        component : AssignmentComponent,
        canActivate: [AuthGuard]
    },
    // {
    //     path : '', // Retirer canActivate de cette route
    //     redirectTo : 'assignment',
    //     pathMatch : 'full',
    // }
];
