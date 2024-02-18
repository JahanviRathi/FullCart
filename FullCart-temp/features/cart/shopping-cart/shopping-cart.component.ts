import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'auth/auth.service';
import { ShoppingCartService } from 'features/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cart } from 'shared/models/Cart';
import { CartItem } from 'shared/models/CartItem';
import { Item } from 'shared/models/Item';
import { User } from 'shared/models/User';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  currentUserId: number;
  cart: Cart = new Cart();
  totalQuantity: number = 0;
  totalQuantityMsg: string;
  totalPrice: number = 0;
  private userSub: Subscription;

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.currentUserId = user.id;
      } else {
        this.currentUserId = null;
      }
      this.getCart();
    });
  }

  getCart() {
    this.cartService.getCart(this.currentUserId).subscribe((cart: Cart) => {
      if (this.cart) {
        this.cart = cart;
        this.totalQuantity = cart.totalQuantity;
        this.totalPrice = cart.totalPrice;
        this.totalQuantityMsg = this.totalQuantity === 1 ? 'item' : 'items';
      }
    });
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart(this.currentUserId);
      this.cart = null;
      this.totalPrice = 0;
      this.totalQuantity = 0;
      this.totalQuantityMsg = null;
      this.toastr.success('Cart cleared successfully!!');
    }
  }

  removeFromCart(cartItem: CartItem) {
    if (
      confirm(
        'Are you sure you want to remove ' + cartItem.item.name + ' your cart?'
      )
    ) {
      this.cartService
        .removeFromCart(cartItem, this.currentUserId)
        .subscribe((cart: Cart) => {
          this.getCart();
          this.toastr.success(
            cartItem.item.name + 'removed from cart successfully!!'
          );
          this.cartService.cartQty.next();
        });
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
