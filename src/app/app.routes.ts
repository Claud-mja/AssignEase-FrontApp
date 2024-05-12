import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/user-space/home/home.component';
import { AssignmentComponent } from './components/user-space/assignment/assignment.component';
import { TeacherComponent } from './components/user-space/teacher/teacher.component';
import { TeacherDeleteComponent } from './components/user-space/teacher/teacher-delete/teacher-delete.component';
import { TeacherCreateComponent } from './components/user-space/teacher/teacher-create/teacher-create.component';
import { TeacherUpdateComponent } from './components/user-space/teacher/teacher-update/teacher-update.component';

import { MatiereComponent } from './components/user-space/matiere/matiere.component';
import { StudentComponent } from './components/user-space/student/student.component';
import { AddEditAssignmentComponent } from './components/user-space/assignment/add-edit-assignment/add-edit-assignment.component';

import { StudentEditComponent } from './components/user-space/student/student-edit/student-edit.component';
import { StudentCreateComponent } from './components/user-space/student/student-create/student-create.component';
import { StudentDeleteComponent } from './components/user-space/student/student-delete/student-delete.component';


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
        path : 'edit-student/:id',
        component : StudentEditComponent, canActivate: [AuthGuard]
    },
    {
        path : 'delete-student/:id',
        component : StudentDeleteComponent, canActivate: [AuthGuard]
    },
    {
        path : 'create-student',
        component : StudentCreateComponent, canActivate: [AuthGuard]
    },
    {
        path : 'teacher',
        component : TeacherComponent, canActivate: [AuthGuard]
    },
    {
        path : 'edit-teacher/:id',
        component : TeacherUpdateComponent, canActivate: [AuthGuard]
    },
    {
        path : 'delete-teacher/:id',
        component : TeacherDeleteComponent, canActivate: [AuthGuard]
    },
    {
        path : 'create-teacher',
        component : TeacherCreateComponent, canActivate: [AuthGuard]
    },
    {
        path : '', // Retirer canActivate de cette route
        redirectTo : 'assignment',
        pathMatch : 'full'
    }
];
