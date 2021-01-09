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
  totalCounter: number = 1;
  breadcrumbs: any[] = [];
  count: number = 0;
  price: number = 0;
  priceSale: number = 0;

  onSelected(data) {
    this.data.tovar.push(data);
  }

  onSelectedArray(data, id) {
    this.data[`combo`].push(data);
  }

  updateCount(item: menuIntarface[], val: number) {
    this.data.tovar.map(val => val['id'] === item['id'] ? item['totalCounter'] = 1 : null)
    this.count += val;
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

  decrementCounter(key: any, item: any){
    this.data.tovar.map(val => val['id'] === item.id ? item.totalCounter++ : null)
    console.log(this.data.tovar)
  }

  incrementCounter(key: any, item: any){
    this.data.tovar.map(val => val['id'] === item.id ? item.totalCounter-- : null)
    if (item.totalCounter === 0) {
      this.deleteCart(key)
    }
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
