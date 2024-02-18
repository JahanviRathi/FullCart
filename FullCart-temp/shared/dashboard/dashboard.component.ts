import { Component } from '@angular/core';
import { SharedService } from 'shared/shared.service';
import { Item } from 'shared/models/Item';
import { Category } from 'shared/models/Category';
import { Brand } from 'shared/models/Brand';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  categories: Category[] = [];
  brands: Brand[] = [];
  allItems: Item[] = [];
  items: Item[] = [];

  constructor(private sharedService: SharedService) {
    this.getCategories();
    this.getBrands();
    this.getItems();
  }

  getCategories() {
    this.sharedService
      .getCategories()
      .subscribe((responseCategories: Category[]) => {
        this.categories = responseCategories;
      });
  }

  getBrands(){
    this.sharedService
   .getBrands()
   .subscribe((responseBrands: Brand[]) => {
        this.brands = responseBrands;
      });
  }

  getItems() {
    this.sharedService.getItems().subscribe((responseItems: Item[]) => {
      this.allItems = responseItems;
      this.categories.map((selectedCategory: Category) => {
        let items: Item[] = selectedCategory
          ? this.allItems.filter(
              (item) =>
                item.categoryId === selectedCategory.categoryId
            )
          : this.allItems;
        this.items.push(items[0]);
      });
    });
  }
}
