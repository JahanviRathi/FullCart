import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemsComponent } from './add-items/add-items.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';
import { ItemsModule } from 'features/items/items.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminBrandsComponent } from './admin-brands/admin-brands.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminCategoriesComponent,
    AddItemsComponent,
    AdminItemsComponent,
    AdminBrandsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbPaginationModule,
    SharedModule,
    ItemsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
