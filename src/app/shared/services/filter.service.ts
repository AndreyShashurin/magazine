import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  warehouse: boolean = false;
  addPersonal: boolean = false;
  
  constructor() { } 

}
