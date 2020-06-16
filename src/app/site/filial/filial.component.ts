import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { SettingsService } from '../../shared/services/settings.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { ModalUpdateComponent } from '../shared/modal-update/modal-update.component';

@Component({
  selector: 'app-filial',
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.sass']
})
export class FilialComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)ж
  public viewPort: CdkVirtualScrollViewport;

  bsModalRef: BsModalRef;
  constructor(
    public settings: SettingsService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  deleteModal(item, type) {
    const initialState = {
     /* list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],*/
      title: 'Удалить филиал'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить филиал ${item.name} ?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = item;
    this.bsModalRef.content.confirmDeleteGet = type;
  }

  updateModal(item, type){
    const initialState = {item};
    this.bsModalRef = this.modalService.show(ModalUpdateComponent, {initialState});
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }
}
