import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { MaterialModule } from '../shared/material.module';
// import { ComponentsModule } from '../components/components.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { CargarComponent } from './cargar/cargar.component';

import { GuidPipe } from '../shared/pipes/guid/guid.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AnularComponent } from './anular/anular.component';

@NgModule({
  declarations: [
    InicioComponent,
    CargarComponent,
    GuidPipe,
    AnularComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class PagesModule { }
