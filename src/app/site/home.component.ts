import { Component, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { SettingsService } from '../shared/services/settings.service';
import { DbService } from '../shared/services/db.service';
import { selectSettings } from '../store/selectors/settings.selector';
import { GetSettings } from '../store/actions/settings.action';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit, OnDestroy {
  public filial: any = [];
  public payments: any = [];
  ngUnsubscribe = new Subject();
  public settings: any;
  public filialResponse = new Subject<any>();
  config$ = this._store.pipe(select(selectSettings))
  
  constructor(
    private _db: DbService,
    private _settingsService: SettingsService,
    private _store: Store
    ) {}

  ngOnInit() {
    this._store.dispatch(new GetSettings())
    this._settingsService.ngOnInit()
    this._db.getPayment().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (val) => {
        this.filialResponse.next(val);
        this.payments = val;
      },
      (error) => {
        console.log(error);
      }
    )  
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
