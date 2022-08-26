import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment_ from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DbService } from 'src/app/shared/services/db.service';
import { IngredietnsTypeName, skladIntarface, suppliersIntarface } from 'src/app/shared/interface/interface.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { CustomValidator } from 'src/app/shared/utils/custom-validator';
const moment = moment_;

@Component({
  selector: 'app-add-warehous',
  templateUrl: './add-warehous.component.html',
  styleUrls: ['./add-warehous.component.sass']
})
export class AddWarehousComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id: string;
  smena: string;
  ingredietnsTypeName: any;
  keys = Object.keys;
  notifier = new Subject();
  suppliers: suppliersIntarface[] = [];
  sklads: skladIntarface[] = [];
  summed = 0;

  get tovars(): FormArray {
    return this.form.get('tovars') as FormArray;
  } 
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _db: DbService,
    private _alert: AlertService
  ) { 
    this.ingredietnsTypeName = IngredietnsTypeName;
    this.id = this._activatedRoute.snapshot.queryParams.id;
    this.smena = this._activatedRoute.snapshot.queryParams.smena;
    _db.getSuppliers().pipe(takeUntil(this.notifier)).subscribe(
      (data) => { this.suppliers = data; },
      (error) => {}
    ) 
    _db.getSklad().pipe(takeUntil(this.notifier)).subscribe(
      (data) => { this.sklads = data },
      (error) => { console.log(error) }
    )  
  }

  ngOnInit() {
    this.form = this._fb.group({
      filial: new FormControl(null, Validators.required),
      supplier: new FormControl(null, Validators.required),
      account: new FormControl(null, Validators.required),
      date: new FormControl(new Date()), 
      file: new FormControl(''),
      fileSource: new FormControl(''),
      summ: new FormControl(''),
      tovars: this._fb.array([]),
    });
    
    if(this.id) {
      this._db.getTovarById(this.id).pipe(takeUntil(this.notifier)).subscribe(
        (data) => { this.addTovarArray(data); },
        (error) => {console.log(error);}
       )  
    } else if(this.smena) {
      this._db.getSmenaId(this.smena).pipe(takeUntil(this.notifier)).subscribe(
        (data) => { 
          this.form.get('date').setValue(moment(data['date']).format('YYYY-MM-DD'));
          this.form.get('account').setValue('3');
          this.addFieldsForm()
        },
        (error) => {console.log(error);}
       )  

    }else {
      this.addFieldsForm(); 
    }
    this.form.get('tovars').valueChanges.subscribe(values => {
      this.summed = 0;
      const ctrl = <FormArray>this.form.controls['tovars'];
      ctrl.controls.forEach(el => {
        if(el.get('summ').value) {
          this.summed += +parseFloat(el.get('summ').value);
          this.form.controls['summ'].patchValue(this.summed);
        }
      });
    })
  }

  addTovarArray(data?) {
    if(data) {
      data.forEach(element => {
        return this.addFieldsForm(element);
      });
    } else {
      return this.addFieldsForm();
    }
  }

  addFieldsForm(data?) {
    return (<FormArray>this.form.get('tovars')).push(
      this._fb.group({
        id: [data ? data.id : ''],
        value: [data ? data.tovar : '', Validators.required],
        priceOld: [data ? data.price :''],
        type: [data ? data.ed : ''],
        quantity: [ '', [CustomValidator.numeric, Validators.required]],
        quantityOld: [''],
        priceNews: [''],
        summ: [''],
        markUpPercent: [''],
        idMenu: []
      })
    )
  }

  removeTovarField(i: number): void {
    (<FormArray>this.form.get('tovars')).removeAt(i);
  }

  selectedItem(item: skladIntarface, i: number): void { 
    const form = this.form.get('tovars')['controls'][i];
    form.get('type').setValue(item.ed)
    form.get('priceOld').setValue(item.price);
    form.get('quantityOld').setValue(item.value);
    form.get('id').setValue(item.id);
    form.get('idMenu').setValue(item.idMenu);
  }

  onChange(e: any, i: number): void {
    const form = this.form.get('tovars')['controls'][i];
    const quantity = form.get('quantity').value;
    const priceOld = form.get('priceOld').value;
    const quantityNew = +e.target.value * +quantity;
    if(priceOld > 0) {
      const sell_cost = priceOld / 100;  // Проценты
      const sell_price = e.target.value - priceOld;  // Проценты
      const sell_itog = sell_price / sell_cost;  // Проценты
      form.get('markUpPercent').setValue(sell_itog.toFixed(2));
    }
    form.get('summ').patchValue(quantityNew.toFixed(2));
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }

  serializeObj(obj): string {
    let result = [];
    for (let property in obj) {
      if(obj[property] && obj[property].value) {
        Object.keys(obj[property]).forEach((el, i) => {
          result.push(`${el}=${obj[property][el]}`);
        })
      }
    }
    return result.join("&");
  }  
   
  sendForm(): void {
    const formData = new FormData();
    formData.append('file', this.form.get('fileSource').value);
    this.form.value.tovars = this.serializeObj(this.form.value.tovars);
    this._db.postSklad(this.form.value, this.smena, localStorage.getItem('SJid')).pipe(takeUntil(this.notifier)).subscribe(
      (responce) => {this._alert.success(`Товар${this.form.value.tovars.length > 1 ? 'ы' : '' } добавлены`)},
      (error) => {this._alert.error('Ошибка')}
    )
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
