import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isNumber } from 'highcharts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DbService } from 'src/app/shared/services/db.service';
import { IngredietnsTypeName, skladIntarface, suppliersIntarface } from 'src/app/shared/services/interface.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-add-warehous',
  templateUrl: './add-warehous.component.html',
  styleUrls: ['./add-warehous.component.sass']
})
export class AddWarehousComponent implements OnInit, OnDestroy {
  form: FormGroup;
  id: string;
  ingredietnsTypeName: any;
  keys = Object.keys;
  notifier = new Subject();
  suppliers: suppliersIntarface[] = [];
  sklads: skladIntarface[] = [];
  summed = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private settings: SettingsService,
    private fb: FormBuilder,
    public db: DbService
  ) { 
    this.ingredietnsTypeName = IngredietnsTypeName;
    this.id = this.activatedRoute.snapshot.queryParams.id;
    db.getSuppliers().pipe(takeUntil(this.notifier)).subscribe(
      (data) => { this.suppliers = data; },
      (error) => {}
    ) 
    db.getSklad().pipe(takeUntil(this.notifier)).subscribe(
      (data) => { this.sklads = data },
      (error) => { console.log(error) }
    )  
  }

  ngOnInit() {
    this.form = this.fb.group({
      filial: new FormControl(null, Validators.required),
      supplier: new FormControl(null, Validators.required),
      account: new FormControl(null, Validators.required),
      date: new FormControl(new Date()), 
      file: new FormControl(''),
      fileSource: new FormControl(''),
      summ: new FormControl(''),
      tovars: this.fb.array([]),
    });
    
    if(this.id) {
      this.db.getTovarById(this.id).pipe(takeUntil(this.notifier)).subscribe(
        (data) => { this.addTovarArray(data); },
        (error) => {console.log(error);}
       )  
    } else {
      this.addFieldsForm(); 
    }
    this.form.get('tovars').valueChanges.subscribe(values => {
      this.summed = 0;
      const ctrl = <FormArray>this.form.controls['tovars'];
      ctrl.controls.forEach(el => {
        if(el.get('summ').value) {
          this.summed += +parseFloat(el.get('summ').value)
          this.form.controls['summ'].patchValue(this.summed)
        }
      });
    })
  }

  get tovars(): FormArray {
    return <FormArray>this.form.get('tovars');
  }

  addTovarArray(data?) {
    if(data) {
      data.forEach(element => {
        return this.addFieldsForm(element)
      });
    } else {
      return this.addFieldsForm()
    }
  }

  addFieldsForm(data?) {
    return (<FormArray>this.form.get('tovars')).push(
      this.fb.group({
        id: [''],
        name: ['', Validators.required],
        priceOld: [''],
        type: [''],
        quantity: [ '', Validators.required],
        quantityOld: [''],
        priceNews: [''],
        summ: [''],
        markUpPercent: ['']
      })
    )
  }

  removeTovarField(i: number): void {
    (<FormArray>this.form.get('tovars')).removeAt(i);
  }

  selectedItem(item: skladIntarface, i: number): void { 
    const form = this.form.get('tovars')['controls'][i];
    form.get('priceOld').setValue(item['price']);
    form.get('quantityOld').setValue(item['value']);
    form.get('id').setValue(item['id']);
  }

  onChange(e: any, i: number): void {
    const form = this.form.get('tovars')['controls'][i];
    const quantity = form.get('quantity').value;
    const priceOld = form.get('priceOld').value;
    const quantityNew = +e.target.value * +quantity;
    const sell_cost = priceOld / 100;  // Проценты
    const sell_price = e.target.value - priceOld;  // Проценты
    var sell_itog = sell_price / sell_cost;  // Проценты
    form.get('summ').patchValue(quantityNew);
    form.get('markUpPercent').setValue(sell_itog.toFixed(2));

  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }
  }
     
  sendForm(): void {
    const formData = new FormData();
    formData.append('file', this.form.get('fileSource').value);
    this.db.postSklad(this.form.value).pipe(takeUntil(this.notifier)).subscribe(
      (data) => { },
      (error) => {}
    ) 
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
