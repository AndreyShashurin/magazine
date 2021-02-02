import { Injectable, OnInit, OnDestroy} from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DbService } from './db.service';
import { settingsIntarface, promoInterface } from './interface.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnInit, OnDestroy {
  public settings: settingsIntarface[] = [];
  public menu: number;
  public activeUser;
  public activefilial;
  public filial: any = [];
  public payments: any = [];
  public promo: promoInterface[] = [];
  public md5 = new Md5(); 
  public openSmena: boolean = false;
  visibleFilter: boolean = true;
  public activeSmena = new Subject<any>();
  public isOpenSmena = new Subject<boolean>();
  public filialResponse = new Subject<any>();
  public terminalUser = new Subject<any>();
  public terminalUserName = new Subject<string>();
  public accountResponse = new Subject<any>();
  public categoriesResponse = new Subject<any>();
  filialSubscriber = this.filialResponse.asObservable();
  notifier = new Subject();

  constructor(
    public db: DbService
  ) { }

  ngOnInit() {
    this.getFilial();
    this.getCategories();
    this.getSmena();
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
        this.filial = val[0];        
        this.filialResponse.next(val[0]);
        this.accountResponse.next(val[1]);
        this.activefilial = this.filial.filter(val => +val.id === +localStorage.getItem('SJTerminalid'));
      }
    )
  }

  getFilialResponse(): Observable<any> {
    return this.filialResponse.asObservable();
  }

  getSmena(): void { 
    this.db.getSmena(+localStorage.getItem('SJTerminalid')).subscribe(
      (val) => {
        this.activeSmena.next(val);
        this.isOpenSmena.next(!val);
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

  getUserTerminal(): void { 
    this.db.getUserTerminal(localStorage.getItem("SJTerminalid")).pipe(takeUntil(this.notifier)).subscribe(
      (val) => {
        this.terminalUser.next(val);
        this.terminalUserName.next(val['name']);
      },
      (error) => {
        console.log(error);
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

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}