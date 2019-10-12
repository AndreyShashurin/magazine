import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DbService } from '../db.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ModalBody}}
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-sm btn-danger" data-dismiss="modal" (click)="confirmDelete(confirmDeleteParam, confirmDeleteGet)">{{confirmBtnName}}</button>
    <button type="button" class="btn btn-sm btn-primary" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  constructor(
    private db: DbService,
    private http: HttpClient,
    public bsModalRef: BsModalRef
  ) {}
 
  ngOnInit() {
  }

  confirmDelete(data, link){
    if(link === 'menus'){
      this.db.deleteMenu(data);
    } else if(link === 'sklad'){
      this.db.getDeleteTovar(data);
    }else if(link === 'bill'){
      this.db.getDeleteBill(data);
    }
  }

  ngOnDestroy() {
    this.confirmDelete(1, 2);
  }
}