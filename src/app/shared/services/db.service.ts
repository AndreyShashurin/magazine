import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, tap } from 'rxjs/operators';

import { settingsIntarface, menuIntarface, skladIntarface, personsInterface, tovarInterface, newUser, suppliersIntarface, deliveryInterface, discardIntarface, categoriesInterface, promoInterface } from './interface.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class DbService implements OnDestroy  {
  apiURL = environment.url;
  canActivateMessage = '';
  bsModalRef: BsModalRef;
  subscription:  Subscription;
  hightcharsResponse: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService,
){}

  getSettings(): Observable<settingsIntarface[]> {
    return this.http.get<settingsIntarface[]>(this.apiURL + 'settings');
  }

  getSmsService(): Observable<any> {
    return this.http.get(this.apiURL + 'service');
  }

  getTovars(): Observable<tovarInterface[]> {
    return this.http.get<tovarInterface[]>(this.apiURL + 'tovars', {
      params: new HttpParams().set('limit', '6')
    });
  }

  getSklad() {
    return this.http.get<skladIntarface[]>(this.apiURL + 'tovars');
  }

  // Акции
  getPromo(): Observable<promoInterface[]> {
    return this.http.get<promoInterface[]>(this.apiURL + 'promo');
  }

  // Склады
  getSuppliers(): Observable<suppliersIntarface[]> {
    return this.http.get<suppliersIntarface[]>(this.apiURL + 'warehouse', {
      params: new HttpParams().set('suppliers', '1')
    });
  }

  getDelivery(): Observable<deliveryInterface[]> {
    return this.http.get<deliveryInterface[]>(this.apiURL + 'warehouse', {
      params: new HttpParams().set('delivery', '1')
    });
  }

  getDiscard(): Observable<discardIntarface[]> {
    return this.http.get<discardIntarface[]>(this.apiURL + 'warehouse', {
      params: new HttpParams().set('discard', '1')
    });
  }

  postWriteOf(data: any): Observable<any> {
    return this.http.post(this.apiURL + 'warehouse', data, {
      params: new HttpParams().set('writeOf', '1')
    });
  }

  // Информация о комбо наборе
  getComboID(id) {
    return this.http.get<personsInterface[]>(this.apiURL + 'combo', id)
  }  

  // Users
  saveUser(users: newUser) {
    return this.http.post(this.apiURL + 'users', users)
  }

  getUsers() {
    return this.http.get<personsInterface[]>(this.apiURL + 'users')
  }  
  
  getUser(data) {
    return forkJoin(
      this.http.get(this.apiURL + 'users', {
        params: new HttpParams().set('id', data)
      }).pipe(
          tap(
            response => response
          )
      ),
      this.http.get(this.apiURL + 'users', {
        params: new HttpParams().set('user', data)
      }).pipe(
          tap(
            response => response
            )
      )  
   );    
  }

  updateUser(user: personsInterface) {

    return this.http.put<personsInterface[]>(this.apiURL + 'users', user, {
      params: new HttpParams().set('update', 'update')
    })
  }

  // Категории
  getCategories() {
    return this.http.get<categoriesInterface[]>(this.apiURL + 'categories')
  }

  getCategoriesChilde(data: any) {
    return this.http.get<categoriesInterface[]>(this.apiURL + 'categories', {
      params: new HttpParams().set('categories', data)
    })
  }

  singIn(data) {
    this.subscription = this.http.put(this.apiURL + 'users', data).pipe(
      map(response => {
        if(response){
          localStorage.setItem("sessionId", response['sessionId']);
          localStorage.setItem("id", response['id']);
          this.router.navigate(['/dashboard', 'index']);
        }else{
          console.log('Вход запрещен');
          this.canActivateMessage = 'Логин или пароль не верные';
        }
      })
    ).subscribe(
      response =>{
        console.log("SELECT call in error", response);
      },
      error => {
        console.log("The SELECT observable is now completed.");
      },
      () => {
          console.log("The POST observable is now completed.");
      }
    );

    return this.subscription
  }

  getDeleteTovar(data){
    const options = {
          id: data
      };

    return this.http.put(this.apiURL + 'tovars', options).subscribe(
        (val) => {
          this.modalService.hide(1);
        }
    );
  }

  // Меню  
  getMenu() {
    return this.http.get<menuIntarface[]>(this.apiURL + 'menu');
  }

  getMenuByID(id: any) {
    return this.http.get<menuIntarface[]>(this.apiURL + 'menu', {
      params: new HttpParams().set('id', id)
    });
  }

  deleteMenu(data){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete(this.apiURL + 'menu', options).subscribe(
        (val) => {
          this.modalService.hide(1);
        }
    );
  }


  saveSettings(data: settingsIntarface[]){
    return this.http.post(this.apiURL + 'settings', data)
  }

  getHightcharsResponse(data){

    return this.http.get(this.apiURL + 'chart', {
      params: new HttpParams().set('period', data)
    });
  }

  // Отчеты
  getReports() {

    return this.http.get(this.apiURL + 'reports')

  }

  // Финансы
  getBill() {

    return this.http.get(this.apiURL + 'bill')

  }

  // Счета
  deleteBill(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };
    this.http.delete(this.apiURL + 'bill', options).subscribe(
      (val) => {
    /*     
      this.billComponent.getBill().filter(function(e) {

        return e.id !== data.id;
      });*/
        this.modalService.hide(1);
      }
    );
  }

  getAccess() {
    return this.http.get(this.apiURL + 'access');
  }

  getUserAccess(data: string) {
    return this.http.get(this.apiURL + 'users', {
      params: new HttpParams().set('user', data)
    })
  }

  getFilial() {
    return this.http.get(this.apiURL + 'filial');
  }

  // Смена

  // Открыть смену
  setOpenSmena(smena) {
    return this.http.post(this.apiURL + 'smena', smena)
  }  

  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}
