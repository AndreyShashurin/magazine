import { Injectable, EventEmitter, Output } from '@angular/core';
import { menuIntarface } from './interface.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  tovarSelected = new EventEmitter<menuIntarface[]>();
  data: any = {
    tovar: [],
    combo: []
  };
  breadcrumbs: any[] = [];
  count: number = 0;
  price: number = 0;

  onSelected(data) {
    this.data.tovar.push(data);
  }

  onSelectedArray(data, id) {
    this.data[`combo`].push(data)
    console.log(this.data)
  }

  updateCount(data: number) {
    this.count += data;
  }

  incrementCount(data: number) {
    this.count -= data;
  }

  incrementPrice(data: number) {
    this.price -= data;
  }

  updatePrice(data: number) {
    this.price += data;
  }

  onBreadcrumbs(data) {
    this.breadcrumbs.push(data);
  }

  deleteCart(index: number) {
    this.data.tovar = this.data.tovar.filter((arr, i) => i !== index)
  }  

  deleteCombo(index: number) {
    this.data.combo = this.data.combo.filter((arr, i) => i !== index)
  }
}
