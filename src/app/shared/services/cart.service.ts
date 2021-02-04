import { Injectable, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { menuIntarface } from './interface.service';

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
      typePay: []
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
      });
      ctrl.controls.forEach(element => {
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
      /*if(this.activeItemSales) {
        Object.values(this.activeItemSales['childe']).forEach(el => {
          if(el['cat']) {
            let child =  el['cat'].split(',');
            ctrl.controls.forEach(element => {
              if(child.some(el => {return +el === element.get('id').value})) {
                console.log(element)
                let percent = this.activeItemSales['sale'] / 100 * element.get('price').value;
                element.get('salePrice').setValue(element.get('price').value - percent)
              }
            });
          }
        });
      }*/
    })
  }

  public get tovars(): FormArray {
    return <FormArray>this.cartForm.get('tovars');
  }
  public get combo(): FormArray {
    return <FormArray>this.cartForm.get('combo');
  }
  addCartGroup(data?) {
    return (<FormArray>this.cartForm.get('tovars')).push(
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
        priceWeight: [data.price]
      })
    )
  }

  onSelectedArray(data, id) {
    this.data[`combo`].push(data);
  }

  updateCount(item: menuIntarface[], val: number) {
    this.data.tovar.map(val => val['id'] === item['id'] ? item['totalCounter'] = 1 : null)
    this.count += val;
  }

  incrementCount(data: number) {
    this.count -= data;
  }

  incrementPrice(data: number) {
    this.price -= data;
  }

  updatePrice(data: number) {
    this.price += data;
  }

  decrementCounter(key: any, item: any){
    this.data.tovar.map(val => val['id'] === item.id ? item.totalCounter++ : null)
  }

  incrementCounter(key: any, item: any){
    this.data.tovar.map(val => val['id'] === item.id ? item.totalCounter-- : null)
    if (item.totalCounter === 0) {
      this.deleteCart(key)
    }
  }

  onBreadcrumbs(data) {
    this.breadcrumbs.push(data);
  }

  deleteCart(index: number): void {
    (<FormArray>this.cartForm.get('tovars')).removeAt(index);
  }  

  deleteCombo(index: number) {
    this.data.combo = this.data.combo.filter((arr, i) => i !== index)
  }
  
  setSale(data): void {
    Object.values(data.childe).forEach(el => {
      if(el['cat']) {
        this.getSale(data, el['cat'].split(','))
      }
    });
  }

  getSale(array: any, child: string[]) {
    this.cartForm.get('tovars').value.forEach((form, i) => {
      if(child.some(el => {return +el === form.id})) {
        let percent = array.sale / 100 * form.price;
        this.cartForm.get('tovars.0').get('salePrice').setValue(form.price - percent)
      }
    })
  }

  setPriceCount(tovar) {
    if(tovar.controls.weightFlag.value) {
      return 0
    } else {
      return tovar.controls.price.value * tovar.controls.count.value
    }

  }
}
