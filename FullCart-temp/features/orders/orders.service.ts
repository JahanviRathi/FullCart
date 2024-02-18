import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from 'shared/models/Order';
import { OrderItem } from 'shared/models/OrderItem';
import { ShippingDetails } from 'shared/models/ShippingDetails';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private customerApiUrl: string = 'https://localhost:7118/api/Customer/orders';

  constructor(private httpClient: HttpClient) {}

  placeOrder(
    orderItems: OrderItem[],
    shippingDetails: ShippingDetails,
    userId: number
  ): Observable<Order> {
    let request: {
      orderItems: OrderItem[];
      shippingDetail: ShippingDetails;
      customerId: number;
    } = {
      orderItems: orderItems,
      shippingDetail: shippingDetails,
      customerId: userId,
    };
    return this.httpClient.post<Order>(this.customerApiUrl, request);
  }

  cancelOrder(orderId: number): Observable<Order> {
    return this.httpClient.patch<Order>(
      this.customerApiUrl + '/' + orderId + '/1',
      {}
    );
  }
}
