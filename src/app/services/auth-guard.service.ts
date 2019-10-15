import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DbService } from '../db.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router, 
        private authService: AuthService,
        private dbService: DbService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      if (this.authService.isAuthenticated()) {
          return true
      } else {
          this.authService.logout()
          this.router.navigate(['/'], {
              queryParams: {
                  token : false
              }}
          )
          return false
      }      
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       // return this.canActivate(route, state);
    } 
}