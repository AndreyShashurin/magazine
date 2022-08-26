import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class GuardTerminalService implements CanActivate {
    constructor(
        private _router: Router, 
        private _authService: AuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        if (this._authService.isAuthenticatedTerminal()) {
            return true
        } else {
           /* this._router.navigate(['/', 'terminal'], {
                queryParams: {
                    token : false
                }}
            )
            return false*/
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
        if (this._authService.isAuthenticatedTerminal()) {
            return true
        } else {
            this._router.navigate(['/', 'terminal'], {
                queryParams: {
                    token : false
                }}
            )
            return false
        }
    }
}