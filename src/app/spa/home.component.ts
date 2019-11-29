import { Component, OnInit, Injectable } from '@angular/core';
import { ParamsModel } from '../shared/services/params.model';
import { SettingsService } from '../shared/services/settings.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  private settings: any;

  constructor(
    private paramsModel:ParamsModel,
    private settingsService: SettingsService
    ) {
  }

  ngOnInit() {
    this.settingsService.getSetting()
    this.settings = this.paramsModel.getParams();
  }

  getSetting() {
      return this.settings;
  }

}
