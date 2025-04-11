import { AdminComponent } from './admin/admin.component';
import { OralSurgeryComponent } from './oral-surgery/oral-surgery.component';
import { ProstheticsComponent } from './prosthetics/prosthetics.component';
import { OrthodonticsComponent } from './orthodontics/orthodontics.component';
import { EndodonticsComponent } from './endodontics/endodontics.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'endo',
        component: EndodonticsComponent
    },
    {
        path: 'ortho',
        component: OrthodonticsComponent
    },
    {
        path: 'prosthetics',
        component: ProstheticsComponent
    },
    {
        path: 'oral',
        component: OralSurgeryComponent
    },
    {
        path:'admin',
        component: AdminComponent
    },
];


