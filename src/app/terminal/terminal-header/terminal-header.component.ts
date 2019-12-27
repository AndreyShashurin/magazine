import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { ModalTerminalComponent } from '../component/modal-terminal/modal-terminal.component';

@Component({
  selector: 'terminal-header',
  templateUrl: './terminal-header.component.html',
  styleUrls: ['./terminal-header.component.scss']
})
export class TerminalHeaderComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logoutTerminal();
  }

  openModal(data) {
    const initialState = {
      "type": 1
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Открыть смену';
   // this.bsModalRef.content.confirmDeleteGet = type;
  }
}
