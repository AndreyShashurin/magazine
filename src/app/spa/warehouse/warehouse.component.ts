import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/db.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from 'src/app/modal-content/modal-content.component';
import { skladIntarface } from 'src/app/services/interface.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
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
}
