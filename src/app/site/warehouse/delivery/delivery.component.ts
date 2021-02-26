import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as moment_ from 'moment';
import { takeUntil } from 'rxjs/operators';
import { DbService } from '../../../shared/services/db.service';
import { deliveryInterface } from '../../../shared/services/interface.service';
import { SettingsService } from '../../../shared/services/settings.service';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';
const moment = moment_;

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent implements OnInit, OnDestroy {
  delivery: deliveryInterface[] = [];
  limit = 15;
  ngUnsubscribe = new Subject();

  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    public store: Store 
  ) {
  }

  ngOnInit() {
    this.request();
  }

  request(data?: LimitInterface): void {
    const params = {
      limit: data ? data.limit : this.limit,
      offset: data ? data.offset : 0
    };
    this.db.getDelivery(params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (res) => { 
        this.delivery = res['data'];
        this.delivery['total'] = res['total'];
      },
      (error) => {console.log(error);}
     )  
  }


  formateDate(data: any): string {
    const formatDate = moment(data).locale('ru').format('DD.MM.YYYY');
    return formatDate !== "Invalid date" ? formatDate : data;
  }
  
  setPaginatorParams(params: LimitInterface): void {
    this.request(params);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
