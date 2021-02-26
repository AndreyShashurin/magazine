import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import * as moment_ from 'moment';
import { takeUntil } from 'rxjs/operators';
import { DbService } from 'src/app/shared/services/db.service';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { ModalComponent } from '../categories/modal/modal.component';
const moment = moment_;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {
  limit = 30;
  page = 0;
  data = [];
  pageSizeOptions = [30, 50, 90, 100];
  category: any = [];
  filial = [];
  account = [];
  form: FormGroup;
  ngUnsubscribe = new Subject();
  constructor(
    public settings: SettingsService,
    private db: DbService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { 
    this.db.getFinance().subscribe(res => {
      this.category = res;
    })
    this.settings.filialResponse.subscribe(res => {
      this.filial = res;
    })
    this.settings.accountResponse.subscribe(res => {
      this.account = res;
    })
    this.form = new FormGroup({
      type: new FormControl(1, Validators.required),
      date: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      filial: new FormControl('', Validators.required),
      accountOut: new FormControl(''),
      accountIn: new FormControl({ value: null, disabled: true }),
      price: new FormControl('', Validators.required),
      comment: new FormControl('')
    });
  }
  
  ngOnInit() {
    this.request();
  }

  request(data?: LimitInterface) {
    const params = {
      limit: this.limit,
      offset: data ? data.offset : 0
    }
    this.db.getTransaction('transaction', params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      res => {
        this.data = res['data'];
        const result = Object.values(this.data).sort((a,b) => {
          if(a.datetime && a.datetime) {
            return moment(b.datetime).diff(moment(a.datetime));
          }
        });
        this.data = result;
        this.data['total'] = res['total'];
      }
    );
  }

  setPaginatorParams(params: LimitInterface): void {
    this.request(params);
  }

  formateDate(data: string): string {
    const formatDate = moment(data).locale('ru').format('DD.MM.YYYY');
    return formatDate !== "Invalid date" ? formatDate : data;
  }

  openModal(type?: string) {
    let dialogRef = this.dialog.open(ModalComponent, {
      data: {
        formGroup: this.form,
        category: this.category,
        filial: this.filial,
        account: this.account,
        type: 2
      }
    });
    dialogRef.afterClosed().subscribe(el => {
      if(el.type === 2) {
        const datetime = moment(el.formGroup.value.date).format('YYYY-MM-DD h:mm:ss');
        /*this.db.postTransaction('transaction', el.formGroup.value, datetime, '').pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe(
          res => {
            console.log(res)
          }
        );*/
      }
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
