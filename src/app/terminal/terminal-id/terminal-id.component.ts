import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface, categoriesInterface, promoInterface, responseIntarface } from '../../shared/services/interface.service';
import { CartService } from '../../shared/services/cart.service';
import { ModalTerminalComponent } from '../modal-terminal/modal-terminal/modal-terminal.component';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { TerminalService } from 'src/app/shared/services/terminal.service';

@Component({
  selector: 'terminal-id',
  templateUrl: './terminal-id.component.html',
  styleUrls: ['./terminal-id.component.scss']
})
export class TerminalIdComponent implements OnInit, OnDestroy {
  @Input() items: categoriesInterface[];
  @Input() promo: promoInterface[];
  menu: menuIntarface[] = [];
  menuAll: menuIntarface[] = [];
  categories: categoriesInterface[] = [];
  categoriesChilde: categoriesInterface[] = [];
  menuResponse = new Subject();
  bsModalRef: BsModalRef;
  notifier = new Subject();
  
  constructor(
    private route: ActivatedRoute,
    public db: DbService,
    public settingsService: SettingsService,
    public cartService: CartService,
    private router: Router,
    private modalService: BsModalService,
    private terminalService: TerminalService
  ) {
  }

  ngOnInit() {
    this.terminalService.ngOnInit()
    this.terminalService.categoriesResponse.pipe(takeUntil(this.notifier)).subscribe(val => {
      this.categories = val;
    })
    this.terminalService.menuResponseChildren.pipe(takeUntil(this.notifier)).subscribe(val => {
      this.menu = val;
    })
  }

  getChildren(item: any) {
    this.cartService.onBreadcrumbs(item) // Строим хлебные крошки
    if (item) {
      if (item.childe) {
        this.db.getCategoriesChilde(item.childe).pipe(takeUntil(this.notifier)).subscribe(val => {
          this.categoriesChilde = val;
          this.categories = [];
        })
      } else {
        this.categories = [];
      }
      this.db.getMenuByCategoryID(item.id).pipe(takeUntil(this.notifier)).subscribe(val => {
        this.promo =[];
        this.menu = val;
      })
    }
  } 

  getZakaz(data: menuIntarface) {
    if(data.weight_flag) {
      const initialState = {
        "type": 4,
        data
      };
      this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
      this.bsModalRef.content.ModalBody = '';
      this.bsModalRef.content.closeBtnName = 'Закрыть';
      this.bsModalRef.content.confirmBtnName = 'Выбрать';
     // this.bsModalRef.content.confirmDeleteGet = type;*/

    }
    this.cartService.addCartGroup(data)
  }

  async openModal(data) {
    for (let value in data.childe) {
      await this.getMenu(data.childe[value]);
    }

    this.menuResponse.subscribe(el => {
      data.childe[el['id']]['tovarArray'] = el['res'];
    })
    const initialState = {
      "type": 2,
      data
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Выбрать';
   // this.bsModalRef.content.confirmDeleteGet = type;*/
  }

  getMenu(data) {
    this.db.getMenuById(data.cat || data.id).pipe(takeUntil(this.notifier)).subscribe(val => {
      const responce = {
        id: data.id,
        res: val
      }
      this.menuResponse.next(responce)
    })
  }

  openModalRecept(data): void {
    const initialState = {
      "type": 3,
      data
    };
    this.bsModalRef = this.modalService.show(ModalTerminalComponent, {initialState});
    this.bsModalRef.content.ModalBody = '';
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
