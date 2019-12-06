import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { categoriesInterface, menuIntarface, categoryInterface } from '../../shared/services/interface.service';
import { TerminalBillComponent } from './terminal-bill/terminal-bill.component';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  categories: categoriesInterface[] = [];
  bill: categoriesInterface[] = [];

  constructor(
    public db: DbService    
  ) { }

  ngOnInit() {
    this.db.getCategories().subscribe(val => {
      this.categories = val;
    })
  }

  getChildren(item: any) {
    console.log('3')
  } 

  dataChangeBill(data) {
    this.bill.push(data);
    console.log(this.bill);
  }


}

