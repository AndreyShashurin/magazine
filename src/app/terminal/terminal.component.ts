import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/services/settings.service';
import { DbService } from '../shared/services/db.service';
import { promoInterface } from '../shared/services/interface.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  currentNumber: string = '';
  submitted: boolean = false;
  error: string;
  message: string;
  settingsOf: Subscription;
  promo: promoInterface[] = [];

  constructor(
    public db: DbService,
    private settingsService: SettingsService
  ) {
   }

  ngOnInit() {
    this.db.getPromo().subscribe(
      (val) => {
        this.promo = val;  
      },
      (error) => {
        console.log(error);
      }
    )
  }
}