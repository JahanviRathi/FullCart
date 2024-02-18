import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'features/cart/cart.service';
import { Item } from 'shared/models/Item';
import { AuthService } from 'auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'shared/models/User';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  isMenuCollapsed = true;
  user: User = new User();
  totalQuantity = 0;
  isAdmin: number = 0;
  private userSub: Subscription;
  private cartQtySub: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.user = user;
      if (user) {
        this.isAdmin = user.role == 'Admin' ? 1 : 0;
        this.getTotalQuantity(user.id);
      } else {
        this.getTotalQuantity(null);
      }
    });

    this.cartQtySub = this.cartService.cartQty.subscribe(() => {
      if (this.user) this.getTotalQuantity(this.user.id);
      else this.getTotalQuantity(null);
    });
  }

  getTotalQuantity(userId: number) {
    this.cartService.getCart(userId).subscribe((cart) => {
      if (cart) this.totalQuantity = cart.totalQuantity;
      else this.totalQuantity = 0;
    });
  }

  logout() {
    this.isMenuCollapsed = true;
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.cartQtySub.unsubscribe();
  }
}
