import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
   
@Injectable()
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(component: CanComponentDeactivate) {
        console.log(component.canDeactivate())
       return confirm(`Вы не сохранили данные, при закрытии страницы они будут потеряны. Хотите покинуть страницу?`);
    }
} 