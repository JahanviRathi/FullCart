import { OrderItem } from './OrderItem';
import { ShippingDetails } from './ShippingDetails';

export enum OrderStatus {
  OrderCreated,
  OrderCancelled,
  OrderDelivered,
}

export interface Order {
  orderId?: number;
  customerId: number;
  shippingDetailId?: number;
  shippingDetails: ShippingDetails;
  datePlaced: Date;
  products: OrderItem[];
  orderStatus?: OrderStatus;
}
