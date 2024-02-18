import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardComponent,
    BsNavbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    HttpClientModule
  ],
  exports: [
    DashboardComponent,
    BsNavbarComponent,
  ],
})
export class SharedModule {}
