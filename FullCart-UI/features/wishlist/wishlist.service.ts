import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'shared/models/Item';
import { Wishlist } from 'shared/models/Wishlist';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private customerApiUrl: string =
    'https://localhost:7118/api/Customer/wishlist';

  constructor(private httpClient: HttpClient) {}

  addToWishlist(itemId: number, currentUserId: number): Observable<Wishlist> {
    return this.httpClient.post<Wishlist>(
      this.customerApiUrl + '/' + currentUserId,
      { itemId: itemId }
    );
  }

  removeItem(itemId: number, userId: number): Observable<Wishlist> {
    return this.httpClient.delete<Wishlist>(
      this.customerApiUrl + '/' + itemId + '/' + userId
    );
  }
}
