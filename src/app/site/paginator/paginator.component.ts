import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subject } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';
import { PaginatedDataSource, PaginationService } from 'src/app/shared/services/pagination.service';
import { NodeStructureInterface, QueryInterface } from 'src/app/shared/services/paginationInterface';

@Component({
  selector: 'sj-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @Input() array;
  @Input() limit = 10;
  @Input() length = 0;
  @Output() params = new EventEmitter<any>();
  pager: any = {};
  searchField: any = [];
  ngUnsubscribe = new Subject();
  filteredArray = new PaginatedDataSource<NodeStructureInterface, QueryInterface>(
    (request, query, paramsArray = []) => this.pagination.paginationAndSearch({page: 0, size: 0}, {search: ''}, ''),
    {search: ''});
  constructor(
    public db: DbService,
    public pagination: PaginationService
  ) {
  }

  ngOnInit(): void {
    this.filteredArray = new PaginatedDataSource<NodeStructureInterface, QueryInterface>(
      (request, query, paramsArray = []) => this.pagination.paginationAndSearch(
        request,
        query,
        this.array,
        this.length,
        0,
        '',
        this.limit
      ),
      {search: ''},
      this.limit
    )
    this.filteredArray.page$.subscribe(el => {
      el.search.field ? el.length = el.totalElements : ' ';
    })
  }

  applyFilter(page: PageEvent, e: any, value: any): void {
    if (!isNaN(+value)) {
      this.limit = +value;
      this.initData(page.pageIndex);
    } else {
      console.error('Необходимо ввести число')
    }
  }

  getPage(page: PageEvent, e: any): void {
    this.limit = page.pageSize;
    this.initData(page.pageIndex);
  }

  initData(page: number): void {
    const params = {
      limit: this.limit,
      offset: this.limit ? page * this.limit : 0,
    }
    this.params.emit(params)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
