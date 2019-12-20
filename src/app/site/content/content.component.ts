import { Component, OnInit } from '@angular/core';
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
    private filterService: FilterService
  ) { 
    super(
      db,
      settingsService
    );
  }

  ngOnInit() {
    
  }

}
