import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Input() visible: boolean = true; // Видимость фильтра
  @Input() warehouse: boolean = false; //Кнопки склада
  @Input() addPersonal: boolean = false; //Добавить нового сотрудника

  constructor() { }

  ngOnInit() {

  }

}
