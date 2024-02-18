import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderService,
} from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from 'features/admin/admin.module';
import { CartModule } from 'features/cart/cart.module';
import { OrdersModule } from 'features/orders/orders.module';
import { WishlistModule } from 'features/wishlist/wishlist.module';
import { ItemsModule } from 'features/items/items.module';
import { AuthModule } from 'auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgbModule,
    NgbPaginationModule,
    AdminModule,
    CartModule,
    ItemsModule,
    OrdersModule,
    WishlistModule,
    AuthModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      timeOut: 1000,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
