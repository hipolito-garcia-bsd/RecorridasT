import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { AdminCompletoComponent } from '../layout/admin-completo/admin-completo.component';
import { AdminHeaderComponent } from '../layout/admin-header/admin-header.component';
import { CargarComponent } from './cargar/cargar.component';
import { AnularComponent } from './anular/anular.component';


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
    {
        path: 'anular',
        component: AdminCompletoComponent,
        children: [
            { path: '', component: AnularComponent }
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

