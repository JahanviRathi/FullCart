import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'shared/models/Brand';
import { Category } from 'shared/models/Category';
import { Item } from 'shared/models/Item';
import { Order } from 'shared/models/Order';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminApiUrl = 'https://localhost:7118/api/Admin';

  constructor(private httpClient: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.adminApiUrl + '/orders');
  }

  deleteItem(id: number): Observable<Item[]> {
    return this.httpClient.delete<Item[]>(this.adminApiUrl + '/items/' + id);
  }

  addItem(item: Item): Observable<Item[]> {
    return this.httpClient.post<Item[]>(this.adminApiUrl + '/items', item);
  }

  addItemsFromExcel(filePath: string): Observable<Item[]> {
    let params = new HttpParams().set('filePath', filePath);
    return this.httpClient.post<Item[]>(
      this.adminApiUrl + '/items/excel',
      null,
      {
        params,
      }
    );
  }

  updateItem(item: Item): Observable<Item[]> {
    return this.httpClient.put<Item[]>(this.adminApiUrl + '/items', item);
  }

  updateItemsFromExcel(filePath: string): Observable<Item[]> {
    let params = new HttpParams().set('filePath', filePath);

    return this.httpClient.put<Item[]>(
      this.adminApiUrl + '/items/excel', null, {params}
    );
  }

  addCategory(category: Category): Observable<Category[]> {
    return this.httpClient.post<Category[]>(
      this.adminApiUrl + '/categories',
      category
    );
  }

  addBrand(brand: Brand): Observable<Brand[]> {
    return this.httpClient.post<Brand[]>(this.adminApiUrl + '/brands', brand);
  }
}
