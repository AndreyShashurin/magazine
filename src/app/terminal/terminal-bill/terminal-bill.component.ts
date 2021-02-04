import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface, TypePay } from '../../shared/services/interface.service';
import { CartService } from '../../shared/services/cart.service';
import { TerminalComponent } from '../terminal.component';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  typePay: any;
  keys = Object.keys;
  item: string;
  activeItem: string;
  @Input() openSmena: boolean;


  constructor(
    public db: DbService,
    public cartService: CartService,
    public fb: FormBuilder,
    public settingsService: SettingsService,
  ) { 
  }

  ngOnInit() {
    this.typePay =  TypePay;
    console.log(this.typePay)
  }

  setIncrement(data: menuIntarface, index: number): void {
    const form = this.cartService.cartForm.get('tovars')['controls'][index];
    let count = form.get('count').value
    form.get('count').setValue(--count) 
    if(form.get('weightFlag') !== 0) {
      form.get('priceWeight').setValue((form.get('count').value / 1000) * form.get('price').value)
    } else {
      form.get('priceWeight').setValue(form.get('price').value * form.get('count').value)
    }
  }

  setDecrement(data: menuIntarface, index: number): void {
    const form = this.cartService.cartForm.get('tovars')['controls'][index];
    let count = form.get('count').value
    form.get('count').setValue(++count)
    if(form.get('weightFlag').value !== 0) {
      form.get('priceWeight').setValue((form.get('count').value / 1000) * form.get('price').value)
    } else {  
      form.get('priceWeight').setValue(form.get('price').value * form.get('count').value)
    }
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
    this.db.setBill(this.cartService.cartForm.value).subscribe(el => {
      
    console.log(el)
    })
    
  }
}
