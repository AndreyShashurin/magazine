import { Component, NgModule, OnInit } from '@angular/core';
import { BsModalService, } from 'ngx-bootstrap/modal';
import { SubscriptionLike, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { DbService } from '../../shared/services/db.service';
import { SettingsService } from '../../shared/services/settings.service';
import { HomeComponent } from '../home.component';
import { settingsIntarface } from '../../shared/services/interface.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  subscription: SubscriptionLike;
  settings: settingsIntarface[] = [];
  
  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    public modalService: BsModalService,
    public store: Store 
  ) {
 }

  ngOnInit() {
  }

}
@NgModule({
  imports: [CommonModule],
  exports: [PaymentComponent],
  declarations: [PaymentComponent]
})
export class PaymentComponentModule { }