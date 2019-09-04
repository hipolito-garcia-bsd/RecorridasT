import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// ########################################################### //
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Imports de Material
import { MaterialModule } from './shared/material.module';
// VARIABLES DE AMBIENTE
import { environment } from '../environments/environment';
// ########################################################### //
import { GeneralInterceptorService } from './shared/interceptors/general-interceptor.service';
// ########################################################### //
import { PagesRoutes } from './pages/pages.routing';
import { PagesModule } from './pages/pages.module';
// ########################################################### //
import { LayoutModule } from './layout/layout.module';
// ########################################################### //
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './app-base-helpers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    LayoutModule,
    RouterModule.forChild(PagesRoutes),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
