import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DbService } from '../../shared/services/db.service';

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
    public store: Store
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
