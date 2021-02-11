import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { DbService } from '../../../shared/services/db.service';
import { AlertService } from '../../../shared/services/alert.service';

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
    private modalService: BsModalRef,
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
    } else if(link === 'category'){
      this.db.deleteFinance(data);
    }
    this.modalService.hide();
  }

  ngOnDestroy() {
    //this.confirmDelete(1, 2);
  }
}