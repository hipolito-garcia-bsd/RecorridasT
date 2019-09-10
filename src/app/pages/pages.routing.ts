import { Routes } from '@angular/router';

import { AdminCompletoComponent } from '../layout/admin-completo/admin-completo.component';
import { CargarComponent } from './cargar/cargar.component';
import { AnularComponent } from './anular/anular.component';
import { AnuladasComponent } from './anuladas/anuladas.component';


export const PagesRoutes: Routes = [
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
    {
        path: 'anuladas',
        component: AdminCompletoComponent,
        children: [
            { path: '', component: AnuladasComponent }
        ]
    }
];

