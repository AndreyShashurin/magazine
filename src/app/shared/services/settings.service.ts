import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { settingsIntarface } from './interface.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: settingsIntarface[] = [];
  public menu: number;
  visibleFilter: boolean = true;

  constructor(
    private db: DbService
  ) { }

  getSetting() {
    this.db.getSettings().subscribe(
      (val) => {
        this.settings = val;    
        this.menu = +val.type;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  visibleMenu(data: number) {
    this.menu = data;
  }    

  visibleFilterDunc(data: boolean) {
    this.visibleFilter = data;
  }  
  
}