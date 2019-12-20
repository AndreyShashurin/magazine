import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../shared/services/settings.service';
import { FilterService } from '../../shared/services/filter.service';
import { DbService } from '../../shared/services/db.service';

@Component({
  selector: 'terminal-content',
  templateUrl: './terminal-content.component.html',
  styleUrls: ['./terminal-content.component.css']
})
export class TerminalContentComponent implements OnInit {
  constructor(
    public db: DbService,
    public settingsService: SettingsService,
    private filterService: FilterService
  ) { 
  }

  ngOnInit() {
    
  }

}
