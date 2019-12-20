import { Injectable, EventEmitter, Output } from '@angular/core';
import { menuIntarface } from './interface.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  tovarSelected = new EventEmitter<menuIntarface[]>();
  data: menuIntarface[] = [];
  breadcrumbs: any[] = [];
  count: number = 0;

  onSelected(data) {
    this.data.push(data);
  }

  onBreadcrumbs(data) {
    this.breadcrumbs.push(data);
  }

  deleteCart(data) {
    this.data = this.data.filter(val => val.id !== data.id);
  }
}
