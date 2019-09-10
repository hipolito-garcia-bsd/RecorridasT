import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCompletoComponent } from './admin-completo/admin-completo.component';
// import { AdminHeaderComponent } from './admin-header/admin-header.component';
// import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarOnlyComponent } from './common/navbar-only/navbar-only.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [
    AdminCompletoComponent,
    AdminHeaderComponent,
    // AdminComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarOnlyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  exports: [
    AdminCompletoComponent,
    AdminHeaderComponent,
    // AdminComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
