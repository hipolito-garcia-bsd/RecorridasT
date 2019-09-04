import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { InicioComponent } from './inicio/inicio.component';
import { AdminCompletoComponent } from '../layout/admin-completo/admin-completo.component';
import { AdminHeaderComponent } from '../layout/admin-header/admin-header.component';


export const PagesRoutes: Routes = [
    {
        path: 'home',
        component: AdminCompletoComponent,
        children: [
            { path: '', component: InicioComponent }
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

