import { Component, OnInit } from '@angular/core';
import { BsModalService, } from 'ngx-bootstrap/modal';
import { SubscriptionLike, Subject } from 'rxjs';
import { DbService } from '../../shared/services/db.service';
import { SettingsService } from '../../shared/services/settings.service';
import { HomeComponent } from '../home.component';
import { settingsIntarface } from 'src/app/shared/services/interface.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends HomeComponent implements OnInit {

  subscription: SubscriptionLike;
  private ngUnsubscribe = new Subject();
  public settings: settingsIntarface[] = [];
  
  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    public modalService: BsModalService,
  ) {
    super(
      db,
      settingsService
    );
 }

  ngOnInit() {
  }

}
