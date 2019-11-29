import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { settingsIntarface } from './interface.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: settingsIntarface[] = [];
  visible: number;
  visibleFilter: boolean= true;

  constructor(
    private db: DbService
  ) { }

  getSetting() {
    this.db.getSettings().subscribe(
      (val) => {
        this.settings = val;      
        this.visible = +val.type;
      },
      (error) => {
        console.log(error);
      }
    )
    return this.settings
  }

  visibleMenu(data: number) {
    this.visible = data;
  }    

  visibleFilterDunc(data: boolean) {
    this.visibleFilter = data;
  }  
}