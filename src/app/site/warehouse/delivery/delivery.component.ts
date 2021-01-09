import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { DbService } from '../../../shared/services/db.service';
import { deliveryInterface } from '../../../shared/services/interface.service';
import { HomeComponent } from '../../home.component';
import { SettingsService } from '../../../shared/services/settings.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.sass']
})
export class DeliveryComponent extends HomeComponent implements OnInit {
  delivery: deliveryInterface[] = [];

  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    public store: Store 
  ) {
    super(
      db,
      settingsService,
      store
    );
    db.getDelivery().subscribe(
      (response) => { 
        this.delivery = response;
      },
      (error) => {console.log(error);}
     )  
  }

  ngOnInit() {
    
  }

}
