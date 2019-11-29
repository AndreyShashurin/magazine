import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
  }

}
