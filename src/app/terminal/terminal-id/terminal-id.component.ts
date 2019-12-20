import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface, categoriesInterface, promoInterface } from '../../shared/services/interface.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'terminal-id',
  templateUrl: './terminal-id.component.html',
  styleUrls: ['./terminal-id.component.scss']
})
export class TerminalIdComponent implements OnInit {
  @Input() items: categoriesInterface[];
  @Input() promo: promoInterface[];
  menu: menuIntarface[] = [];
  categories: categoriesInterface[] = [];
  
  constructor(
    private route: ActivatedRoute,
    public db: DbService,
    private cartService: CartService
  ) {
   }

  ngOnInit() {
    this.db.getCategories().subscribe(val => {
      this.categories = val;
      console.log(val)
    })
  }

  getChildren(item: any) {
    this.cartService.onBreadcrumbs(item) // Строим хлебные крошки

    if (item) {
      if (item.childe) {
        this.db.getCategoriesChilde(item.childe).subscribe(val => {
          this.categories = val;
        })
      } else {
        this.categories = [];
      }
      this.db.getMenuByID(item.id).subscribe(val => {
        this.menu = val;
      })
    }
  } 

  getZakaz(data: menuIntarface[]) {
    this.cartService.onSelected(data)
    this.cartService.count++
  }

}
