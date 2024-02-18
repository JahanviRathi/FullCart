import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'shared/models/Category';
import { SharedService } from 'shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  page = 1;
  pageSize = 5;
  addCat = false;

  constructor(
    private sharedService: SharedService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.getCategories();
  }

  ngOnInit(): void {}

  getCategories() {
    this.sharedService.getCategories().subscribe((category) => {
      this.categories = category;
    });
  }

  addCategory(categoryName: string, imageUrl: string) {
    let catName: string =
      categoryName.charAt(0).toUpperCase() +
      categoryName.slice(1, categoryName.length).toLowerCase();
    let data: Category = { categoryName: catName, imageUrl: imageUrl };
    this.adminService.addCategory(data).subscribe((categories: Category[]) => {
      this.toastr.success(
        'Category : ' + data.categoryName + ' added succesfully!!'
      );
      this.addCat = false;
      this.categories = categories;
    });
  }
}
