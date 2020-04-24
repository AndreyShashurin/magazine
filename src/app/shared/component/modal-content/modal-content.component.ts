import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { DbService } from '../../services/db.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'modal-content',
  templateUrl: './modal-content.component.html',
})
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  constructor(
    private db: DbService,
    private alert: AlertService,
    private modalService: BsModalService,
  ) {}
 
  ngOnInit() {
  }

  confirmDelete(data, link){
    if(link === 'menus'){
      this.db.deleteMenu(data);
    } else if(link === 'sklad'){
      this.db.getDeleteTovar(data);
    } else if(link === 'bill'){
      this.db.deleteBill(data);
    } else if(link === 'filial'){
      this.db.deleteFilial(data).subscribe(
        (responce) => {
            this.alert.success('заведение удалено из списка')
        },
        (error) => {
            this.alert.error('Ошибка удаленияю Попробуйте снова')            
        }
      )
    }
    this.modalService.hide(1);
  }

  ngOnDestroy() {
    this.confirmDelete(1, 2);
  }
}