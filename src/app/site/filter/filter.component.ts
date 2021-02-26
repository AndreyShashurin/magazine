import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, NgModule } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Input() visible: boolean = true; // Видимость фильтра
  @Input() warehouse: boolean = false; //Кнопки склада
  @Input() addPersonal: boolean = false; //Добавить нового сотрудника
  @Input() menu: boolean = false; //Добавить нового сотрудника
  @Input() addFilial: boolean = false; //Добавить нового сотрудника

  constructor() { }

  ngOnInit() {

  }

}
@NgModule({
  imports: [CommonModule],
  exports: [FilterComponent],
  declarations: [FilterComponent]
})
export class FilterComponentModule { }