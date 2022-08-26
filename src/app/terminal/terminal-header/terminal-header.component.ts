import { Component, OnInit, Input, SimpleChange, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment_ from 'moment';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { ModalTerminalComponent } from '../modal-terminal/modal-terminal/modal-terminal.component';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { TerminalService } from 'src/app/shared/services/terminal.service';
import { ModalTransactionComponent } from '../modal-transaction/modal-transaction.component';
import { DbService } from 'src/app/shared/services/db.service';
import { personsInterface, saveParamsSmena } from 'src/app/shared/interface/interface.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TypeOperationEnum } from 'src/app/shared/enums/type-operation.enum';
const moment = moment_;

@Component({
  selector: 'terminal-header',
  templateUrl: './terminal-header.component.html',
  styleUrls: ['./terminal-header.component.scss']
})
export class TerminalHeaderComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  smenaActive: string;
  form: FormGroup;
  persons: personsInterface[] = [];
  ngUnsubscribe = new Subject();
  TypeOperationEnum = TypeOperationEnum;
  @Input() openSmena: boolean;
  @Input() smena: boolean;
  
  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private settingsService: SettingsService,
    private modalService: BsModalService,
    private dialog: MatDialog,
    private bd: DbService,
    private terminalService: TerminalService,
    private alert: AlertService
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl('' ),
      price: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      comment: new FormControl('')
    });

    this.bd.getUsers().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res=> { 
      this.persons = res
    })
  }

  ngOnChanges(e: SimpleChange) {
    if(e['smena'] && e['smena'].currentValue) {
      this.smenaActive = e['smena'].currentValue.id
    }
  }

  logout() {
    this.authService.logoutTerminal();
  }

  openTransactions(type: string): void {
    this.form.get('type').setValue(type);
    let dialogRef = this.dialog.open(ModalTransactionComponent, {
      data: {
        smena: this.smenaActive,
        formGroup: this.form,
        persons: this.persons,
        type
      }
    });
    dialogRef.afterClosed().subscribe(el => {
      if(el) {
        const payload: saveParamsSmena[] = [
          localStorage.getItem('SJTerminalid'),
          el.formGroup.value,
          moment(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss'),
          el.smena
        ];
        this.bd.postTransaction('smena', payload).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(
          (responce) => {this.alert.success('Транзакция сохранена')},
          (error) => {}
        );
      }
    })
  }

  openModal() {
    const initialState = {
      "type": TypeOperationEnum.StartSift
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Открыть смену';
   // this.bsModalRef.content.confirmDeleteGet = type;
  }

  closeSmenaFunc() {
    const initialState = {
      "type": TypeOperationEnum.CloseShift,
      'smena': this.smenaActive
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Закрыть смену';
   // this.bsModalRef.content.confirmDeleteGet = type;

  }

  clickBreadcump() {
    this.cartService.breadcrumbs = [];
    this.terminalService.getCategories()
    this.terminalService.menuResponseChildren.next()
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
