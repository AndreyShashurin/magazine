import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { HomeComponent } from '../home.component';
import { SettingsService } from '../../shared/services/settings.service';
import { DbService } from '../../shared/services/db.service';
import { ingredientsInterface, skladIntarface, IngredietnsTypeName, menuIntarface } from '../../shared/services/interface.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-add-recept',
  templateUrl: './menu-add-recept.component.html',
  styleUrls: ['./menu-add-recept.component.scss'],
})
export class MenuAddReceptComponent extends HomeComponent implements OnInit, OnDestroy {

  form: FormGroup;
  notifier = new Subject();
  sklad: skladIntarface[] =[];
  id: number;
  selectedWeigt = 0;
  public ingredientsTypes: ingredientsInterface[] = [];
  filteredOptions: Observable<string[]>;
  
  constructor(
    private fb: FormBuilder,
    public db: DbService,
    public settings: SettingsService,
    public store: Store,
    private activatedRoute: ActivatedRoute,
    private alert: AlertService
  ) { 
    super(
      db,
      settings,
      store
    )
    this.id = this.activatedRoute.snapshot.queryParams.id;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      volume: new FormControl(''),
      categories:  new FormControl('', Validators.required),
      weight: false,
      sale: true,   
      nalog:  new FormControl('0'),
      filial: new FormControl('', Validators.required),
      process: this.fb.array([]),
      ingredient: this.fb.array([]),
      cost: new FormControl(0),
      output: new FormControl(''),
      salePrice: new FormControl(''),
      markUp: new FormControl(''),
      markUpPercent: new FormControl(''),
    });
    if(this.id) {
      this.db.getMenuById(this.id).pipe(
        takeUntil(this.notifier)
      ).subscribe(el => {
        console.log(2222, el)
        this.form.patchValue(el);
        console.log(2222, this.form.value)
        this.addFormProcess(el['process']);
        this.addIngredient(el['ingredient']);
      })
    } else {
      this.addFormProcess();
      this.addIngredient();    
    }

    this.db.getSklad().pipe(
      takeUntil(this.notifier)
    ).subscribe(
      (response) => {
        this.sklad = response;
        for (let item of response) {
          this.ingredientsTypes.push({
            title: item['tovar'], 
            price: +item['price'], 
            type: item['ed'],
            weight: '',
            maxValue: item['value']
          });
        }
      } ,
      (error) => {
        console.log(error);
      }
    )   
     /* this.ingredients.valueChanges.pipe(
        startWith(''),
        //map(value => this._filter(value))
      ).subscribe(el => {
        console.log(el)
      });*/
  }
  

  private _filter(value: any): string[] {
    //const filterValue = value.toLowerCase();
    return ['f']
   // return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
  checkbox_change() {

  }

  addFormProcess(data?) {
    if(data) {
      data.forEach(element => {
        return (<FormArray>this.form.get('process')).push(
          this.fb.group({
            value: [element[1]],
          })
        ) 
      });
    } else {
      return (<FormArray>this.form.get('process')).push(
        this.fb.group({
          value: [''],
        })
      )
    }
  }

  addIngredient(data?: menuIntarface[]) {
    if(data) {
      data.forEach(element => {
        return (<FormArray>this.form.get('ingredient')).push(
          this.fb.group({
            value: [element[0]],
            price: [element[1]],
            weight: [element[2], [
              Validators.required,
              Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
            ]],
            costPrice: [element[3]],
            type: [element[4]],
            maxValue: ['']
          })
        );
      });
    } else {
      return (<FormArray>this.form.get('ingredient')).push(
        this.fb.group({
          value: [''],
          price: [''],
          weight: ['', [
            Validators.required,
            Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
          ]],
          costPrice: [0],
          type: [''],
          maxValue: ['']
        })
      );
    }
  }

  public get ingredient(): FormArray {
    return <FormArray>this.form.get('ingredient');
  }
  
  public removeIngredient(i: number): void {
    const form = this.form.get('ingredient')['controls'][i];
    (<FormArray>this.form.get('ingredient')).removeAt(i);
    this.setOutput();
    this.setCost();
  }

  getFormIngredient() {
    return this.form.get('ingredient')['controls'];
  }

  trackByFn(index, item) {
    return index
  }

  selectedItem(item, i: number): void { 
    const form = this.form.get('ingredient')['controls'][i];
    //form.reset();
    form.get('type').setValue(item.type)
    form.get('price').setValue(item.price)
    form.get('maxValue').setValue(item.maxValue)
  }

  onChange(e: any, i: number): void {
    const form = this.form.get('ingredient')['controls'][i];
    const type = form.get('type').value;
    const max = form.get('maxValue').value;
    const price = form.get('price').value;
    const costPrice = form.get('costPrice').value;
    const cost = this.form.get('cost').value;  
    if (max) {
      if(max <= '0'){
        form.get('costPrice').setValue(0)         
      } else {
        if(type === IngredietnsTypeName['шт.']){
          const price_ml = price * e.target.value;
          const pricelFixed = price_ml.toFixed(2);
          const cost_new = +cost - +costPrice + +pricelFixed;
          form.get('costPrice').setValue(pricelFixed);   
          const cost_newFixed = cost_new.toFixed(2);
          this.form.get('cost').setValue(cost_newFixed);
        } else if(type === IngredietnsTypeName['кг.']){
          let price_ml = e.target.value * 0.1 / 100 * price;
          let pricelFixed = price_ml.toFixed(2);
          form.get('costPrice').setValue(pricelFixed);
          this.setCost();
        } else if(type === IngredietnsTypeName['л.']) {
          let price_ml = e.target.value * 0.1 / 100 * price;
          let pricelFixed = price_ml.toFixed(2);
          form.get('costPrice').setValue(pricelFixed);
          this.setCost();
        } 
        if(type !== IngredietnsTypeName['шт.']) {
          this.setOutput();
        }
      }
    } else {
      this.alert.error('Необходимо выбрать товар')
    }
  }

  setOutput(): void {
    const controls = this.getFormIngredient();
    let array = [];
    controls.forEach(element => {
      if(element.get('type').value !== IngredietnsTypeName[3]) {
        array.push(element.get('weight').value)
      }
    });
    let result = array.reduce((sum, current) => {
      return +sum + +current;
    }, 0);
    this.form.get('output').setValue(result);
  }

  setCost(): void {
    const controls = this.getFormIngredient();
    let array = [];
    controls.forEach(element => {
      array.push(element.get('costPrice').value)
    });
    let result = array.reduce((sum, current) => {
      return +sum + +current;
    }, 0);
    this.form.get('cost').setValue(result);
  }

  onChangePrice(e): void {
    const cost = this.form.get('cost').value;
    const sell_itog_rub = +e.target.value - +cost
    const sell_cost = +cost / 100;  // Проценты
    const sell_price = +e.target.value - +cost;  // Проценты
    const sell_itog = +sell_price / +sell_cost;  // Проценты
    this.form.get('markUp').setValue(sell_itog.toFixed(2));
    this.form.get('markUpPercent').setValue(sell_itog_rub.toFixed(2));
  }

  serializeObj(obj): string {
    let result = [];
    for (let property in obj) {
      if(obj[property] && obj[property].value) {
        Object.values(obj[property]).forEach((el, i) => {
          result.push(`${i}=${el}`);
        })
      }
    }
    return result.join("&");
  }

  save() {
    this.form.value.process = this.serializeObj(this.form.value.process);
    this.form.value.ingredient = this.serializeObj(this.form.value.ingredient);
    this.form.value.weight ? this.form.value.weight = 1 : this.form.value.weight = 0
    this.form.value.sale ? this.form.value.sale = 1 : this.form.value.sale = 0;
    if(this.id) {
      this.db.updateMenu(this.id, this.form.value).subscribe(
        (responce) => {this.alert.success('Информация добавлена')},
        (error) => {this.alert.error('Ошибка')}
      ) 
    } else {
      this.db.saveMenu(this.form.value).subscribe(
        (responce) => {this.alert.success('Информация добавлена')},
        (error) => {this.alert.error('Ошибка')}
      ) 
    }
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
