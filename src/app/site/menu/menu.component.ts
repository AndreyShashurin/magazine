import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment_ from 'moment';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface, processArray, responseIntarface, structureArray } from '../../shared/services/interface.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { ModalDetailComponent } from '../shared/modal-detail/modal-detail.component';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { PaginatedDataSource, PaginationService } from 'src/app/shared/services/pagination.service';
import { LimitInterface, NodeStructureInterface, QueryInterface } from 'src/app/shared/services/paginationInterface';
const moment = moment_;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  menu: responseIntarface[] = [];
  limit = 15;
  page = 0;
  form: FormGroup;
  ngUnsubscribe = new Subject();
  filteredArray = new PaginatedDataSource<NodeStructureInterface, QueryInterface>(
    (request, query, paramsArray = []) => this.pagination.paginationAndSearch({page: 0, size: 0}, {search: ''}, ''),
    {search: ''});

  constructor(
    private db: DbService,
    private modalService: BsModalService,
    public settings: SettingsService,
    private router: Router, 
    private pagination: PaginationService, 
  ) {
  }

  ngOnInit() {
    this.request()
  }

  request(data?: LimitInterface): void {
    const params = {
      limit: this.limit,
      offset: data ? data.offset : 0
    }
    this.db.getMenu(params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      res => {
        this.menu = res['data'];
        this.menu['total'] = res['total'];
      }
    );
  }

  setPaginatorParams(params: LimitInterface): void {
    this.request(params)
  }

  openModal(id: number, tovar: string, link: string): void {
    const initialState = {
      confirmDeleteParam: id,
      confirmDeleteGet: link,
      title: 'Удалить позицию из меню'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.ModalBody = `Вы действительно хотите удалить ${tovar}?`;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
    this.bsModalRef.content.confirmBtnName = 'Удалить';
    this.bsModalRef.content.confirmDeleteParam = id;
    this.bsModalRef.content.confirmDeleteGet = link;
  }

  openDetail(data: menuIntarface): void {
    let sum = 0;
    let structureArray: structureArray[] = [];
    let processArray: processArray[] = [];
    data.ingredient.forEach(value => {
      sum = sum + parseFloat(value[3].split('=')[1]);
      structureArray.push({
        "name": value[0].split('=')[1],
        "size": value[2].split('=')[1],
        "price": value[3].split('=')[1]
      });
    });
    if(data.process) {
      data.process[0].forEach((value, i) => {
        processArray.push({
          "number": i+1,
          "process": value.split('=')[1]
        });
      });
    }
    const initialState = {
      structureArray,
      processArray,
      sum,
      output:data.output
    };
    this.bsModalRef = this.modalService.show(ModalDetailComponent, {initialState});
    this.bsModalRef.content.ModalBody = {initialState};
    this.bsModalRef.content.ModalTitle = data.name;
    this.bsModalRef.content.closeBtnName = 'Закрыть';
  }

  update(data: menuIntarface): void {
    this.router.navigate(['/dashboard/addrecept'], {
      queryParams: {
        id : data.id
      }}
    )
  }

  ngOnDestroy(): void  {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
