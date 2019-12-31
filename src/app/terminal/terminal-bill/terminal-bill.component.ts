import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface } from '../../shared/services/interface.service';
import { CartService } from '../../shared/services/cart.service';
import { TerminalComponent } from '../terminal.component';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'terminal-bill',
  templateUrl: './terminal-bill.component.html',
  styleUrls: ['./terminal-bill.component.scss']
})
export class TerminalBillComponent extends TerminalComponent implements OnInit {
  selectedTovar: menuIntarface[];
  coutner: number = 1;
  count: number = 0;
  price: number = 0;
  priceSale: number = 0;
  item: string;
  activeItem: string;
  list: any = [
    'Безналичными',
    'Наличными'
  ]
  @Input() openSmena: boolean;


  constructor(
    public db: DbService,
    public cartService: CartService,
    public settingsService: SettingsService,
  ) { 
    super (
      db,
      settingsService
    )
  }

  ngOnInit() {
  }

  setIncrement(key: any, item: any, price: number)  {
    this.coutner--;
    this.cartService.count--;
    this.cartService.incrementPrice(+price)
    this.cartService.incrementCounter(key, item)
  }

  setDecrement(key: any, item: any, price: number) {
    this.coutner++;
    this.cartService.count++;
    this.cartService.updatePrice(+price)
    this.cartService.decrementCounter(key, item)
  }

  deleteCart(key: number, count:number, price: any) {
    this.cartService.incrementPrice(+price * count)
    this.cartService.incrementCount(count)
    this.cartService.deleteCart(key);
  }

  deleteCombo(count:number, key: number, price: number) {
    this.cartService.incrementPrice(price)
    this.cartService.incrementCount(count)
    this.cartService.deleteCombo(key);
  }

  onSelectItem(item): void {
    if (!this.activeItem) {
      this.activeItem = item;
    } else {
      this.activeItem = null;
    }
  }  

  trackByFn(index, item) {  
    return item.id;
  }

  buy() {
    
  }
}
