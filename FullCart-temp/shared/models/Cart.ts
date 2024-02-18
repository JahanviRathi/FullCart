import { CartItem } from './CartItem';

export class Cart {
  cartId: number;
  customerId: string;
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
