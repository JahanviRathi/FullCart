import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'shared/models/Item';
import { SharedService } from 'shared/shared.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  allItems: Item[] = [];
  items: Item[] = [];
  selectedCategory: number;
  selectedBrand: number;

  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.getItems();
  }

  getItems() {
    this.sharedService.getItems().subscribe((items: Item[]) => {
      this.route.queryParamMap.subscribe((params) => {
        this.selectedCategory = +params.get('category');
        this.selectedBrand = +params.get('brand');
        this.allItems = items;
        if (this.selectedCategory || this.selectedBrand) {
          this.items = this.selectedCategory
            ? this.allItems.filter(
                (product) => product.categoryId === this.selectedCategory
              )
            : this.allItems.filter(
                (product) => product.brandId === this.selectedBrand
              );
        } else {
          this.items = this.allItems;
        }
        this.allItems = this.items;
      });
    });
  }

  filter(query: string) {
    this.items = query
      ? this.allItems.filter((prod) =>
          prod.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.allItems;
  }

  sort(type: string, func: number) {
    if (type === 'alpha')
      this.items =
        func === -1
          ? this.items.sort((a, b) =>
              a.name.toUpperCase() < b.name.toUpperCase() ? 1 : -1
            )
          : this.items.sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            );
    else
      this.items =
        func === -1
          ? this.items.sort((a, b) => (a.price < b.price ? 1 : -1))
          : this.items.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
}
