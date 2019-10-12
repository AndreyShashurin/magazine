import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import { DbService } from '../db.service';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()
  public userId: number;

  constructor(
    private http: HttpClient,
    private db: DbService,
    private router: Router
  ) {}

  get token(): string {
    return localStorage.getItem('SJToken')
  }

  login(user): Observable<any> {
    console.log(user);
    return this.http.put(this.db.apiURL + 'users', user)
      .pipe(
        tap(this.setToken)
      )
  }

  logout() {
    this.setToken(null)
    this.router.navigate(['/sing-in']);
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response) {
    if (response) {
      this.userId = +response.SJid;
      localStorage.setItem('SJToken', response.SJToken)
      localStorage.setItem('SJid', response.SJid)
    } else {
      localStorage.clear()
      return
    }
  }
}
