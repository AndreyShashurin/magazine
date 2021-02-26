import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DbService } from '../../shared/services/db.service';
import { skladIntarface } from '../../shared/services/interface.service';
import { SettingsService } from '../../shared/services/settings.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  sklads: skladIntarface[] = [];
  limit = 15;
  ngUnsubscribe = new Subject();
  items = [];
  constructor(
    public db: DbService,
    private modalService: BsModalService,
    public settingsService: SettingsService,
    public store: Store,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.request()
  }

  request(data?: LimitInterface): void {
    const params = {
      limit: data ? data.limit : this.limit,
      offset: data ? data.offset : 0
    }
    this.db.getSklad(params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (res) => { 
        this.sklads = res['data'];
        this.sklads['total'] = res['total'];
      },
      (error) => {console.log(error);}
     )  
  }

  setPaginatorParams(params: LimitInterface): void {
    this.request(params)
  }

  openModal(id: number, tovar: string, link: string): void {
    const initialState = {
      confirmDeleteParam: id,
      confirmDeleteGet: link,
      title: 'Удалить ингредиент со склада'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить ${tovar}?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = id;
    this.bsModalRef.content.confirmDeleteGet = link;
  } 

  ngWriteOff(data) {
    this.router.navigate(['/dashboard/write'], {
      queryParams: {
        id : data.id
    }})
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
