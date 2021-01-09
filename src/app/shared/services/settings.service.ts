import { Injectable, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { DbService } from './db.service';
import { settingsIntarface, promoInterface } from './interface.service';
import { BehaviorSubject, Observable, forkJoin, Subject } from 'rxjs';
import { validateConfig } from '@angular/router/src/config';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnInit {
  public settings: settingsIntarface[] = [];
  public menu: number;
  public activeSmena;
  public activeUser;
  public activefilial;
  public filial: any = [];
  public payments: any = [];
  public promo: promoInterface[] = [];
  public md5 = new Md5(); 
  public openSmena: boolean = false;
  visibleFilter: boolean = true;
  public filialResponse = new Subject<any>();
  public categoriesResponse = new Subject<any>();
  filialSubscriber = this.filialResponse.asObservable();

  constructor(
    public db: DbService
  ) { }

  ngOnInit() {
    this.getFilial();
    this.getCategories();
  }

  getUser(): void {
    this.db.getUser(localStorage.getItem('SJTerminalid')).subscribe(
      (val) => {
        this.activeUser = val;
      },
      (error) => {
        console.log(error);
      }
    )  
  }

  getCategories(): void {
    this.db.getCategories().subscribe(val => {
      this.categoriesResponse.next(val);
    })
  }

  getSetting(): void {
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

  getFilial(): void {   
    this.db.getFilial().subscribe(
      (val) => {
        this.filial = val;        
        this.filialResponse.next(val);
        this.activefilial = this.filial.filter(val => +val.id === +localStorage.getItem('SJTerminalid'));
      }
    )
  }

  getFilialResponse(): Observable<any> {
    return this.filialResponse.asObservable();
  }

  getSmena(): void { 
    this.db.getSmena(this.activefilial).subscribe(
      (val) => {
        this.activeSmena = val;  
      },
      (error) => {
        console.log(error);
      }
    )

  }

  getPromo(): void {    
    this.db.getPromo().subscribe(
      (val) => {
        this.promo = val;  
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getPayment(): void { 
    this.db.getPayment().subscribe(
      (val) => {
        this.payments = val;  
      },
      (error) => {
        console.warn(error);
      }
    )
  }

  visibleMenu(data: number): void {
    this.menu = data;
  }    

  visibleFilterDunc(data: boolean): void {
    this.visibleFilter = data;
  }  

  setSmena(data: boolean): void {
    this.openSmena = data;
  }  

  returnPromo() {
    return this.promo
  }
}