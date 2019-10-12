import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DbService } from '../db.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'modal-detail',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ModalTitle}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div>
      <table class="table detail-transaction">
        <tbody>
          <tr class="bg-grey">
            <th>Товар</th>
            <th class="right-cell" style="width:80px;">Объем</th>
            <th class="right-cell" style="width:80px;">Цена</th>
            <th class="right-cell" style="width:80px;" *ngIf="nds >= 0">НДС</th>
          </tr>
          <tr *ngFor="let item of structureArray">
            <td>{{item.name}}</td>
            <td>{{item.size}}</td>
            <td>{{item.price}}</td>
            <td *ngIf="nds >= 0">{{item.nds}}</td>
          </tr>
          <tr>
            <td colspan="3"></td>
          </tr>
          <tr *ngIf="output">
            <td><b>Выход</b></td>
            <td></td>
            <td><b>{{output}}</b></td>
          </tr>                                                
          <tr>
            <td><b>Итого</b></td>
            <td></td>
            <td><b>{{sum}} <i class="fa fa-rub"></i></b></td>
          </tr> 
          <tr>
            <td colspan="3"></td>
          </tr>
          <tr *ngIf="sale">
              <td class="bold line" colspan="2">Итого со скидкой <strong>{{sale}} %</strong></td>
              <td class="right-cell bold no-wrap">{{sale_price}} <i class="fa fa-"></i></td>
              <td></td>
          </tr>
          <tr *ngIf="comment">
              <td colspan="4"><span style="width:100%">{{comment}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-sm btn-primary" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `,
  styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit {
  title: string;
  closeBtnName: string;
  constructor(
    private db: DbService,
    private http: HttpClient,
    public bsModalRef: BsModalRef
  ) {}
 
  ngOnInit() {
  }

  ngOnDestroy(): void {
    
  }
}