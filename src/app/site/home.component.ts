import { Component, OnInit, Injectable, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { SettingsService } from '../shared/services/settings.service';
import { DbService } from '../shared/services/db.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)

  public viewPort: CdkVirtualScrollViewport;
  public settings: any;
  public filial: any;

  constructor(
    public db: DbService,
    public settingsService: SettingsService
    ) {
  }

  ngOnInit() {
    this.db.getSettings().subscribe(
      (val) => {
        this.settings = val;   
      },
      (error) => {
        console.log(error);
      }
    )
    this.settingsService.getSetting()
    this.settingsService.getFilial()

    this.settingsService.filialResponse.subscribe(
      (data) => {
        this.filial = data
      }
    )    
  }
}
