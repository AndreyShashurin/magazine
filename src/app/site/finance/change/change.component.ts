import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment_ from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { accountIntarface, categoryInterface, CategoryType, filialIntarface, personsInterface } from 'src/app/shared/services/interface.service';
import { DbService } from 'src/app/shared/services/db.service';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';
import { BsModalRef } from 'ngx-bootstrap';
import { MatDialog } from '@angular/material';
import { ModalChangeComponent } from './modal-change/modal-change.component';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { AlertService } from 'src/app/shared/services/alert.service';
const moment = moment_;

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();
  limit = 15;
  smena: any[] = []
  category: any = [];
  persons: personsInterface[] = [];
  account: accountIntarface[] = [];
  filial: filialIntarface[] = [];
  form: FormGroup;
  type = CategoryType;
  bsModalRef: BsModalRef;
  constructor(
    public settingsService: SettingsService,
    private dialog: MatDialog,
    private bd: DbService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    console.log(new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(3800))
    this.bd.getFinance().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res => {
      this.category = res;
    })
    this.bd.getUsers().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(res=> { 
        this.persons = res
    })
    this.settingsService.accountResponse.subscribe(res => {
      this.account = res;
    })
    this.settingsService.filialResponse.subscribe(res => {
      this.filial = res;
    })
    this.request()
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      date: new FormControl({ value: null, disabled: true }, Validators.required),
      user: new FormControl('', Validators.required),
      category: new FormControl({ value: null, disabled: true }, Validators.required),
      filial: new FormControl({ value: null, disabled: true }, Validators.required),
      accountIn: new FormControl({ value: null, disabled: true }),
      price: new FormControl('', Validators.required),
      comment: new FormControl('')
    });
  }

  request(data?: LimitInterface): void {
    const params = {
      limit: data ? data.limit : this.limit,
      offset: data ? data.offset : 0
    }
    this.bd.getSmenaList(params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (res) => { 
        this.smena = res['data'];
        this.smena['total'] = res['total'];
      },
      (error) => {console.log(error);}
     )  
  }  

  summPay(val: string, val2: string) {
    return +val + +val2
  }

  openModal(type: number, date: string): void {
    this.form.get('type').setValue(type)
    if (date) {
      this.form.get('date').setValue(date)
    }
    let dialogRef = this.dialog.open(ModalChangeComponent, {
      data: {
        formGroup: this.form,
        type,
        account: this.account,
        persons: this.persons,
        category: this.category,
        filial: this.filial,
      }
    });
    dialogRef.afterClosed().subscribe(el => {
      if(el.type === 4) {
        const payload = [
          localStorage.getItem('SJTerminalid'), 
          this.settingsService.activefilial[0].id,
          moment(el.formGroup.value.date).format('DD.MM.YYYY'), 
          moment(el.formGroup.value.date).locale('ru').format('DD MMMM YYYY h:mm:ss'), 
          +el.formGroup.value.price,
          moment(el.formGroup.value.date).format('YYYY-MM-DD h:mm:ss'),     
          0
        ]
        this.bd.openSmena(payload).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(
          res => this.alert.success('Новая смена открыта')
        );
        const datetime = moment(el.formGroup.value.date).format('YYYY-MM-DD h:mm:ss')
        this.bd.postTransaction('transaction', el.formGroup.value, datetime).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(
          res => {
            console.log(res)
          }
        );
      }
    })
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
