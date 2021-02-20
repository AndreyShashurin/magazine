import {Pipe} from '@angular/core';

@Pipe({
    name: 'price'
})
export class PricePipe {
  transform(value: number, digits: number): string {
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(value)
  }
}