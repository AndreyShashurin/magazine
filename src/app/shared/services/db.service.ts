import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map, tap } from 'rxjs/operators';

import { settingsIntarface, menuIntarface, skladIntarface, personsInterface, tovarInterface, newUser, suppliersIntarface, deliveryInterface, discardIntarface, categoriesInterface, promoInterface, responseIntarface } from '../interface/interface.service';
import { environment } from 'src/environments/environment';
import { AccessInterface } from 'src/app/site/access/interface/access.interface';


@Injectable()
export class DbService implements OnDestroy  {
  apiURL = environment.url;
  canActivateMessage = '';
  bsModalRef: BsModalRef;
  subscription: Subscription;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _modalService: BsModalService,
  ){}

  getSettings(): Observable<settingsIntarface[]> {
    return this._http.get<settingsIntarface[]>(this.apiURL + 'settings');
  }

  getSmsService(): Observable<any> {
    return this._http.get(this.apiURL + 'service');
  }

  getTovars(): Observable<tovarInterface[]> {
    return this._http.get<tovarInterface[]>(this.apiURL + 'tovars', {
      params: new HttpParams().set('count', '6')
    });
  }

  getSklad(data?) {
    if(data) {
      let params = new HttpParams()
      .set('limit', data.limit)
      .set('offset', data.offset);
      return this._http.get<skladIntarface[]>(this.apiURL + 'tovars', {params});
    } else {
      return this._http.get<skladIntarface[]>(this.apiURL + 'tovars');
    }
  }  
  
  postSklad(data, smena: string, id: string) {
    return this._http.post<skladIntarface[]>(this.apiURL + 'tovars', [data, smena, id]);
  }
  
  getTovarById(id: string) {
    return this._http.get(this.apiURL + 'tovars', {
      params: new HttpParams().set('id', id)
    });
  }

  // Акции
  getPromo(): Observable<promoInterface[]> {
    return this._http.get<promoInterface[]>(this.apiURL + 'promo');
  }

  // Наборы
  getCombo(data?): Observable<promoInterface[]> {
    let params = new HttpParams()
    .set('limit', data.limit)
    .set('combo', '1')
    .set('offset', data.offset);
    return this._http.get<promoInterface[]>(this.apiURL + 'promo', {params});
  }

  saveCombo(data) {
    return this._http.post(this.apiURL + 'combo', data);
  }

  // Склады
  getSuppliers(): Observable<suppliersIntarface[]> {
    return this._http.get<suppliersIntarface[]>(this.apiURL + 'warehouse', {
      params: new HttpParams().set('suppliers', '1')
    });
  }

  getDelivery(data?): Observable<deliveryInterface[]>  {
    if(data) {
      let params = new HttpParams()
      .set('limit', data.limit)
      .set('delivery', '1')
      .set('offset', data.offset);
      return this._http.get<deliveryInterface[]>(this.apiURL + 'warehouse', {params});
    }
  }  
  getDiscard(data): Observable<skladIntarface[]> {
    let params = new HttpParams()
    .set('limit', data.limit)
    .set('offset', data.offset)
    .set('discard', '1')
    return this._http.get<skladIntarface[]>(this.apiURL + 'warehouse', {params});
  }

  postWriteOf(id, data: any): Observable<any> {
    return this._http.post(this.apiURL + 'warehouse', {
      id,
      data
    })
  }

  // Информация о комбо наборе
  getComboID(id) {
    return this._http.get<personsInterface[]>(this.apiURL + 'combo', id)
  }  

  // Users
  saveUser(users: newUser) {
    return this._http.post(this.apiURL + 'users', users)
  }

  getUsers() {
    return this._http.get<personsInterface[]>(this.apiURL + 'users')
  }  
  
  getUser(id: string) {
    return forkJoin(
      this._http.get(this.apiURL + 'users', {
        params: new HttpParams().set('id', id)
      }).pipe(
        tap(
          response => response
        )
      ),
      this._http.get(this.apiURL + 'users', {
        params: new HttpParams().set('access', id)
      }).pipe(
        tap(
          response => response
        )
      )
   );    
  }
  
  getUserTerminal(data) {
    return this._http.get(this.apiURL + 'users', {
      params: new HttpParams().set('terminalId', data)
    })  
  }

  updateUser(user: personsInterface) {
    return this._http.put<personsInterface[]>(this.apiURL + 'users', user, {
      params: new HttpParams().set('update', 'update')
    })
  }

  // Категории
  getCategories() {
    return this._http.get<categoriesInterface[]>(this.apiURL + 'categories')
  }

  getCategoriesAndChilde() {
    return this._http.get<categoriesInterface[]>(this.apiURL + 'categories', {
      params: new HttpParams().set('categoriesAndChild', '1')
    })
  }

  getCategoriesChilde(data: any) {
    return this._http.get<categoriesInterface[]>(this.apiURL + 'categories', {
      params: new HttpParams().set('categories', data)
    })
  }

  singIn(data) {
    this.subscription = this._http.put(this.apiURL + 'users', data).pipe(
      map(response => {
        if(response){
          localStorage.setItem("sessionId", response['sessionId']);
          localStorage.setItem("id", response['id']);
          this._router.navigate(['/dashboard', 'index']);
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
    return this._http.put(this.apiURL + 'tovars', options).subscribe(
        (val) => {
          this._modalService.hide(1);
        }
    );
  }

  /** Меню  */
  getMenu(data?) {
    if(data) {
      let params = new HttpParams()
      .set('limit', data.limit)
      .set('offset', data.offset);
      return this._http.get<responseIntarface[]>(this.apiURL + 'menu', {params});
    } else {
      return this._http.get<responseIntarface[]>(this.apiURL + 'menu');
    }  
  }

  getMenuById(id: any) {
    return this._http.get<menuIntarface[]>(this.apiURL + 'menu', {
      params: new HttpParams().set('id', id)
    });
  }

  getMenuByCategoryID(id: any) {
    return this._http.get<menuIntarface[]>(this.apiURL + 'menu', {
      params: new HttpParams().set('categoryId', id)
    });
  }

  deleteMenu(data){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this._http.delete(this.apiURL + 'menu', options).subscribe(
        (val) => {
          this._modalService.hide(1);
        }
    );
  }

  saveMenu(data: menuIntarface) {
    return this._http.post<menuIntarface>(this.apiURL + 'menu', data);
  }

  updateMenu(id: number, data: menuIntarface): Observable<any> {
    return this._http.put<menuIntarface>(this.apiURL + 'menu', {
      id,
      data
    });
  }


  saveSettings(data: settingsIntarface[]){
    return this._http.post(this.apiURL + 'settings', data)
  }

  getHightcharsResponse(data){
    return this._http.get(this.apiURL + 'chart', {
      params: new HttpParams().set('period', data)
    });
  }

  /** Отчеты  */
  getReports() {
    return this._http.get(this.apiURL + 'reports')
  }

  /** Финансы/ Оплаты */
  getBill(data?) {
    let params = new HttpParams()
    .set('limit', data.limit)
    .set('offset', data.offset);
    return this._http.get(this.apiURL + 'bill', {params})
  }

  getBillKitchen() {
    let params = new HttpParams()
    .set('kitchen', '1')
    return this._http.get(this.apiURL + 'bill', {params})
  }

  setBill(data, smena) {
    return this._http.post(this.apiURL + 'bill', [data, smena]);
  }

  getFinance() {
    return this._http.get(this.apiURL + 'finance')
  }

  getTransaction(type: string, data: any) {
    let params = new HttpParams()
    .set('type', type)
    .set('limit', data.limit)
    .set('offset', data.offset);
    return this._http.get(this.apiURL + 'finance', {params})
  }

  postTransaction(type: string, data: any) {
    return this._http.post(this.apiURL + 'finance', [type, data])
  }

  postFinance(type: string, payload: any) {
    return this._http.post(this.apiURL + 'finance', [type, payload])
  }

  putFinance(type: string, payload: any) {
    return this._http.put(this.apiURL + 'finance', [type, payload])
  }

  deleteFinance(data: any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };
    this._http.delete(this.apiURL + 'finance', options).subscribe(
      (val) => {
        this._modalService.hide(1);
      }
  );
  }

  /** Обновляем счет */
  updateBill(data) {
    return this._http.put(this.apiURL + 'bill', data)
  }

  /** Получение типа оплат */
  getPayment() {
    return this._http.get(this.apiURL + 'bill', {
      params: new HttpParams().set('payment', '1')
    })
  }

  /** Удалить счет */
  deleteBill(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };
    this._http.delete(this.apiURL + 'bill', options).subscribe(
      (val) => {
    /*     
      this.billComponent.getBill().filter(function(e) {

        return e.id !== data.id;
      });*/
        this._modalService.hide(1);
      }
    );
  }

  getAccess(): Observable<AccessInterface[]> {
    return this._http.get<AccessInterface[]>(this.apiURL + 'access');
  }

  getUserAccess(data: string) {
    return this._http.get(this.apiURL + 'users', {
      params: new HttpParams().set('user', data)
    })
  }

  addFilial(data) {
    return this._http.post(this.apiURL + 'filial', data);
  }

  getFilial() {
    return forkJoin(
      this._http.get(this.apiURL + 'filial'),
      this._http.get(this.apiURL + 'account')
   );  
  }

  updateFilial(data) {
     return this._http.put(this.apiURL + 'filial', data)
  }

  deleteFilial(data){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this._http.delete(this.apiURL + 'filial', options)
  }

  /** Открыть смену */ 
  openSmena(smena) {
    return this._http.post(this.apiURL + 'smena', smena)
  }

  /** Закрыть смену */
  closeSmena(smena) {
    return this._http.put(this.apiURL + 'smena', smena)
  }  

  /** Активная смена */
  getSmenaUser(data) {
    return this._http.get(this.apiURL + 'smena', {
      params: new HttpParams().set('user', data)
    })
  }  
  
  getSmenaList(data) {
    let params = new HttpParams()
    .set('limit', data.limit)
    .set('offset', data.offset);
    return this._http.get(this.apiURL + 'smena', {params})
  }  

  getSmenaId(data: string) {
    return this._http.get(this.apiURL + 'smena', {
      params: new HttpParams().set('smena', data)
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**  Сохраняем поставку */
  saveDelivery(data) {
    return this._http.put(this.apiURL + 'warehouse', data)
  }

  /**  Счета */
  accoutnts(data) {
    return this._http.put(this.apiURL + 'warehouse', data)
  }
}
