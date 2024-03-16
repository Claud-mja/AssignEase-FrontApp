import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/user-space/home/home.component';
import { AssignmentComponent } from './components/user-space/assignment/assignment.component';
import { TeacherComponent } from './components/user-space/teacher/teacher.component';
import { MatiereComponent } from './components/user-space/matiere/matiere.component';
import { StudentComponent } from './components/user-space/student/student.component';

export const routes: Routes = [
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'home',
        component : HomeComponent,
    },
    {
        path : 'assignment',
        component : AssignmentComponent
    },
    {
        path : 'teacher',
        component : TeacherComponent
    },
    {
        path : 'matiere',
        component : MatiereComponent
    },
    {
        path : 'student',
        component : StudentComponent
    },
    {
        path : '',
        redirectTo : 'home',
        pathMatch : 'full'
    }
];
