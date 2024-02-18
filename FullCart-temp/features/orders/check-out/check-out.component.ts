import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'features/orders/orders.service';
import { ShoppingCartService } from 'features/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'shared/models/Cart';
import { AuthService } from 'auth/auth.service';
import { User } from 'shared/models/User';
import { Order, OrderStatus } from 'shared/models/Order';
import { OrderItem } from 'shared/models/OrderItem';
import { ShippingDetails } from 'shared/models/ShippingDetails';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  shippingForm: FormGroup;
  currentUserId: number;
  cart: Cart;
  totalPrice: number;
  quantityPrice: number;
  totalQuantity: number;
  orderItems: OrderItem[] = [];
  shippingDetails: ShippingDetails;
  totalQuantityMsg: string;

  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.shippingForm = new FormGroup({
      Name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ]),
      Address: new FormGroup({
        AddLine1: new FormControl(null),
        AddLine2: new FormControl(null),
      }),
      City: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      PhoneNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9 ]+'),
      ]),
    });

    this.authService.user.subscribe((user: User) => {
      if (user) {
        this.getCartItems(user.id);
        this.currentUserId = user.id;
      } else {
        this.getCartItems(null);
        this.currentUserId = null;
      }
    });
  }

  getCartItems(currentUserId) {
    this.cartService.getCart(currentUserId).subscribe((cart) => {
      if (cart) {
        this.cart = cart;
        this.totalPrice = cart.totalPrice;
        this.totalQuantity = cart.totalQuantity;
        this.totalQuantityMsg = this.totalQuantity === 1 ? 'item' : 'items';
        this.orderItems = this.setOrderItem();
      } else {
        this.cart = null;
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.totalQuantityMsg = null;
        this.orderItems = [];
      }
    });
  }

  placeOrder() {
    this.shippingDetails = this.setShippingDetails();
    this.orderService
      .placeOrder(this.orderItems, this.shippingDetails, this.currentUserId)
      .subscribe((order: Order) => {
        this.cartService.clearCart(this.currentUserId);
        this.shippingForm.reset();
        this.toastr.success('Order Placed Successfully!', 'Success');
        this.router.navigate(['/']);
      });
  }

  private setOrderItem(): OrderItem[] {
    let orderItems: OrderItem[] = [];
    this.cart.cartItems.forEach((item) => {
      orderItems.push({
        quantity: item.quantityInCart,
        price: item.item.price * item.quantityInCart,
        itemId: item.item.id,
      });
    });
    return orderItems;
  }

  private setShippingDetails(): ShippingDetails {
    let shippingDetails: ShippingDetails = {
      name: this.shippingForm.value.Name,
      address:
        this.shippingForm.value.Address.AddLine1 +
        ', ' +
        this.shippingForm.value.Address.AddLine2,
      city: this.shippingForm.value.City,
      phoneNumber: this.shippingForm.value.PhoneNumber,
    };
    return shippingDetails;
  }
}
