import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs/operators';
import { settingsIntarface, menuIntarface, skladIntarface } from './services/interface.service';


@Injectable()
export class DbService implements OnDestroy  {
  apiURL = "http://shashurin.beget.tech/dashboard/api/";
  canActivateMessage = '';
  bsModalRef: BsModalRef;
  singInValue:  Subscription;
  hightcharsResponse: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService
){}

  getSettings() {
    return this.http.get<settingsIntarface[]>(this.apiURL + 'settings');
  }

  getSmsService() {
    return this.http.get(this.apiURL + 'service');
  }

  saveUsers(users: any[]) {
    this.http.post(this.apiURL, users)
      .subscribe(
        (val) => {
            console.log("POST call successful value returned in body",
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }

  getUsers() {
    const headers = new HttpHeaders();
    headers.append("Cache-Control", "no-cache");
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST');
    headers.append('Access-Control-Max-Age', '1728000');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.apiURL)
  }

  getTovars() {

    return this.http.get(this.apiURL + 'tovars', {
      params: new HttpParams().set('limit', '6')
    });
  }

  getSklad() {

    return this.http.get<skladIntarface[]>(this.apiURL + 'tovars');
  }


  updateUser(user)
  {

    return this.http.put(this.apiURL, user).subscribe(
        (val) => {
            console.log("UPDATE call successful value returned in body",
                        val);
        },
        response => {
            console.log("UPDATE call in error", response);
        },
        () => {
            console.log("The UPDATE observable is now completed.");
        });
  }

  singIn(data)
  {
    this.singInValue = this.http.put(this.apiURL + 'users', data).pipe(
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

    return this.singInValue
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

  getMenu(){
    return this.http.get<menuIntarface[]>(this.apiURL + 'menus');
  }

  deleteMenu(data){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete(this.apiURL + 'menus', options).subscribe(
        (val) => {
          this.modalService.hide(1);
        }
    );
  }

  saveSettings(data){
    this.http.post(this.apiURL + 'settings', data)
      .subscribe(
        (val) => {
            console.log("POST call successful value returned in body",
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
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

  getDeleteBill(data) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };
    this.http.delete(this.apiURL + 'bill', options).subscribe(
        (val) => {
          this.modalService.hide(1);
        }
    );
  }

  ngOnDestroy() {
    if (this.singInValue) {
        this.singInValue.unsubscribe();
    }
  }

}
