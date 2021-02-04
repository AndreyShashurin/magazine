import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { ModalTerminalComponent } from '../modal-terminal/modal-terminal/modal-terminal.component';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'terminal-header',
  templateUrl: './terminal-header.component.html',
  styleUrls: ['./terminal-header.component.scss']
})
export class TerminalHeaderComponent implements OnInit {

  bsModalRef: BsModalRef;
  smenaActive: string;
  @Input() openSmena: boolean;
  @Input() smena: boolean;
  
  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
  }

  ngOnChanges(e: SimpleChange) {
    if(e['smena'] && e['smena'].currentValue) {
      this.smenaActive = e['smena'].currentValue.id
    }
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

  closeSmenaFunc() {
    const initialState = {
      "type": 5,
      'smena': this.smenaActive
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Закрыть смену';
   // this.bsModalRef.content.confirmDeleteGet = type;

  }

  clickbreadcump() {
    
  }
}
