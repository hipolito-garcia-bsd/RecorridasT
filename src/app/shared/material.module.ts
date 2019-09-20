import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
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
    MatStepperModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    AngularFontAwesomeModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
