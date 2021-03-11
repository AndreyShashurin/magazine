import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DbService } from 'src/app/shared/services/db.service';
import { statusType } from 'src/app/shared/services/interface.service';
import { LimitInterface } from 'src/app/shared/services/paginationInterface';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent implements OnInit {
  combo = [];
  ngUnsubscribe = new Subject();
  limit = 10;
  statusType = statusType;
  constructor(
    public db: DbService,
  ) { }

  ngOnInit() {
    this.request()
  }

  request(data?: LimitInterface): void {
    const params = {
      limit: data ? data.limit : this.limit,
      offset: data ? data.offset : 0
    }
    this.db.getCombo(params).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (res) => { 
        this.combo = res['data'];
        this.combo['total'] = res['total'];
      },
      (error) => {console.log(error);}
     )  
  }  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
