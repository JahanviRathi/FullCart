import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'features/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'auth/auth.service';
import { User } from 'shared/models/User';
import { UserLoginRequest } from 'shared/models/UserLoginRequest';
import { CartItem } from 'shared/models/CartItem';
import { Cart } from 'shared/models/Cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  redirectUrl = this.route.snapshot.queryParamMap.get('redirectTo') || '/';
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    const user: UserLoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(user).subscribe({
      next: (token: string) => {
        this.getCurrentUser(user.email);
        localStorage.setItem('authToken', token);
        this.toastr.success('Login Successfully!!');
        this.router.navigateByUrl(this.redirectUrl);
      },
      error: (err) => {
        this.toastr.error(err.error);
      },
    });
  }

  getCurrentUser(email: string) {
    this.authService.getCurrentUser(email).subscribe((user) => {
      this.currentUser = user;
      this.getDataFromLocalStorage(user);
    });
  }

  getDataFromLocalStorage(user) {
    let cart: Cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      cart.cartItems.map((item: CartItem) => {
        this.cartService.addToCart(item, user.id).subscribe((cart: Cart) => {
          cart = cart;
          this.cartService.cartQty.next();
        });
      });
      localStorage.removeItem('cart');
    }
  }
}
