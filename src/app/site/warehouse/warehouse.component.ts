import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { DbService } from '../../shared/services/db.service';
import { skladIntarface } from '../../shared/services/interface.service';
import { HomeComponent } from '../home.component';
import { SettingsService } from '../../shared/services/settings.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent extends HomeComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  sklads: skladIntarface[] = [];
  notifier = new Subject();
  items = [];
  constructor(
    public db: DbService,
    private modalService: BsModalService,
    public settingsService: SettingsService,
    public store: Store,
    private router: Router
  ) {
    super(
      db,
      settingsService,
      store
    );
    db.getSklad().pipe(takeUntil(this.notifier)).subscribe(
      (response) => { 
        this.sklads = response;
      },
      (error) => {console.log(error);}
     )  
  }

  ngOnInit() {
  }

  openModal(id, tovar, link) {
    const initialState = {
     /* list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],*/
      confirmDeleteParam: id,
      confirmDeleteGet: link,
      title: 'Удалить ингредиент со склада'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить ингредиент `+tovar+'?';
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
    this.notifier.next();
    this.notifier.complete();
  }
}
