import { Component, OnInit } from '@angular/core';
import { Category } from 'shared/models/Category';
import { SharedService } from 'shared/shared.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  page = 1;
  pageSize = 5;

  constructor(
    private sharedService: SharedService
  ) {
    this.getCategories();
  }

  ngOnInit(): void {}

  getCategories() {
    this.sharedService.getCategories().subscribe((category) => {
      this.categories = category;
    });
  }
}
