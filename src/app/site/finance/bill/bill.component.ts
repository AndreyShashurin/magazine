import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SubscriptionLike, of } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Store } from '@ngrx/store';

import { SettingsService } from '../../../shared/services/settings.service';
import { DbService } from '../../../shared/services/db.service';
import { ModalContentComponent } from '../../shared/modal-content/modal-content.component';
import { ModalDetailComponent } from '../../shared/modal-detail/modal-detail.component';
import { ModalUpdateComponent } from '../../shared/modal-update/modal-update.component';
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent extends HomeComponent implements OnInit {
  bill: any;
  bsModalRef: BsModalRef;
  subscription: SubscriptionLike;
  constructor(
    public db: DbService,
    private modalService: BsModalService,
    public settingsService: SettingsService,
    public store: Store
  ) {
    super(
      db,
      settingsService,
      store
    )
  }

  
  ngOnInit() {
    this.getBill()
  }

  getBill() {
    this.subscription = this.db.getBill().subscribe(
      (response: Response) => { 
          this.bill = response;
      } ,
      (error) => {console.log(error);}
    )  
  }

  openModal(item, type) {
    const initialState = {
     /* list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],*/
      title: 'Удалить счет'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить счет № ${item.id} ?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = item;
    this.bsModalRef.content.confirmDeleteGet = type;
  }

  openDetail(item){
    let structureArray = [];
    let sum = 0;
    item.tovar[0].forEach(function(value, key) {
      sum = sum +	parseFloat(value[8].split('=')[1]);
      structureArray.push({
        "name": value[5].split('=')[1],
        "size": value[6].split('=')[1],
        "price": value[8].split('=')[1],
        "nds": value[11].split('=')[1]
      });
    });
    const initialState = {
      structureArray,
      sum:sum,
      sale : item.sale,
      sale_price: sum - item.sale_price,
      comment: item.comment
    };
    this.bsModalRef = this.modalService.show(ModalDetailComponent, {initialState});
    this.bsModalRef.content.ModalBody = {initialState};
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }

  updateModal(item, type){
    const initialState = {item, type};
    this.bsModalRef = this.modalService.show(ModalUpdateComponent, {initialState});
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }


  ngDoCheck() {  
/*
      this.bill.filter(function(e) {

        return e.id !== data.id;
      });*/
  }
 

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }   
  }
}
