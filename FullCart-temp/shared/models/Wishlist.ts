import { Item } from './Item';

export interface Wishlist {
  wishlistId: number;
  customerId: number;
  wishlistItems: {
    wishlistItemId: number;
    itemId: number;
    item: Item;
  }[];
}
