import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatStepperModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    AngularFontAwesomeModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
