import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment_ from 'moment';
import { CartService } from '../../../shared/services/cart.service';
import { DbService } from '../../../shared/services/db.service';
import { SettingsService } from '../../../shared/services/settings.service';
import { TerminalComponent } from '../../terminal.component';
const moment = moment_;

@Component({
  selector: 'app-modal-terminal',
  templateUrl: './modal-terminal.component.html',
  styleUrls: ['./modal-terminal.component.scss']
})
export class ModalTerminalComponent extends TerminalComponent implements OnInit {
  form: FormGroup;
  price: number;
  date: Date;
  Form: any = {
    price: ''
  };
  
  constructor(
    public bsModalRef: BsModalRef,
    public db: DbService,
    public settingsService: SettingsService,
    public cartService: CartService
  ) {
    super (
      db,
      settingsService
    )
   }

  ngOnInit() {

    this.form = new FormGroup({
      combo1: new FormControl(Validators.required),
      combo2: new FormControl(Validators.required)
    });    
  }

  getCombo(data, item) {
    let zakaz1 = data[0][0].tovarArray.filter(val => val[0].name === this.form.controls['combo1'].value);
    let zakaz2 = data[1].filter(val => val[0].name === this.form.controls['combo2'].value);
    let zakaz = [data[0][0]];
    let length = [zakaz1[0][0], zakaz2[0][0]]
    zakaz[0]['zakaz'] = length;
    zakaz[0]['zakazLength'] = length.length;
    
    this.cartService.updateCount(zakaz[0], length.length);
    this.cartService.onSelectedArray(zakaz[0], item.id);
    this.cartService.updatePrice(+item.price);
    
    this.bsModalRef.hide();
  }

  updateAmount(e) {

  }

  saveModal() {

    let smena = [
      localStorage.getItem('SJTerminalid'), 
      localStorage.getItem('SJTerminalid'), 
      moment(this.date).format('DD.MM.YYYY'), 
      moment(this.date).locale('ru').format('DD MMMM YYYY h:mm:ss'), 
      +this.Form.price, 
      moment(this.date).format('YYYY-MM-DD h:mm:ss')     
    ]
    this.db.setOpenSmena(smena).subscribe(
      val => {
        this.bsModalRef.hide();
        this.settingsService.setSmena(true)
      }
    )
  }
}
