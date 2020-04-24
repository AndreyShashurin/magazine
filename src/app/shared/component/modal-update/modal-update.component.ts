import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { DbService } from '../../services/db.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'modal-update',
  templateUrl: './modal-update.component.html',
})
export class ModalUpdateComponent implements OnInit {
  constructor(
    private db: DbService,
    private alert: AlertService,
    private modalService: BsModalService,
  ) {}
 
  ngOnInit() {
  }

  confirm(data){
    console.log(data)
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
    this.modalService.hide(1);
  }

  ngOnDestroy() {
  }
}