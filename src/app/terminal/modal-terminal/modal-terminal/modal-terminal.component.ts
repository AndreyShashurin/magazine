import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as moment_ from 'moment';
import { CartService } from '../../../shared/services/cart.service';
import { DbService } from '../../../shared/services/db.service';
import { SettingsService } from '../../../shared/services/settings.service';
import { menuIntarface, saveParamsSmena } from 'src/app/shared/services/interface.service';
const moment = moment_;

@Component({
  selector: 'app-modal-terminal',
  templateUrl: './modal-terminal.component.html',
  styleUrls: ['./modal-terminal.component.scss']
})
export class ModalTerminalComponent implements OnInit {
  form: FormGroup;
  price: number;
  date: Date;
  formWeight: FormGroup;
  Form: any = {
    price: ''
  };
  selectedComboChild = []
  formCombo = []
  
  constructor(
    public bsModalRef: BsModalRef,
    public db: DbService,
    public settingsService: SettingsService,
    public cartService: CartService
  ) {
   }

  ngOnInit() {
    this.formWeight = new FormGroup({
      weight: new FormControl('', Validators.required),
    });  

    this.form = new FormGroup({
      combo: new FormControl('', Validators.required)
    });   
  } 
  
  getNumber(v: string): void {
    this.formWeight.get('weight').setValue(this.formWeight.get('weight').value + v)
  }

  changeCount(data: menuIntarface): void {
    this.cartService.cartForm.get('tovars')['controls'].forEach(el => {
      if(el.get('id').value === data.id) {
        el.get('count').setValue(this.formWeight.get('weight').value)
        el.get('priceWeight').setValue((this.formWeight.get('weight').value / 1000) * el.get('price').value)
      }
    });
  }

  selectCombo(data) {      
  if(!this.selectedComboChild[data.id]) {
    this.selectedComboChild[data.id] = data
  } else {
    this.selectedComboChild.splice(data.id, 1)
  }
  console.log(this.selectedComboChild)
  }

  getCombo(data): void {
    console.log(this.formCombo)
    /*let zakaz1 = data[0][0].tovarArray.filter(val => val[0].name === this.form.controls['combo1'].value);
    let zakaz2 = data[1].filter(val => val[0].name === this.form.controls['combo2'].value);
    let zakaz = [data[0][0]];
    let length = [zakaz1[0][0], zakaz2[0][0]]
    zakaz[0]['zakaz'] = length;
    zakaz[0]['zakazLength'] = length.length;
    
    
    //this.cartService.addCartGroup(data)
    this.bsModalRef.hide();*/
  }

  updateAmount(e) {

  }

  saveModal(data, smena = 0): void {
    const payload: saveParamsSmena[] = [
      localStorage.getItem('SJTerminalid'), 
      this.settingsService.activefilial[0].id,
      moment(this.date).format('YYYY-MM-DD HH:mm:ss'),     
      smena,
      +this.Form.price
    ];
    if(data === 5) {
      this.db.closeSmena(payload).subscribe(
        val => {
          this.settingsService.isOpenSmena.next(true);
          this.bsModalRef.hide();
        }
      )
    } else {
      this.db.openSmena(payload).subscribe(
        val => {
          this.settingsService.isOpenSmena.next(false);
          this.bsModalRef.hide();
        }
      )
    }
  }
}
