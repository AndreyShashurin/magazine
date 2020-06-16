import { Component, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, Input } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SettingsService } from '../shared/services/settings.service';
import { DbService } from '../shared/services/db.service';
import { LoadPersons } from '../store/actions/persons.actions';

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
  
  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    public store: Store
    ) {
       this.store.subscribe(state => console.log(state));
       this.db.getUsers().subscribe(
        (val) => {
          console.log(val);
          this.store.dispatch(new LoadPersons({persons: 
            {id: 2, access: 1, email: 'Learn NgRx', filial: 2, filial_name: 'ddd', login: 'cdccccccc', name: 'dc'}
          }))
        },
        (error) => {
          console.log(error);
        });
  }

  ngOnInit() {
    this.db.getPayment().subscribe(
      (val) => {
        this.payments = val;
        console.log(val);
      },
      (error) => {
        console.log(error);
      }
    )  
  }
}
