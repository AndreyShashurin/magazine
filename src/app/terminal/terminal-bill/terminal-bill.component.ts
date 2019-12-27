import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface } from '../../shared/services/interface.service';
import { CartService } from '../../shared/services/cart.service';
import { TerminalComponent } from '../terminal.component';

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
    private cartService: CartService,
  ) { 
    super (
      db
    )
  }

  ngOnInit() {
  }

  setIncrement(price: string)  {
    this.coutner--;
    this.cartService.count--;
  }

  setDecrement(price: string) {
    this.coutner++;
    this.cartService.count++;
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

  onVoted(agreed: boolean) {
    console.log(agreed)
  }

  buy() {
    
  }
}
