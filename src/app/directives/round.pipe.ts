import {Pipe} from '@angular/core';

@Pipe({
    name: 'round'
})
export class RoundPipe {
  transform(value: number, digits: number): number {
    return +value.toFixed(digits);
  }
}