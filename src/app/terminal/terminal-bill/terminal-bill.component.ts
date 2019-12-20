import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface } from '../../shared/services/interface.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'terminal-bill',
  templateUrl: './terminal-bill.component.html',
  styleUrls: ['./terminal-bill.component.scss']
})
export class TerminalBillComponent implements OnInit {
  selectedTovar: menuIntarface[];
  coutner: number = 1;
  count: number = 0;
  price: number = 0;
  priceSale: number = 0;


  constructor(
    public db: DbService,
    private cartService: CartService
  ) { 
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

  deleteCart(data){
    this.cartService.count--;
    this.cartService.deleteCart(data);
  }
}
