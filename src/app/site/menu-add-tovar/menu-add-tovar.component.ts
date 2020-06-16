import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { DbService } from '../../shared/services/db.service';
import { categoriesInterface } from '../../shared/services/interface.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add-tovar.component.html',
  styleUrls: ['./menu-add-tovar.component.scss']
})
export class MenuAddTovarComponent extends HomeComponent implements OnInit {

  form: FormGroup;
  categories: categoriesInterface[] = [];
  filial: any;
  
  constructor(
    public fb: FormBuilder,
    public db: DbService,
    public settingsService: SettingsService,
    public store: Store 
  ) { 
    super(
      db,
      settingsService,
      store
    )
  }

  ngOnInit() {
    this.db.getCategories().subscribe(val => {
      this.categories = val;
    })    
    this.settingsService.filialResponse.subscribe(
      (data) => {
        this.filial = data
      }
    )
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
        nalog:new FormControl(null)
      })
    )
  }
  get tovar(){
    return this.form.get('tovar') as FormArray;
  }
  remove(i: number): void {
    (<FormArray>this.form.get('tovar')).removeAt(i);
  }

  save() {
    this.db.saveDelivery(this.form.value).subscribe(data=> {
      console.log(data)
    });
  }
}
