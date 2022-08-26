import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DbService } from 'src/app/shared/services/db.service';
import { Days } from 'src/app/shared/interface/interface.service';

@Component({
  selector: 'app-combo-form',
  templateUrl: './combo-form.component.html',
  styleUrls: ['./combo-form.component.scss']
})
export class ComboFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  notifier = new Subject();
  categoriesArray = [];
  allComplete: boolean = false;
  daysArray: Days = {
    id: 0,
    value: 'Дни проведения',
    completed: false,
    subtasks: [
      {id: 1, value: 'Пн', completed: false},
      {id: 2, value: 'Вт', completed: false},
      {id: 3, value: 'Ср', completed: false},
      {id: 4, value: 'Чт', completed: false},
      {id: 5, value: 'Пт', completed: false},
      {id: 6, value: 'Сб', completed: false},
      {id: 7, value: 'Вс', completed: false}
    ]
  };
  tovarSearch = new FormControl();
  filteredFruits: Observable<string[]>;
  selectedFood = []
  public get categories(): FormArray {
    return <FormArray>this.form.get('categories');
  }
  public get days(): FormArray {
    return <FormArray>this.form.get('days');
  }
  constructor(
    private fb: FormBuilder,
    public db: DbService,
    private alert: AlertService,
  ) { 
    this.filteredFruits = this.tovarSearch.valueChanges.pipe(
      startWith(null),
      map((name: string | null) => name ? this._filter(name) : this.categoriesArray)
    )
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoriesArray.filter(tovar => tovar.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      active: false,
      days: this.fb.array([]),
      price:  new FormControl('', Validators.required),
      categories: this.fb.array([]),
    });
    this.request()
    this.addDays()
    this.addForm();
  }

  request(): void {
    this.db.getCategoriesAndChilde().pipe(takeUntil(this.notifier)).subscribe(val => {
      this.categoriesArray = val;
    })
  }  

  addDays() {
    this.daysArray.subtasks.forEach(el => {
      return (<FormArray>this.form.get('days')).push(
        this.fb.group({
          id: [el.id],
          value: [el.value],
          completed: [el.completed]
        })
      );
    });
  }

  addForm(data?) {
    if(data) {
      data.forEach(element => {
        return (<FormArray>this.form.get('categories')).push(
          this.fb.group({
            id: [],
            parent: [],
            value: [element[0]],
          })
        );
      });
    } else {
      return (<FormArray>this.form.get('categories')).push(
        this.fb.group({
          id: [],
          parent: [],
          value: []
        })
      );
    }
  }

  selectGoup(data, index): void {
    this.selectedFood = Object.values(data.childe).map(el => {return el});
    const form = this.form.get('categories')['controls'][index];
    form.get('value').setValue(this.selectedFood);
    form.get('parent').setValue(data.name);
    form.get('id').setValue(data.id);
  }

  serializeObj(obj): string {
    let result = [];
    for (let property in obj) {
      if(obj[property] && obj[property].value) {
        Object.keys(obj[property]).forEach((el, i) => {
          if(typeof obj[property][el] === 'object') {
            let childId= obj[property][el].map((el2, i) =>  el2['id'])
            result.push(`${el}=[${childId.join(',')}]`);
          } else {
            result.push(`${el}=${obj[property][el]}`);
          }
        })
      }
    }
    return result.join("&");
  }

  save(): void {
    this.form.value.days = this.serializeObj(this.form.value.days);
    this.form.value.categories = this.serializeObj(this.form.value.categories);
    this.db.saveCombo(this.form.value).pipe(
      takeUntil(this.notifier)
    ).subscribe(
      res => this.alert.success('Набор добавлен')
    );
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    /*this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);*/
  }

  remove(index: number, number: number): void {
    this.form.get('categories')['controls'][index].get('value').value.splice(number, 1);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
