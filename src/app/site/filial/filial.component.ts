import { Component, OnDestroy, OnInit  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { filialInterface } from 'src/app/shared/services/interface.service';
import { SettingsService } from '../../shared/services/settings.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { ModalUpdateComponent } from '../shared/modal-update/modal-update.component';

@Component({
  selector: 'app-filial',
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.sass']
})
export class FilialComponent implements OnInit, OnDestroy {

  bsModalRef: BsModalRef;
  constructor(
    public settings: SettingsService,
    private modalService: BsModalService
  ) {
    this.settings.getFilial()
   }
  
  ngOnInit(): void {}

  deleteModal(item: filialInterface, type: string): void {
    const initialState = {
      title: 'Удалить филиал'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить филиал ${item.name} ?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = item;
    this.bsModalRef.content.confirmDeleteGet = type;
  }

  updateModal(item: filialInterface, type: number): void{
    const initialState = {item};
    this.bsModalRef = this.modalService.show(ModalUpdateComponent, {initialState});
    this.bsModalRef.content.type = type;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }

  ngOnDestroy(): void {
  }
}
