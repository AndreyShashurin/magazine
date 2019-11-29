import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

import { DbService } from 'src/app/shared/services/db.service';
import { skladIntarface } from 'src/app/shared/services/interface.service';
import { ModalContentComponent } from 'src/app/shared/component/modal-content/modal-content.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)

  public viewPort: CdkVirtualScrollViewport;   
  bsModalRef: BsModalRef;
  sklads: skladIntarface[] = [];
  items = [];
  constructor(
    private db: DbService,
    private modalService: BsModalService
  ) {
    db.getSklad().subscribe(
      (response) => { 
        this.sklads = response;
        console.log(this.sklads);
      } ,
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
