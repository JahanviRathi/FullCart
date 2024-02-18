import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'shared/models/Item';
import { HttpClient } from '@angular/common/http';
import { Cart } from 'shared/models/Cart';
import { SharedService } from 'shared/shared.service';
import { CartItem } from 'shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private customerApiUrl = 'https://localhost:7118/api/Customer/cart';
  cartQty: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) {}

  getCart(userId: number): Observable<Cart> {
    if (userId) {
      return this.sharedService.getCartByUserId(userId);
    } else {
      return of(this.getCartFromLocalStorage());
    }
  }

  public getCartFromLocalStorage() {
    let cart: Cart = JSON.parse(localStorage.getItem('cart'));
    return cart;
  }

  addToCart(cartItem: CartItem, currentUserId: number): Observable<Cart> {
    if (currentUserId) {
      return this.addToCartInDb(cartItem, currentUserId);
    }
    return of(this.addToCartInLocalStorage(cartItem));
  }

  addToCartInDb(cartItem: CartItem, currentUserId: number): Observable<Cart> {
    let request: { itemId: number; quantityInCart: number } = {
      itemId: cartItem.item.id,
      quantityInCart: cartItem.quantityInCart,
    };
    return this.httpClient.post<Cart>(
      this.customerApiUrl + '/' + currentUserId,
      request
    );
  }

  addToCartInLocalStorage(cartItem: CartItem): Cart {
    let cart: Cart = new Cart();
    let cartInLS = JSON.parse(localStorage.getItem('cart'));
    if (cartInLS) {
      cart = cartInLS;
      let existingItem = cart.cartItems
        .filter((item) => item.item.id === cartItem.item.id)
        .map((item) => item.quantityInCart++);
      if (existingItem.length === 0) {
        cart.cartItems.push(cartItem);
      }
    } else {
      cart.cartItems = [];
      cart.cartItems.push(cartItem);
      cart.totalPrice = cartItem.item.price;
      cart.totalQuantity = 1;
    }
    this.updateCartTotals(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartQty.next();
    return cart;
  }

  removeFromCart(cartItem: CartItem, currentUserId: number): Observable<Cart> {
    if (currentUserId) {
      return this.removeCartItemsFromDb(cartItem, currentUserId);
    } else {
      return of(this.removeCartItemsFromLocalStorage(cartItem));
    }
  }

  removeCartItemsFromDb(
    cartItem: CartItem,
    currentUserId: number
  ): Observable<Cart> {
    return this.httpClient.delete<Cart>(
      this.customerApiUrl + '/' + cartItem.item.id + '/' + currentUserId
    );
  }

  removeCartItemsFromLocalStorage(cartItem: CartItem): Cart {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.totalPrice -= cartItem.item.price * cartItem.quantityInCart;
    cart.totalQuantity -= cartItem.quantityInCart;
    cart.cartItems = cart.cartItems.filter((item) => item.item.id !== cartItem.item.id);
    this.updateCartTotals(cart);
    if(cart.totalQuantity > 0){
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    else{
      localStorage.removeItem('cart');
    }
    this.cartQty.next();
    return cart;
  }

  clearCart(userId: number) {
    if (userId) {
      this.httpClient
        .delete(this.customerApiUrl + '/' + userId)
        .subscribe(() => {
          this.cartQty.next();
        });
    } else {
      localStorage.removeItem('cart');
      this.cartQty.next();
    }
  }

  private updateCartTotals(cart) {
    cart.totalPrice = 0;
    cart.totalQuantity = 0;
    cart.cartItems.forEach((item) => {
      cart.totalPrice += item.item.price * item.quantityInCart;
      cart.totalQuantity += item.quantityInCart;
    });
  }
}
