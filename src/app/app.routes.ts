import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/user-space/home/home.component';
import { AssignmentComponent } from './components/user-space/assignment/assignment.component';
import { TeacherComponent } from './components/user-space/teacher/teacher.component';
import { MatiereComponent } from './components/user-space/matiere/matiere.component';
import { StudentComponent } from './components/user-space/student/student.component';
import { AddEditAssignmentComponent } from './components/user-space/assignment/add-edit-assignment/add-edit-assignment.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'home',
        component : HomeComponent, canActivate: [AuthGuard]
    },
    {
        path : 'assignment',
        component : AssignmentComponent, canActivate: [AuthGuard]
    },
    {
        path : 'add-assignment',
        component : AddEditAssignmentComponent, canActivate: [AuthGuard]
    },
    {
        path : "edit-assignment/:id", // Corriger la syntaxe des paramètres de route
        component : AddEditAssignmentComponent, canActivate: [AuthGuard]
    },
    {
        path : 'teacher',
        component : TeacherComponent, canActivate: [AuthGuard]
    },
    {
        path : 'matiere',
        component : MatiereComponent, canActivate: [AuthGuard]
    },
    {
        path : 'student',
        component : StudentComponent, canActivate: [AuthGuard]
    },
    {
        path : '', // Retirer canActivate de cette route
        redirectTo : 'assignment',
        pathMatch : 'full'
    }
];
