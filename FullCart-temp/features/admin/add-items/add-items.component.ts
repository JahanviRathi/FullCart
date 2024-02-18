import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Brand } from 'shared/models/Brand';
import { Category } from 'shared/models/Category';
import { Item } from 'shared/models/Item';
import { SharedService } from 'shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  itemForm: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  id: number;
  text: string = 'Add';

  constructor(
    private sharedService: SharedService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.itemForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      categoryId: new FormControl(null, Validators.required),
      brandId: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getBrands();

    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.getOneItem(this.id).subscribe((item) => {
        this.itemForm.patchValue({
          name: item.name,
          description: item.description,
          categoryId: item.categoryId,
          brandId: item.brandId,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        });
        this.text = 'Edit';
      });
    } else {
      this.text = 'Add';
    }
  }

  onSubmit(){
    if(this.id)
      this.updateItem();
    else
      this.addItem();
  }

  addItem() {
    let data = this.itemForm.value;
    this.adminService.addItem(data).subscribe((items: Item[]) => {
      this.itemForm.reset();
      this.toastr.success(data.name + " added successfully!!")
      this.router.navigate(['/admin/items']);
    });
  }

  updateItem(): void{ 
    let data = this.itemForm.value;
    let request: Item = {
      id: this.id,
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      price: data.price,
      brandId: data.brandId,
      categoryId: data.categoryId,
      quantity: data.quantity,
    }
    this.adminService.updateItem(request).subscribe(() => {
      this.itemForm.reset();
      this.toastr.success(data.name + " updated successfully!!")
      this.router.navigate(['/admin/items']);
    });
  }

  getCategories() {
    this.sharedService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  getBrands() {
    this.sharedService.getBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
    });
  }

  getOneItem(itemId) {
    return this.sharedService
      .getItems()
      .pipe(
        map((items: Item[]) => items.find((item: Item) => item.id === itemId))
      );
  }
}
