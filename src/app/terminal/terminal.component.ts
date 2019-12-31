import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  openSmena: boolean = false;
  activeItem: string | number;
  error: string;
  message: string;
  settingsOf: Subscription;
  promo: promoInterface[] = [];

  constructor(
    public db: DbService,    
    public settingsService: SettingsService
  ) {
  }
  
  ngOnInit() {
    this.settingsService.ngOnInit();
    
    this.db.getPromo().subscribe(
      (val) => {
        this.promo = val;  
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public getSmena() {
    this.openSmena = true;
  }

  public onSelectItem(item: any): void {
    if (!this.activeItem) {
      this.activeItem = item;
    } else {
      this.activeItem = '';
    }
    return item
  }  
}