import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit {
  title: string;
  closeBtnName: string;

  constructor(
    public bsModalRef: BsModalRef
  ) {}
 
  ngOnInit() {
  }

  ngOnDestroy(): void {
    
  }
}