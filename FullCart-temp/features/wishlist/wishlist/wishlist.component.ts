import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from 'features/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'shared/models/Item';
import { SharedService } from 'shared/shared.service';
import { map } from 'rxjs/operators';
import { Wishlist } from 'shared/models/Wishlist';
import { Subscription } from 'rxjs';
import { AuthService } from 'auth/auth.service';
import { User } from 'shared/models/User';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  id: number;
  userId: number;
  wishlist: Wishlist;
  totalWishlistItems: number = 0;
  msg: string;
  private userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.userSub = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.userId = user.id;
        if (this.id) this.addToWishlist();
        else this.getWishlist();
      } else {
        this.userId = null;
      }
    });
  }

  addToWishlist(): void {
    this.wishlistService
      .addToWishlist(this.id, this.userId)
      .subscribe((wishlist: Wishlist) => {
        console.log(wishlist);

        this.wishlist = wishlist;
        this.totalWishlistItems = wishlist.wishlistItems.length;
        this.msg = this.totalWishlistItems === 1 ? 'item' : 'items';
        this.toastr.success('Item added to wishlist successfully!!');
      });
  }

  getWishlist() {
    this.sharedService
      .getWishlistByUserId(this.userId)
      .subscribe((wishlist: Wishlist) => {
        if (wishlist) {
          this.wishlist = wishlist;
          this.totalWishlistItems = wishlist.wishlistItems.length;
          this.msg = this.totalWishlistItems === 1 ? 'item' : 'items';
        } else {
          this.totalWishlistItems = 0;
        }
      });
  }

  removeFromWishlist(item: Item) {
    if (confirm('Do you want to remove ' + item.name + ' from wishlist?')) {
      this.wishlistService
        .removeItem(item.id, this.userId)
        .subscribe((wishlist: Wishlist) => {
          this.wishlist = wishlist;
          this.totalWishlistItems = wishlist.wishlistItems.length;
          this.msg = this.totalWishlistItems === 1 ? 'item' : 'items';
          this.toastr.success(
            item.name + ' removed from wishlist successfully!!'
          );
        });
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
