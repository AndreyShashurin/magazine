import { Component, OnInit } from '@angular/core';

import { DbService } from '../services/db.service';

@Component({
  selector: 'modal-content',
  templateUrl: './modal-content.component.html',
})
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  constructor(
    private db: DbService,
  ) {}
 
  ngOnInit() {
  }

  confirmDelete(data, link){
    if(link === 'menus'){
      this.db.deleteMenu(data);
    } else if(link === 'sklad'){
      this.db.getDeleteTovar(data);
    }else if(link === 'bill'){
      this.db.deleteBill(data);
    }
  }

  ngOnDestroy() {
    this.confirmDelete(1, 2);
  }
}