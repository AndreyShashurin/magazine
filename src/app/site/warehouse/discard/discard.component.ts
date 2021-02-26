import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { discardIntarface, DiscardTypeName } from '../../../shared/services/interface.service';
import { DbService } from '../../../shared/services/db.service';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';

@Component({
  selector: 'app-discard',
  templateUrl: './discard.component.html',
  styleUrls: ['./discard.component.sass']
})
export class DiscardComponent implements OnInit {
  discard: discardIntarface[] = [];
  limit = 10;
  discardName = DiscardTypeName;
  ngUnsubscribe = new Subject();

  constructor(
    public db: DbService
    ) {
  }

  ngOnInit() {
    this.request()
  }

  request(data?: LimitInterface): void {
    const params = {
      limit: data ? data.limit : this.limit,
      offset: data ? data.offset : 0
    }
    this.db.getDiscard(params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (res) => { 
        this.discard = res['data'];
        this.discard['total'] = res['total'];
      },
      (error) => {console.log(error);}
     )  
  }

  setPaginatorParams(params: LimitInterface): void {
    this.request(params)
  }

  compareDiscardId(id: number | string): string {
    return Object.keys(this.discardName)[id];
  }
 
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
