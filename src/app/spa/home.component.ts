import { Component, OnInit, Injectable } from '@angular/core';
import { ParamsModel } from '../services/params.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  private settings: any;

  constructor(private paramsModel:ParamsModel) {
  }

  ngOnInit() {
      this.settings = this.paramsModel.getParams();
  }

  getSetting() {
      return this.settings;
  }

}
