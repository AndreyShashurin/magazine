import { Directive, ElementRef, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[currencyFormatter]'
})
export class CurrencyFormatterDirective {
  private formatter: Intl.NumberFormat;private el: HTMLElement;
  constructor(@Self() private ngControl: NgControl,
  public element: ElementRef
  ) {
    this.formatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
    console.log(element, ngControl)
  }

  ngAfterViewInit() {
    this.formatPrice(this.ngControl.value)
  }

  formatPrice(v) {
    return this.formatter.format(v);
  }

  unformatValue(v) {
    return v.replace(/,/g, '');
  }
}
