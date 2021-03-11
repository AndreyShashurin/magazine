import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as moment_ from 'moment';

import { SettingsService } from '../../../shared/services/settings.service';
import { DbService } from '../../../shared/services/db.service';
import { ModalContentComponent } from '../../shared/modal-content/modal-content.component';
import { ModalDetailComponent } from '../../shared/modal-detail/modal-detail.component';
import { ModalUpdateComponent } from '../../shared/modal-update/modal-update.component';
import { HomeComponent } from '../../home.component';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';
const moment = moment_;

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent extends HomeComponent implements OnInit {
  bill: any;
  bsModalRef: BsModalRef;
  limit = 15;
  ngUnsubscribe = new Subject();
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
    this.request()
  }

  request(data?: LimitInterface): void {
    const params = {
      limit: data ? data.limit : this.limit,
      offset: data ? data.offset : 0
    }
    this.db.getBill(params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (res) => { 
        this.bill = res['data'];
        this.bill['total'] = res['total'];
      },
      (error) => {console.log(error);}
     )  
  }

  setPaginatorParams(params: LimitInterface): void {
    this.request(params)
  }

  openModal(item, type) {
    const initialState = {
      title: 'Удалить счет'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить счет № ${item.id} ?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = item;
    this.bsModalRef.content.confirmDeleteGet = type;
  }

  formateDate(data: string): string {
    return moment(data).locale('ru').format('DD MMMM YYYY HH:mm:ss');
  }

  openDetail(item){
    let structureArray = [];
    item.tovar[0].forEach(function(value, key) {
      structureArray.push({
        "name": value.name,
        "count": value.count,
        //"size": value.name,
        "price": item.price,
      });
    });
    const initialState = {
      structureArray,
      sum:item.price,
      sale : item.sale,
      sale_price: +item.salePrice,
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
