import { Component } from '@angular/core';
import { Order, OrderStatus } from 'shared/models/Order';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  orderDetails: Order[];

  constructor(private adminService: AdminService) {
    this.getOrder();
  }

  getOrder() {
    this.adminService.getAllOrders().subscribe((orderDetails: Order[]) => {
      this.orderDetails = orderDetails;
    });
  }

  getOrderStatus(status: number): string {
    return OrderStatus[status];
  }
}
