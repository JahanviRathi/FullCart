import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'shared/models/Category';
import { SharedService } from 'shared/shared.service';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.css']
})
export class ItemFilterComponent{
  categories: Category[] = [];
  @Input() public selectedCategory: number;

  constructor(private sharedService: SharedService) {
    this.getCategories();
   }

  getCategories() {
    this.sharedService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
      });
  }

}
