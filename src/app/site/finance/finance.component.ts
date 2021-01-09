import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/shared/services/db.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanсeComponent implements OnInit {
  finance: any;
  form: FormGroup;
  constructor(
    private bd: DbService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bd.getFinance().subscribe(el => {
      this.finance = el;
      console.log(el)
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
}
