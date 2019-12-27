import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class GuardTerminal implements CanActivate {
    component: Object;
    route: ActivatedRouteSnapshot;
    constructor(
        private router: Router, 
        private authService: AuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        if (this.authService.isAuthenticatedTerminal()) {
            return true
        } else {
           /* this.router.navigate(['/', 'terminal'], {
                queryParams: {
                    token : false
                }}
            )
            return false*/
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        if (this.authService.isAuthenticatedTerminal()) {
            return true
        } else {
            this.router.navigate(['/', 'terminal'], {
                queryParams: {
                    token : false
                }}
            )
            return false
        }
    }
}