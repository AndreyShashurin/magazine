import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alert$ = new Subject<any>()

  success(text: string) {
    this.alert$.next({type: 'success', text})
  }

  error(text: string) {
    this.alert$.next({type: 'error', text})
  }
}
