import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DbService } from 'src/app/shared/services/db.service';
import { DiscardTypeName, IngredietnsTypeName, skladIntarface } from 'src/app/shared/services/interface.service';

@Component({
  selector: 'app-write',
  templateUrl: './writeof.component.html',
  styleUrls: ['./writeof.component.sass']
})
export class WriteOfComponent implements OnInit, OnDestroy {
  form: FormGroup;
  notifier = new Subject();
  sklads: skladIntarface[] = [];
  id: string;
  discardName = DiscardTypeName;
  keys = Object.keys;

  constructor(
    private activatedRoute: ActivatedRoute,
    public db: DbService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {
    this.id = this.activatedRoute.snapshot.queryParams.id;
    db.getSklad().pipe(takeUntil(this.notifier)).subscribe(
      (data) => { this.sklads = data; },
      (error) => { console.log(error); }
     )  
   }

  ngOnInit() {
    this.form = this.fb.group({
      reason: new FormControl(null, Validators.required),
      date: new FormControl(new Date()), 
      comment: new FormControl(''),
      price: new FormControl(''),
      tovars: this.fb.array([]),
    });
    
    if(this.id) {
      this.db.getTovarById(this.id).pipe(takeUntil(this.notifier)).subscribe(
        (data) => { this.addTovarArray(data); },
        (error) => {console.log(error);}
       )  
    } else {
      this.addTovarArray(); 
    }  
  }

  addTovarArray(data?) {
    if(data) {
      data.forEach(element => {
        return (<FormArray>this.form.get('tovars')).push(
          this.fb.group({
            name: [element.tovar, Validators.required],
            id: [element.id, Validators.required],
            quantity: [element.value, Validators.required],
            max: [element.value],
            price: [element.price],
            type: [element.ed]
          })
        ) 
      });
    } else {
      return (<FormArray>this.form.get('tovars')).push(
        this.fb.group({
          name: ['', Validators.required],
          id: ['', Validators.required],
          quantity: ['', Validators.required],
          max: [''],
          price: [''],
          type: ['']
        })
      )
    }
  }

  public get tovars(): FormArray {
    return <FormArray>this.form.get('tovars');
  }

  public removeIngredient(i: number): void {
    (<FormArray>this.form.get('tovars')).removeAt(i);
    this.setPrice()
  }

  selectedItem(item: skladIntarface, i: number): void { 
    const form = this.form.get('tovars')['controls'][i];
    form.get('quantity').setValue(item['value']);
    form.get('price').setValue(item['price']);
    form.get('type').setValue(item['ed']);
    form.get('max').setValue(item['value']);
    form.get('id').setValue(item['id']);
  }

  onChange(e: any, i: number): void {
    const form = this.form.get('tovars')['controls'][i];
    const max = form.get('max').value;
    if (+e.target.value > + max) {
      this.alert.error(`Максимально для списания ${max}`);
    } else {
      this.setPrice(+e.target.value)
    }
  }

  serializeObj(obj) {
    let result = [];
    for (let property in obj) {
      if(obj[property] && obj[property].name) {
        Object.values(obj[property]).forEach((el, i) => {
          result.push(`${i}=${el}`);
        })
      }
    }
    return result.join("&");
  }

  setPrice(value?): void {
    const controls = this.form.get('tovars')['controls'];
    let array = [];
    controls.forEach(element => {
      let type = element.get('type').value;
      if(type === IngredietnsTypeName[3]){
        array.push(element.get('price').value * value)
      } else if(type === IngredietnsTypeName[4]){
        let price = value * 0.1 / 100 * element.get('price').value;
        array.push(price)
      } else if(type === IngredietnsTypeName[0]) {
        let price = value * 0.1 / 100 * element.get('price').value;
        array.push(price)
      } 
    });
    let result = array.reduce((sum, current) => {
      return +sum + +current;
    }, 0);
    this.form.get('price').setValue(result.toFixed(2));
  }

  sendForm(): void {
    this.form.value.tovars = this.serializeObj(this.form.value.tovars);
    this.db.postWriteOf(this.id, this.form.value).subscribe(
      (responce) => {this.alert.success('Информация обновлена')},
      (error) => {this.alert.error('Ошибка')}
    );
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
