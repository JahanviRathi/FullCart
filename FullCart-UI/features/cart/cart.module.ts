import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AddToCartComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    AddToCartComponent,
    ShoppingCartComponent
  ]
})
export class CartModule { }
