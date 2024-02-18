import { Item } from "./Item";

export class OrderItem {
  orderItemId?: number;
  quantity: number;
  price: number;
  itemId: number;
  item?: Item;
}
