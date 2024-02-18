import { Component, OnInit } from '@angular/core';
import { Brand } from 'shared/models/Brand';
import { SharedService } from 'shared/shared.service';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {
  brands: Brand[] = [];
  page = 1;
  pageSize = 5;

  constructor(
    private sharedService: SharedService,
  ) {
    this.getBrands();
  }

  ngOnInit(): void {}

  getBrands() {
    this.sharedService.getBrands().subscribe((brand) => {
      this.brands = brand;
    });
  }
}
