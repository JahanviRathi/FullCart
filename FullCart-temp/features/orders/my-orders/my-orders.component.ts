import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { OrderService } from 'features/orders/orders.service';
import { AuthService } from 'auth/auth.service';
import { SharedService } from 'shared/shared.service';
import { User } from 'shared/models/User';
import { Order, OrderStatus } from 'shared/models/Order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orderDetails: Order[];
  userId: number;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.userId = user.id;
      this.getOrder(user.id);
    });
  }

  getOrder(userId: number) {
    this.sharedService
      .getAllOrdersByUserId(userId)
      .subscribe((orderDetails: Order[]) => {
        this.orderDetails = orderDetails;
      });
  }

  getOrderStatus(status: number): string {
    return OrderStatus[status];
  }

  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe((order: Order) => {
      console.log(order);

      this.getOrder(this.userId);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
