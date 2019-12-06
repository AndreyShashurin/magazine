import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../../shared/services/db.service';
import { TerminalComponent } from '../terminal.component';
import { menuIntarface, categoriesInterface } from '../../../shared/services/interface.service';

@Component({
  selector: 'app-terminal-id',
  templateUrl: './terminal-id.component.html',
  styleUrls: ['./terminal-id.component.scss']
})
export class TerminalIdComponent extends TerminalComponent implements OnInit {
  @Input() items: categoriesInterface[];
  menu: menuIntarface[] = [];
  categoriesItem: categoriesInterface[];
  
  constructor(
    private route: ActivatedRoute,
    public db: DbService
  ) {
    super(
      db
    )
   }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.db.getMenuByID(params.id).subscribe(val => {
          this.menu = val;
          console.log('menu ',val)
        })
      }
    })
  }

  getChildren(item: any) {
    if (item) {
      this.db.getCategoriesChilde(item).subscribe(val => {
        this.items = val;
        console.log('Categories ',this.items)
      })
    }
  } 
  
  getZakaz(data: any) {
    this.dataChangeBill(data)
  }

}
