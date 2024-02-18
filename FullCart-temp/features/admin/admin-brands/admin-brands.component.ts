import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'shared/models/Brand';
import { SharedService } from 'shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {
  brands: Brand[] = [];
  page = 1;
  pageSize = 5;
  addCat = false;

  constructor(
    private sharedService: SharedService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.getBrands();
  }

  ngOnInit(): void {}

  getBrands() {
    this.sharedService.getBrands().subscribe((brand) => {
      this.brands = brand;
    });
  }

  addBrand(brandName: string, imageUrl: string) {
    let catName: string =
      brandName.charAt(0).toUpperCase() +
      brandName.slice(1, brandName.length).toLowerCase();
    let data: Brand = { brandName: catName, imageUrl: imageUrl };
    this.adminService.addBrand(data).subscribe((brands: Brand[]) => {
      this.toastr.success(
        'Brand : ' + data.brandName + ' added succesfully!!'
      );
      this.addCat = false;
      this.brands = brands;
    });
  }
}
