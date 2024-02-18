import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { ShoppingCartComponent } from '../../features/cart/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from '../../features/orders/check-out/check-out.component';
import { AdminOrdersComponent } from '../../features/admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from '../../features/orders/my-orders/my-orders.component';
import { AdminCategoriesComponent } from '../../features/admin/admin-categories/admin-categories.component';
import { WishlistComponent } from '../../features/wishlist/wishlist/wishlist.component';
import { DashboardComponent } from '../../shared/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddItemsComponent } from 'features/admin/add-items/add-items.component';
import { AdminItemsComponent } from 'features/admin/admin-items/admin-items.component';
import { ItemsComponent } from 'features/items/items/items.component';
import { ItemDetailsComponent } from 'features/items/item-details/item-details.component';
import { AuthGuard } from 'auth/auth.guard';
import { AdminGuard } from 'auth/admin.guard';
import { AdminBrandsComponent } from 'features/admin/admin-brands/admin-brands.component';
import { AddBrandsComponent } from 'features/admin/add-brands/add-brands.component';
import { AddCategoriesComponent } from 'features/admin/add-categories/add-categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item-details/:id', component: ItemDetailsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wishlist/:id',
    component: WishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/items/new',
    component: AddItemsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/items/:id',
    component: AddItemsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/items',
    component: AdminItemsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/categories',
    component: AdminCategoriesComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/categories/new',
    component: AddCategoriesComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/categories/:id',
    component: AddCategoriesComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/brands',
    component: AdminBrandsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/brands/new',
    component: AddBrandsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'admin/brands/:id',
    component: AddBrandsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
