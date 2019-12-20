import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import { DbService } from './db.service';
import { User } from './interface.service';

@Injectable()
export class AuthService {
  public userId: number;

  constructor(
    private http: HttpClient,
    private db: DbService,
    private router: Router
  ) {}

  get token(): string {
    return localStorage.getItem('SJToken')
  }

  get tokenTerminal(): string {
    return localStorage.getItem('SJTerminalToken')
  }

  login(user: User): Observable<any> {
    return this.http.put(this.db.apiURL + 'users', user)
      .pipe(
        tap(this.setToken)
      )
  }

  pin(data): Observable<any> {
    return this.http.get(this.db.apiURL + 'users', {
      params: new HttpParams().set('terminal', data)
    })
    .pipe(
      tap(this.setTerminalToken)
    )
  }

  logout() {
    this.setToken(null)
    this.router.navigate(['/'])
  }

  logoutTerminal() {
    this.setTerminalToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  isAuthenticatedTerminal(): boolean {
    return !!this.tokenTerminal
  }

  private setToken(response) {
    if (response) {
      this.userId = +response.SJid;
      localStorage.setItem('SJToken', response.SJToken)
      localStorage.setItem('SJid', response.SJid)
    } else {
      localStorage.removeItem("SJToken");
      localStorage.removeItem("SJid");
    }
  }
  
  private setTerminalToken(response) {
    if (response) {
      this.userId = +response.SJid;
      localStorage.setItem('SJTerminalToken', response.SJTerminalToken)
      localStorage.setItem('SJTerminallogin', response.SJTerminallogin)
      localStorage.setItem('SJTerminalid', response.SJTerminalid)
    } else {
      localStorage.removeItem("SJTerminalToken");
      localStorage.removeItem("SJTerminallogin");
      localStorage.removeItem("SJTerminalid");
    }
  }  
}
