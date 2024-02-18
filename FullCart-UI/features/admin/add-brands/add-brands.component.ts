import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'shared/models/Brand';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.css'],
})
export class AddBrandsComponent implements OnInit {
  brandForm: FormGroup;
  id: number;
  text: string = 'Add';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.brandForm = new FormGroup({
      brandName: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.adminService.getBrandById(this.id).subscribe((brand) => {
        this.brandForm.patchValue({
          brandName: brand.brandName,
          imageUrl: brand.imageUrl,
        });
        this.text = 'Edit';
      });
    } else {
      this.text = 'Add';
    }
  }

  onSubmit() {
    if (this.id) this.updateBrand();
    else this.addBrand();
  }

  addBrand() {
    let brandValue = this.brandForm.value;
    let data: Brand = { brandName: brandValue.brandName, imageUrl: brandValue.imageUrl };
    this.adminService.addBrand(data).subscribe((brands: Brand[]) => {
      this.brandForm.reset();
      this.toastr.success(brandValue.brandName + ' added successfully!!');
      this.router.navigate(['/admin/brands']);
    });
  }

  updateBrand(): void {
    let data = this.brandForm.value;
    let request: Brand = {
      brandId: this.id,
      brandName: data.brandName,
      imageUrl: data.imageUrl,
    };
    this.adminService.updateBrand(request).subscribe(() => {
      this.brandForm.reset();
      this.toastr.success(data.brandName + ' updated successfully!!');
      this.router.navigate(['/admin/brands']);
    });
  }
}
