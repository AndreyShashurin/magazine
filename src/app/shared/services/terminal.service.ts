import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DbService } from './db.service';
import { categoriesInterface } from './interface.service';

@Injectable({
  providedIn: 'root'
})
export class TerminalService implements OnInit, OnDestroy {

  public menuResponse = new Subject<any>();
  public categoriesResponse = new Subject<categoriesInterface[]>();
  public menuResponseChildren = new Subject<[]>();
  notifier = new Subject();
  constructor(
    public db: DbService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getMenu() {
    this.db.getMenu().pipe(takeUntil(this.notifier)).subscribe(val => {
      this.menuResponse.next(val);
    })
  }

  getCategories() {
    this.db.getCategories().pipe(takeUntil(this.notifier)).subscribe(val => {
      this.categoriesResponse.next(val);
    })
  }

  /*getCategories() {  
    this.db.getMenuByCategoryID(item.id).pipe(takeUntil(this.notifier)).subscribe(val => {
      this.promo =[];
      this.menu = val;
    })
  }*/

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
