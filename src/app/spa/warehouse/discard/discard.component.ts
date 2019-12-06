import { Component, OnInit } from '@angular/core';
import { discardIntarface } from '../../../shared/services/interface.service';
import { DbService } from '../../../shared/services/db.service';

@Component({
  selector: 'app-discard',
  templateUrl: './discard.component.html',
  styleUrls: ['./discard.component.sass']
})
export class DiscardComponent implements OnInit {
  discard: discardIntarface[] = [];

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

}
