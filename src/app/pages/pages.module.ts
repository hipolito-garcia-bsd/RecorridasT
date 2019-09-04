import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { MaterialModule } from '../shared/material.module';
// import { ComponentsModule } from '../components/components.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
     InicioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    // ComponentsModule,
    NgxEchartsModule
  ]
})
export class PagesModule { }
