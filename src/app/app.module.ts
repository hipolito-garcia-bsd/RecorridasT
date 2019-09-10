import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// ########################################################### //
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Imports de Material
import { MaterialModule } from './shared/material.module';
// ########################################################### //
import { GeneralInterceptorService } from './shared/interceptors/general-interceptor.service';
// ########################################################### //
import { PagesRoutes } from './pages/pages.routing';
import { PagesModule } from './pages/pages.module';
// ########################################################### //
import { LayoutModule } from './layout/layout.module';
// ########################################################### //
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ngxUiLoaderConfig } from './app-base-helpers';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// ########################################################### //
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { APP_BASE_HREF } from '@angular/common';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { PipesModule } from './shared/pipes/pipes.module';

export function getBaseHref(): string {
  return window.location.pathname;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    LayoutModule,
    RouterModule.forChild(PagesRoutes),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    PipesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptorService,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-MX'
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: APP_BASE_HREF, useFactory: getBaseHref },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }