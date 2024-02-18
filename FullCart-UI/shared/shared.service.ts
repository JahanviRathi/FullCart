import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './models/Item';
import { Order } from './models/Order';
import { Brand } from './models/Brand';
import { Category } from './models/Category';
import { Cart } from './models/Cart';
import { Wishlist } from './models/Wishlist';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiUrl: string = 'https://localhost:7118/api/Shared';

  constructor(private httpClient: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.apiUrl + '/items');
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl + '/categories');
  }

  getBrands(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(this.apiUrl + '/brands');
  }

  getCartByUserId(userId: number): Observable<Cart> {
    return this.httpClient.get<Cart>(this.apiUrl + '/cart/' + userId);
  }

  getWishlistByUserId(userId: number): Observable<Wishlist> {
    return this.httpClient.get<Wishlist>(this.apiUrl + '/wishlist/' + userId);
  }

  getAllOrdersByUserId(userId: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl + '/orders/' + userId);
  }
  
}
