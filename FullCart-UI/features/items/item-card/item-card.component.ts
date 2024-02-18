import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Brand } from 'shared/models/Brand';
import { Item } from 'shared/models/Item';
import { SharedService } from 'shared/shared.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css'],
})
export class ItemCardComponent implements OnInit, OnChanges {
  @Input() public item: Item;
  @Input() public showActions: boolean;

  brands: Brand[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.item.brand) {
      let brand: Brand = this.brands.find(
        (b) => b.brandId == this.item.brandId
      );
      this.item.brand = brand;
    }
  }

  ngOnInit(): void {
    this.sharedService.getBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
    });
  }
}
