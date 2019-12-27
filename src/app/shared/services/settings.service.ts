import { Injectable, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { DbService } from './db.service';
import { settingsIntarface, promoInterface } from './interface.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnInit {
  public settings: settingsIntarface[] = [];
  public menu: number;
  public promo: promoInterface[] = [];
  public md5 = new Md5(); 
  visibleFilter: boolean = true;

  constructor(
    public db: DbService
  ) { }

  ngOnInit() {
    this.getSetting();
    this.getPromo();
    this.getFilial();
  }

  getSetting() {
    this.db.getSettings().subscribe(
      (val) => {
        this.settings = val;    
        this.menu = +val['type'];
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public getFilial() {    
    return this.db.getFilial().subscribe(
      (val) => {
        return val
      }
    )
  }

  getPromo() {    
    this.db.getPromo().subscribe(
      (val) => {
        this.promo = val;  
        console.log(this.promo )
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
  
  returnPromo() {
    return this.promo
  }
}