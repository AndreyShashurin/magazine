import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DbService } from '../../../shared/services/db.service';
import { AlertService } from '../../../shared/services/alert.service';
import { SettingsService } from '../../../shared/services/settings.service';

@Component({
  selector: 'modal-update',
  templateUrl: './modal-update.component.html',
})
export class ModalUpdateComponent implements OnInit {
  @Input() item
  @Input() type
  payments: any = [];
  form: FormGroup;
  constructor(
    public db: DbService,
    private alert: AlertService,
    private modalService: BsModalRef,
    public settingsService: SettingsService,
  ) {
    this.db.getPayment().subscribe(
      (val) => {
        this.payments = val;
      },
      (error) => {
        console.log(error);
      }
    )  
  }
  ngOnChanges() {
    console.log(this.payments)
  }
  
  ngOnInit() {
    console.log(this.item)
    this.form = new FormGroup({
      id: new FormControl(''),
      price: new FormControl(''), // Цена продажи
      sale_price_margin: new FormControl(''), // Прибыль
      typeBill: new FormControl(''),
      payBill: new FormControl(''),
      commentBill: new FormControl(''),
      nameFilial: new FormControl(''),
      adressFilial: new FormControl('')
    });
  }

  ngAfterContentChecked() {
  }

  confirm(data, type){
    if(type === 2) {
      console.log(data)
      this.form.value.id = data.id
      this.form.value.price = data.price
      this.form.value.sale_price_margin = data.sale_price_margin
      this.form.value.oldTypeBiill = data.type_biill
      this.form.value.smenaId = data.smena_id
    console.log(this.form.value)
      /*this.db.updateBill(this.form.value).subscribe(
          (responce) => {
              console.log(responce)
              this.alert.success('Информация о пользователе изменена')
          },
          (error) => {
            console.error(error)
              this.alert.error('Ошибка изменения')
          }
      ) */

    } else if (type === 5) {
      const dataUpdate = {
        id: data.id,
        name: data.name,
        adress: data.adress,
      }
      this.db.updateFilial(dataUpdate).subscribe(
          (responce) => {
              console.log(responce)
              this.alert.success('Информация о пользователе изменена')
          },
          (error) => {
            console.error(error)
              this.alert.error('Ошибка изменения')
          }
      ) 
    }
    this.modalService.hide();
  }

  close() {
    this.modalService.hide();
  }

  ngOnDestroy() {
  }
}