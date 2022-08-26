import { Component, OnDestroy, OnInit  } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { filialInterface } from 'src/app/shared/interface/interface.service';
import { SettingsService } from '../../shared/services/settings.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { ModalUpdateComponent } from '../shared/modal-update/modal-update.component';

@Component({
  selector: 'app-filial',
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.sass']
})
export class FilialComponent implements OnInit, OnDestroy {
  private _bsModalRef: BsModalRef;
  constructor(
    public settings: SettingsService,
    private _modalService: BsModalService
  ) {
    this.settings.getFilial()
   }
  
  ngOnInit(): void {}

  deleteModal(item: filialInterface, type: string): void {
    const initialState = {
      title: 'Удалить филиал'
    };
    this._bsModalRef = this._modalService.show(ModalContentComponent, {initialState});
    this._bsModalRef.content.ModalBody = `Вы действительно хотите удалить филиал ${item.name} ?`;
    this._bsModalRef.content.closeBtnName = 'Закрыть';
    this._bsModalRef.content.confirmBtnName = 'Удалить';
    this._bsModalRef.content.confirmDeleteParam = item;
    this._bsModalRef.content.confirmDeleteGet = type;
  }

  updateModal(item: filialInterface, type: number): void{
    const initialState = {item};
    this._bsModalRef = this._modalService.show(ModalUpdateComponent, {initialState});
    this._bsModalRef.content.type = type;
    this._bsModalRef.content.closeBtnName = 'Закрыть';
  }

  ngOnDestroy(): void {
  }
}
