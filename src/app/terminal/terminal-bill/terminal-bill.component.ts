import { Component, OnInit, Input } from '@angular/core';
import * as moment_ from 'moment';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface, TypePay } from '../../shared/interface/interface.service';
import { CartService } from '../../shared/services/cart.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { AlertService } from 'src/app/shared/services/alert.service';

const moment = moment_;
@Component({
  selector: 'terminal-bill',
  templateUrl: './terminal-bill.component.html',
  styleUrls: ['./terminal-bill.component.scss']
})
export class TerminalBillComponent implements OnInit {
  selectedTovar: menuIntarface[];
  coutner: number = 1;
  count: number = 0;
  date: Date;
  price: number = 0;
  priceSale: number = 0;
  typePay: any;
  keys = Object.keys;
  item: string;
  activeItem: string;
  @Input() openSmena: boolean;
  @Input() smena: boolean;


  constructor(
    private _db: DbService,
    private _settingsService: SettingsService,
    private _alert: AlertService,
    public cartService: CartService,
  ) { 
  }

  ngOnInit() {
    this.typePay = TypePay;
  }

  setIncrement(index: number): void {
    this.cartService.setIncrement(index);
  }

  setDecrement(index: number): void {
    this.cartService.setDecrement(index);
  }

  deleteCart(index: number): void {
    this.cartService.deleteCart(index);
  }

  deleteCombo(count:number, key: number, price: number) {
    this.cartService.incrementPrice(price)
    this.cartService.incrementCount(count)
    this.cartService.deleteCombo(key);
  }

  onSelectItem(item): void {
    if (!this.activeItem) {
      this.activeItem = item;
      this.cartService.cartForm.get('typePay').setValue(item)
    } else {
      this.activeItem = null;
      this.cartService.cartForm.get('typePay').setValue('')
    }
  }  

  trackByFn(index, item) {  
    return item.id;
  }

  buy() {
    const smena = [
      localStorage.getItem('SJTerminalid'), 
      this._settingsService.activefilial[0].id,
      moment(this.date).format('YYYY-MM-DD HH:mm:ss'),
      this.smena['id'],
      this.cartService.price,
      this.cartService.priceSale
    ];
    this._db.setBill(this.cartService.cartForm.value, smena).subscribe(
      (responce) => {this._alert.success('Счет сформирован')},
      (error) => {this._alert.error('Ошибка')}
    )
  }
}
