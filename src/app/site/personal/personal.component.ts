import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DbService } from '../../shared/services/db.service';
import { FilterService } from '../../shared/services/filter.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  subscription: Subscription;
  persons: Observable<Object>;
  constructor(
    private db: DbService,
    private filterService: FilterService,
    public store: Store
  ) { }

  ngOnInit() {
    this.persons = this.db.getUsers();
    console.log(this.persons)
    this.store.subscribe(state => console.log(state['persons'].persons));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
