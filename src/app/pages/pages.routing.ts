import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { AdminCompletoComponent } from '../layout/admin-completo/admin-completo.component';
import { AdminHeaderComponent } from '../layout/admin-header/admin-header.component';
import { CargarComponent } from './cargar/cargar.component';


export const PagesRoutes: Routes = [
    {
        path: 'home',
        component: AdminCompletoComponent,
        children: [
            { path: '', component: InicioComponent }
        ]
    },
    {
        path: 'cargar',
        component: AdminCompletoComponent,
        children: [
            { path: '', component: CargarComponent }
        ]
    },
    // {
    //     path: 'inicio',
    //     component: AdminHeaderComponent,
    //     children: [
    //         { path: '', component: InicioComponent }
    //     ]
    // }
];

