import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SettingsService } from '../shared/services/settings.service';
import { DbService } from '../shared/services/db.service';
import { promoInterface } from '../shared/interface/interface.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalComponent implements OnInit, OnDestroy {
  submitted = false;
  activeItem: string | number;
  error: string;
  message: string;
  promo: promoInterface[] = [];
  notifier = new Subject();

  constructor(
    private _db: DbService,    
    private _cartService: CartService,
    public settingsService: SettingsService,
  ) { }
  
  ngOnInit() {
    this.settingsService.ngOnInit();
    this.settingsService.getUserTerminal();
    this._db.getPromo().pipe(takeUntil(this.notifier)).subscribe(
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
      this._cartService.activeItemSales = item;
      this._cartService.sale = item.sale;
      this._cartService.setSale(item)
    } else {
      this.activeItem = '';
      this._cartService.activeItemSales = '';
      this._cartService.sale = '';
    }
  }  

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}