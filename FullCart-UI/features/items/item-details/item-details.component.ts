import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Item } from 'shared/models/Item';
import { SharedService } from 'shared/shared.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  itemId: number;
  item: Item;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    this.itemId = +this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }

  ngOnInit(): void {}

  getProduct() {
    this.sharedService
      .getItems()
      .pipe(map((item) => item.filter((item) => item.id === this.itemId)))
      .subscribe((items) => (this.item = items[0]));
  }
}
