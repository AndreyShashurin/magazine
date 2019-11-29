import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Input() visible: boolean = true;

  constructor() { }

  ngOnInit() {
    console.log(this.visible)
  }

}
