import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment_ from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { accountIntarface, categoriesInterface, categoryInterface, CategoryType, filialIntarface, personsInterface, smenaInterface } from 'src/app/shared/services/interface.service';
import { DbService } from 'src/app/shared/services/db.service';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';
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
  smena: smenaInterface[] = []
  category: any = [];
  persons: personsInterface[] = [];
  account: accountIntarface[] = [];
  filial: filialIntarface[] = [];
  form: FormGroup;
  types = CategoryType;
  bsModalRef: BsModalRef;
  constructor(
    public settingsService: SettingsService,
    private dialog: MatDialog,
    private bd: DbService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.request();
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

  formateDate(data: any): string {
    const formatDate = moment(data.datetime).locale('ru').format('DD MMMM YYYY HH:mm:ss');
    return formatDate !== "Invalid date" ? formatDate : moment(data.date).locale('ru').format('DD.MM.YYYY');
  }

  openDelivery(data: number): void {
    this.router.navigate(['dashboard/addSklad'], {
      queryParams: {
        smena : data
    }})
  }

  getDohod(data): number {
    return +data.nal + +data.beznal;
  }

  setBalance(data, i: number): number {
    let balance = 0;
    balance = data.summOpen + data.income + data.nal - data.takeMoney - data.encashment - data.suppliers;
    if(i === 2) {
      balance = data.summClose - balance;
    }
    return balance;
  }

  openModal(type: number, date: string, smenaId?: string): void {
    this.form.get('type').setValue(type);
    if (date) {
      this.form.get('date').setValue(date);
    }
    let dialogRef = this.dialog.open(ModalChangeComponent, {
      data: {
        formGroup: this.form,
        type,
        date,
        account: this.account,
        persons: this.persons,
        category: this.category,
        filial: this.filial,
        smenaId
      }
    });
    dialogRef.afterClosed().subscribe(el => {
      if(el) {
        if(el.type === 4) {
          const payload = [
            localStorage.getItem('SJid'), 
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
        } else {
          const payload = [
            localStorage.getItem('SJid'),
            el.formGroup.value,
            moment(el.formGroup.value.date).format('YYYY-MM-DD h:mm:ss'),
            el.smenaId
          ]
          this.bd.postTransaction('smena', payload).pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe(res => {
              console.log(res);
            }
          );
        }
      }
    })
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
