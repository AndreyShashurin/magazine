import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '../shared/services/settings.service';
import { DbService } from '../shared/services/db.service';
import { promoInterface } from '../shared/services/interface.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, OnDestroy {

  currentNumber: string = '';
  submitted: boolean = false;
  activeItem: string | number;
  error: string;
  message: string;
  promo: promoInterface[] = [];
  notifier = new Subject();

  constructor(
    public db: DbService,    
    public settingsService: SettingsService,
    public cartService: CartService
  ) {
  }
  
  ngOnInit() {
    this.settingsService.ngOnInit();
    this.settingsService.getUserTerminal();
    this.db.getPromo().pipe(takeUntil(this.notifier)).subscribe(
      (val) => {
        this.promo = val;
      },
      (error) => {
        console.log(error);
      }
    )
  }

   onSelectItem(item: any): void {
    if (!this.activeItem) {
      this.activeItem = item;
      this.cartService.activeItemSales = item;
      this.cartService.sale = item.sale;
      this.cartService.setSale(item)
    } else {
      this.activeItem = '';
      this.cartService.activeItemSales = '';
      this.cartService.sale = '';
    }
  }  

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}