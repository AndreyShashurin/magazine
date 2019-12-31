import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { SettingsService } from '../../shared/services/settings.service';

@Component({
  selector: 'app-filial',
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.sass']
})
export class FilialComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)ж
  public viewPort: CdkVirtualScrollViewport;

  constructor(
    public settings: SettingsService
  ) { }

  ngOnInit() {
  }

}
