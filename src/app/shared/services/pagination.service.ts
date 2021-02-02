import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of, Subject, BehaviorSubject, combineLatest, defer  } from 'rxjs';
import { delay, switchMap, startWith, map, share, finalize, distinctUntilChanged } from 'rxjs/operators';
import { NodeStructureInterface, Page, PageRequest, PaginatedEndpoint, QueryInterface } from './paginationInterface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public pageNumber = new Subject<number>();
  constructor() {
  }

  paginationAndSearch(
    request?: PageRequest<NodeStructureInterface>,
    query?: QueryInterface,
    filteredParams?: any,
    length?: number,
    pager?: any,
    searchField?: any,
    limit?: number
  ): Observable<Page<NodeStructureInterface>> {
    if  (filteredParams) {
      let { search } = query;
      filteredParams = filteredParams.content ? filteredParams.content : filteredParams;
      if (search) {
        search = search.toLowerCase();
        filteredParams = filteredParams.filter(({ item }) => {
          if (item) {
            return item ? item.toLowerCase().includes(search) : ''
          }
        });
      }
      const start = request.page * request.size;
      const end = start + request.size;
      const pageUsers = filteredParams.slice(start, end);
      const page = {
        content: pageUsers,
        search: {
          res: searchField ? searchField.res : [],
          field: searchField ? searchField.field : '',
          length: searchField.length
        },
        number: pager,
        pageSizeOptions: [5, 10, 25, 50, 100],
        size: limit,
        totalElements: searchField.field ? searchField.length : filteredParams.length,
        length: searchField.field ? searchField.length : length
      };
      return of(page).pipe(delay(500));
    } else {
      return of(filteredParams).pipe(delay(500));
    }
  }

  getPager(totalItems: number, currentPage: number = 0, pageSize: number = 10) {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
      currentPage = 0;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
    };
  }
}

export interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;
  disconnect(): void;
}

export function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => defer(() => {
    callback();
    return source;
  });
}

export function indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => source.pipe(
    prepare(() => indicator.next(true)),
    finalize(() => indicator.next(false))
  )
}

export class PaginatedDataSource<T, Q> implements SimpleDataSource<T> {
  public pageNumber = new Subject<number>();
  public query: BehaviorSubject<Q>;

  loading$ = new Subject<boolean>()
  public page$: Observable<Page<T>>;

  constructor(
    private endpoint?: PaginatedEndpoint<T, Q>,
    public initialQuery?: Q,
    public pageSize?: number,
    public length?: number,
    public limit?: number
    ) {
      this.query = new BehaviorSubject<Q>(initialQuery)
      const param$ = combineLatest([this.query]);
      this.page$ = param$.pipe(
        switchMap(([query]) => this.pageNumber.pipe(
          startWith(0),
          distinctUntilChanged(),
          switchMap(page => this.endpoint({page, size: this.pageSize}, query)
            .pipe(indicate(this.loading$))
          )
        )),
        share()
      )
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};
    this.query.next(nextQuery);
  }

  fetch(page: PageEvent): void {
    this.pageNumber.next(page.pageIndex);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(map(page => page.content));
  }

  disconnect(): void {}
}
