import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DbService } from '../../shared/services/db.service';
import { menuIntarface, processArray, responseIntarface, structureArray } from '../../shared/interface/interface.service';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { ModalDetailComponent } from '../shared/modal-detail/modal-detail.component';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { PaginatedDataSource, PaginationService } from 'src/app/shared/services/pagination.service';
import { LimitInterface, NodeStructureInterface, QueryInterface } from 'src/app/shared/services/paginationInterface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private _bsModalRef: BsModalRef;
  private _ngUnsubscribe = new Subject();
  private _filteredArray = new PaginatedDataSource<NodeStructureInterface, QueryInterface>(
    (request, query, paramsArray = []) => this._pagination.paginationAndSearch({page: 0, size: 0}, {search: ''}, ''),
    {search: ''});
  private _page = 0;
  public menu: responseIntarface[] = [];
  public limit = 15;

  constructor(
    private _db: DbService,
    private _modalService: BsModalService,
    private _router: Router, 
    private _pagination: PaginationService, 
    public settings: SettingsService,
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
    this._db.getMenu(params).pipe(
      takeUntil(this._ngUnsubscribe)
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
    this._bsModalRef = this._modalService.show(ModalContentComponent, {initialState});
    this._bsModalRef.content.ModalBody = `Вы действительно хотите удалить ${tovar}?`;
    this._bsModalRef.content.closeBtnName = 'Закрыть';
    this._bsModalRef.content.confirmBtnName = 'Удалить';
    this._bsModalRef.content.confirmDeleteParam = id;
    this._bsModalRef.content.confirmDeleteGet = link;
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
    this._bsModalRef = this._modalService.show(ModalDetailComponent, {initialState});
    this._bsModalRef.content.ModalBody = {initialState};
    this._bsModalRef.content.ModalTitle = data.name;
    this._bsModalRef.content.closeBtnName = 'Закрыть';
  }

  update(data: menuIntarface): void {
    this._router.navigate(['/dashboard/addrecept'], {
      queryParams: {
        id : data.id
      }}
    )
  }

  ngOnDestroy(): void  {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
