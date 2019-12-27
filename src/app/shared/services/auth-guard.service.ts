import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    component: Object;
    route: ActivatedRouteSnapshot;
    constructor(
        private router: Router, 
        private authService: AuthService,
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
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
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
}