import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DbService } from '../../shared/services/db.service';
import { FilterService } from '../../shared/services/filter.service';

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
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.persons = this.db.getUsers();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
