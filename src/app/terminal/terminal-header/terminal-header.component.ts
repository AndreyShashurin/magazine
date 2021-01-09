import { Component, OnInit, Input } from '@angular/core';
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
  @Input() openSmena: boolean;
  
  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private settingsService: SettingsService,
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

  clickbreadcump() {
    
  }
}
