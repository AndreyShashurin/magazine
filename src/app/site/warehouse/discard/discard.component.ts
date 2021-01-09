import { Component, OnInit, ViewChild } from '@angular/core';
import { discardIntarface, DiscardTypeName } from '../../../shared/services/interface.service';
import { DbService } from '../../../shared/services/db.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-discard',
  templateUrl: './discard.component.html',
  styleUrls: ['./discard.component.sass']
})
export class DiscardComponent implements OnInit {
  discard: discardIntarface[] = [];
  discardName = DiscardTypeName;

  constructor(
    public db: DbService
    ) {
      db.getDiscard().subscribe(
        (response) => { 
          this.discard = response;
          console.log(response)
        },
        (error) => {console.log(error);}
       ) 
  }

  ngOnInit() {
  }

  compareDiscardId(id: number | string): string {
    return Object.keys(this.discardName)[id];
  }

}
