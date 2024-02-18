import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'shared/models/Category';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  categoryForm: FormGroup;
  id: number;
  text: string = 'Add';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.adminService.getCategoryById(this.id).subscribe((category) => {
        this.categoryForm.patchValue({
          categoryName: category.categoryName,
          imageUrl: category.imageUrl,
        });
        this.text = 'Edit';
      });
    } else {
      this.text = 'Add';
    }
  }

  onSubmit() {
    if (this.id) this.updateCategory();
    else this.addCategory();
  }

  addCategory() {
    let categoryValue = this.categoryForm.value;
    let data: Category = { categoryName: categoryValue.categoryName, imageUrl: categoryValue.imageUrl };
    this.adminService.addCategory(data).subscribe((categories: Category[]) => {
      this.categoryForm.reset();
      this.toastr.success(categoryValue.categoryName + ' added successfully!!');
      this.router.navigate(['/admin/categories']);
    });
  }

  updateCategory(): void {
    let data = this.categoryForm.value;
    let request: Category = {
      categoryId: this.id,
      categoryName: data.categoryName,
      imageUrl: data.imageUrl,
    };
    this.adminService.updateCategory(request).subscribe(() => {
      this.categoryForm.reset();
      this.toastr.success(data.categoryName + ' updated successfully!!');
      this.router.navigate(['/admin/categories']);
    });
  }
}
