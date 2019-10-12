import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/db.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from 'src/app/modal-content/modal-content.component';
import { ModalDetailComponent } from 'src/app/modal-detail/modal-detail.component';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  bill: any;
  bsModalRef: BsModalRef;
  subscription: SubscriptionLike;
  constructor(
    private db: DbService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.subscription = this.db.getBill().subscribe(
      (response: Response) => { 
          this.bill = response;
          console.log(this.bill)
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
    console.log(item.tovar[0]);
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
    console.log(structureArray)
    this.bsModalRef = this.modalService.show(ModalDetailComponent, {initialState});
    this.bsModalRef.content.ModalBody = {initialState};
    this.bsModalRef.content.ModalTitle = item.tovar;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
      
  }
}
