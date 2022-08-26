import { Injectable, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { menuIntarface } from '../interface/interface.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  tovarSelected = new EventEmitter<menuIntarface[]>();
  data: any = {
    tovar: [],
    combo: []
  };
  totalCounter: number = 1;
  breadcrumbs: any[] = [];
  count: number = 0;
  price: number = 0;
  priceSale: string;
  activeItemSales: string | number;
  sale: string;
  cartForm: FormGroup;

  constructor(
    public fb: FormBuilder
  ) {
    this.cartForm = this.fb.group({
      tovars: this.fb.array([]),
      combo: this.fb.array([]),
      typePay: [null, Validators.required]
    });
    this.cartForm.get('tovars').valueChanges.subscribe(value => {
      const ctrl = <FormArray>this.cartForm.controls['tovars'];
      let arrayCount = [];
      let arrayPrice = [];
      let arraySalePrice = [];
      ctrl.controls.forEach(element => {
        if(element.get('weightFlag')) {
          arrayPrice.push(element.get('priceWeight').value )
        } else {
          arrayPrice.push(element.get('price').value * element.get('count').value )
        }
        if(element.get('weightFlag')) {
          arrayCount.push(1)
        } else {
          arrayCount.push(element.get('count').value)
        }
        arraySalePrice.push(element.get('salePrice').value)
      });
      this.count = arrayCount.reduce((sum, current) => {
        return +sum + +current;
      }, 0);
      this.price = arrayPrice.reduce((sum, current) => {
        return +sum + +current;
      }, 0);
      this.priceSale = arraySalePrice.reduce((sum, current) => {
        return +sum + +current;
      }, 0);
    })
  }

  get tovars(): FormArray {
    return <FormArray>this.cartForm.get('tovars');
  }
  get combo(): FormArray {
    return <FormArray>this.cartForm.get('combo');
  }

  addCartGroup(data?) {
    (<FormArray>this.cartForm.get('tovars')).push(
      this.fb.group({
        id: [data.id],
        name: [data.name],
        size: [],
        count: [1],
        price: [data.price],
        sale: [data.nodiscountFlag],
        salePrice: [],
        structure: [data.structure],
        weightFlag: [data.weight_flag],
        priceWeight: [data.price],
        categories: [data.categories_id],
      })
    );
    if(this.activeItemSales) {
      this.setSale(this.activeItemSales);
    }
  }

  onSelectedArray(data, id): void {
    this.data[`combo`].push(data);
  }

  updateCount(item: menuIntarface[], val: number): void {
    this.data.tovar.map(val => val['id'] === item['id'] ? item['totalCounter'] = 1 : null)
    this.count += val;
  }

  incrementCount(data: number): void {
    this.count -= data;
  }

  incrementPrice(data: number): void {
    this.price -= data;
  }

  updatePrice(data: number): void {
    this.price += data;
  }

  decrementCounter(key: any, item: any): void {
    this.data.tovar.map(val => val['id'] === item.id ? item.totalCounter++ : null)
  }

  incrementCounter(key: any, item: any): void {
    this.data.tovar.map(val => val['id'] === item.id ? item.totalCounter-- : null)
    if (item.totalCounter === 0) {
      this.deleteCart(key);
    }
  }

  onBreadcrumbs(data): void {
    if(!this.breadcrumbs.some(el => +el.id === +data.id)) {
      this.breadcrumbs.push(data);
    }
  }

  deleteCart(index: number): void {
    (<FormArray>this.cartForm.get('tovars')).removeAt(index);
  }

  setIncrement(index: number): void {
    const form = this.cartForm.get('tovars')['controls'][index];
    let count = form.get('count').value;
    form.get('count').setValue(--count) ;
    if(form.get('weightFlag').value !== 0) {
      form.get('priceWeight').setValue((count / 1000) * form.get('price').value);
      if(this.activeItemSales) {
        this.setSale(this.activeItemSales);
      }
    } else {
      form.get('priceWeight').setValue(form.get('price').value * count);
      if(this.activeItemSales) {
        this.setSale(this.activeItemSales);
      }
    }
  }

  setDecrement(index: number): void {
    const form = this.cartForm.get('tovars')['controls'][index];
    let count = form.get('count').value;
    form.get('count').setValue(++count);
    if(form.get('weightFlag').value !== 0) {
      form.get('priceWeight').setValue((count / 1000) * form.get('price').value);
      if(this.activeItemSales) {
        this.setSale(this.activeItemSales);
      }
    } else {  
      form.get('priceWeight').setValue(form.get('price').value * count);
      if(this.activeItemSales) {
        this.setSale(this.activeItemSales);
      }
    }
  }

  deleteCombo(index: number): void {
    this.data.combo = this.data.combo.filter((arr, i) => i !== index);
  }
  
  setSale(data): void {
    this.getSale(data, data.childe);
  }

  getSale(array: any, child: string[]): void {
    this.cartForm.get('tovars').value.forEach((form, i) => {
      const cat = this.cartForm.get(`tovars.${i}`).get('categories').value;
      if(child[cat] && child[cat]['cat'].split(',').some(el => +el === form.id)) {
        const percent = array.sale / 100 * form.price;
        this.cartForm.get(`tovars.${i}`).get('salePrice').setValue((form.price * form.count) - percent);
      } else {
        this.cartForm.get(`tovars.${i}`).get('salePrice').setValue(form.price * form.count);
      }
    })
  }

  setPriceCount(tovar): number {
    if(tovar.controls.weightFlag.value) {
      return 0;
    } else {
      return tovar.controls.price.value * tovar.controls.count.value;
    }
  }
}
