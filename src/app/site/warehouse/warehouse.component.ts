import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Store } from '@ngrx/store';

import { DbService } from '../../shared/services/db.service';
import { skladIntarface } from '../../shared/services/interface.service';
import { FilterService } from '../../shared/services/filter.service';
import { HomeComponent } from '../home.component';
import { SettingsService } from '../../shared/services/settings.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent extends HomeComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)

  public viewPort: CdkVirtualScrollViewport;   
  bsModalRef: BsModalRef;
  sklads: skladIntarface[] = [];
  items = [];
  constructor(
    public db: DbService,
    private modalService: BsModalService,
    public settingsService: SettingsService,
    private filterService: FilterService,
    public store: Store 
  ) {
    super(
      db,
      settingsService,
      store
    );
    db.getSklad().subscribe(
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


  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort["_renderedContentOffset"]) {
      return "-0px";
    }
    let offset = this.viewPort["_renderedContentOffset"];
    return `-${offset}px`;
  }      
}
