import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemFilterComponent } from './item-filter/item-filter.component';
import { ItemsComponent } from './items/items.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CartModule } from 'features/cart/cart.module';

@NgModule({
  declarations: [
    ItemCardComponent,
    ItemDetailsComponent,
    ItemFilterComponent,
    ItemsComponent,
  ],
  imports: [CommonModule, SharedModule, AppRoutingModule, CartModule],
  exports: [
    ItemCardComponent,
    ItemDetailsComponent,
    ItemFilterComponent,
    ItemsComponent,
  ],
})
export class ItemsModule {}
