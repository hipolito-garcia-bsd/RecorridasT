import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, UrlSerializer } from '@angular/router';
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
import { DataTablesModule } from 'angular-datatables';
// import { UserService } from './shared/services/user/user.service';
import { AppConfigService } from './shared/services/appConfig/app-config.service';
import { UserService } from './shared/services/user/user.service';
import { LowerCaseUrlSerializerService } from './shared/services/LowerCaseUrlSerializer/lower-case-url-serializer.service';

export function getBaseHref(): string {
  return window.location.pathname;
}

export function getLoadAppConfig(appConfigService: AppConfigService, user: UserService) {
  return () => appConfigService.loadAppConfig().then(data => {
    return user.load(data);
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PagesModule,
    LayoutModule,
    RouterModule.forChild(PagesRoutes),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    PipesModule,
    DataTablesModule
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
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: getLoadAppConfig, deps: [AppConfigService, UserService], multi: true },
    UserService,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }