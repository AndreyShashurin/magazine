import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DbService } from '../../shared/services/db.service';
import { IngredietnsTypeName } from '../../shared/services/interface.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add-tovar.component.html',
  styleUrls: ['./menu-add-tovar.component.scss']
})
export class MenuAddTovarComponent implements OnInit {
  form: FormGroup;
  ingredietnsTypeName: any;
  keys = Object.keys;
  
  constructor(
    public fb: FormBuilder,
    public db: DbService,
    public settings: SettingsService,
    private alert: AlertService,
    public store: Store 
  ) {
  }

  get tovar(): FormArray {
    return this.form.get('tovar') as FormArray;
  }

  ngOnInit() {
    this.ingredietnsTypeName = IngredietnsTypeName;
    this.form = this.fb.group({
      tovar: this.fb.array([]),
      filial: new FormControl(null, Validators.required)
    });
    this.addForm();
  }

  addForm() {
    return (<FormArray>this.form.get('tovar')).push(
      this.fb.group({
        sale: true,
        weight: false,      
        name: new FormControl(null, Validators.required),
        category: new FormControl(null, Validators.required),
        ed: new FormControl(null),
        nalog: new FormControl(null),
        price: new FormControl(0)
      })
    )
  }

  remove(i: number): void {
    (<FormArray>this.form.get('tovar')).removeAt(i);
  }

  save() {
    this.db.saveDelivery(this.form.value).subscribe(
      (responce) => {this.alert.success('Товар добавлен')},
      (error) => {this.alert.error('Ошибка')});
  }

  trackByFn(index, item) {
    return index
  }
}
