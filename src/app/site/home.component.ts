import { Component, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { SettingsService } from '../shared/services/settings.service';
import { DbService } from '../shared/services/db.service';
import { selectSettings } from '../store/selectors/settings.selector';
import { GetSettings } from '../store/actions/settings.action';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  public filial: any = [];
  public payments: any = [];
  @ViewChild(CdkVirtualScrollViewport)

  public viewPort: CdkVirtualScrollViewport;
  public settings: any;
  public filialResponse = new Subject<any>();
  config$ = this._store.pipe(select(selectSettings))
  
  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    public _store: Store
    ) {}

  ngOnInit() {
    this._store.dispatch(new GetSettings())
    this.settingsService.ngOnInit()
    this.db.getPayment().subscribe(
      (val) => {
        this.filialResponse.next(val);
        this.payments = val;
      },
      (error) => {
        console.log(error);
      }
    )  
  }
}
