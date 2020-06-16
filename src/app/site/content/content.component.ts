import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { SettingsService } from '../../shared/services/settings.service';
import { FilterService } from '../../shared/services/filter.service';
import { HomeComponent } from '../home.component';
import { DbService } from '../../shared/services/db.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent extends HomeComponent implements OnInit {
  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    public store: Store
  ) { 
    super(
      db,
      settingsService,
      store
    );
  }

  ngOnInit() {
  }

}
