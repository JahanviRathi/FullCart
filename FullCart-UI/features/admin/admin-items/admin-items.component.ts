import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'shared/models/Item';
import { SharedService } from 'shared/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css'],
})
export class AdminItemsComponent implements OnInit {
  items: Item[] = [];
  itemsList: Item[] = [];
  action: string;
  page = 1;
  pageSize = 8;
  fromExcel: boolean = false;

  constructor(
    private sharedService: SharedService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sharedService.getItems().subscribe((items: Item[]) => {
      this.itemsList = this.items = items;
    });
  }

  delItem(item: Item) {
    if (
      confirm(
        'Are you sure you want to delete ' + item.name + ' from the database?'
      )
    ) {
      this.adminService.deleteItem(item.id).subscribe((items: Item[]) => {
        this.items = this.itemsList = items;
        this.toastr.success('Item ' + item.name + ' deleted successfully!!');
      });
    }
  }

  filter(query: string) {
    this.items = query
      ? this.itemsList.filter((prod) =>
          prod.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.itemsList;
  }

  excelAction(action: string) {
    this.fromExcel = true;
    this.action = action;
  }

  actionFromExcel(filePath: string) {
    if (this.action == 'add') {
      this.adminService.addItemsFromExcel(filePath).subscribe((data) => {
        this.itemsList = this.items = data;
        this.toastr.success('Item added successfully!!');
      });
    } else {
      this.adminService.updateItemsFromExcel(filePath).subscribe((data) => {
        this.itemsList = this.items = data;
        this.toastr.success('Item added successfully!!');
      });
    }
  }
}
