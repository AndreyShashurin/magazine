import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanсeComponent implements OnInit, OnDestroy {
  finance: any;
  form: FormGroup;
  ngUnsubscribe = new Subject();
  constructor(
    private bd: DbService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bd.getFinance().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(el => {
      this.finance = el;
    })
    this.form = new FormGroup({
      cost: new FormControl(0),
      dohod: new FormControl(0),
      total: new FormControl(0)
    });
  }

  setFinance(data: number): number {
    let array = [];
    this.finance.forEach(element => {
      if (element.operation === data &&element.sum) {
        array.push(element.sum)
      }
    });
    let result = array.reduce((sum, current) => {
      return +sum + +current;
    }, 0);
    return +result
  }
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
