import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'auth/auth.service';
import { ShoppingCartService } from 'features/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cart } from 'shared/models/Cart';
import { CartItem } from 'shared/models/CartItem';
import { Item } from 'shared/models/Item';
import { User } from 'shared/models/User';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() public item: Item;

  currentUserId: number;
  cartItems: CartItem[] = [];
  quantity: number = 0;
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
      this.getQuantity();
    });
  }

  addToCart() {
    let cartItem: CartItem = {
      item: this.item,
      quantityInCart: 1,
    };

    this.cartService
      .addToCart(cartItem, this.currentUserId)
      .subscribe((cart: Cart) => {
        this.cartItems = cart.cartItems;
        this.showQuantity();
        this.toastr.success('Item added to cart!!');
        this.cartService.cartQty.next();
      });
  }

  getQuantity(): void {
    this.cartService.getCart(this.currentUserId).subscribe((cart: Cart) => {
      if (cart) {
        this.cartItems = cart.cartItems;
        this.quantity = cart.totalQuantity;
      }
      this.showQuantity();
    });
  }

  showQuantity() {
    if (this.cartItems) {
      let itemsList: CartItem = this.cartItems.find(
        (items) => items.item.id === this.item.id
      );
      if (itemsList) this.quantity = itemsList.quantityInCart;
      else this.quantity = 0;
    }
  }

  removeFromCart() {
    let cartItem: CartItem = {
      item: this.item,
      quantityInCart: 1,
    };
    this.cartService
      .removeFromCart(cartItem, this.currentUserId)
      .subscribe((cart: Cart) => {
        this.cartItems = cart.cartItems;
        this.showQuantity();
        this.toastr.success(
          this.item.name + ' removed from cart successfully!!'
        );
        this.cartService.cartQty.next();
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
