import { ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
    selector: 'textarea[autosize]'
})
export class AutosizeDirective {

  private el: HTMLElement;
  private clientWidth: number;


  @HostListener('window:resize', ['$event.target'])
    onResize(textArea: HTMLTextAreaElement): void {
      if (this.el.clientWidth === this.clientWidth) {
        return
      };
      this.clientWidth = this.element.nativeElement.clientWidth;
      this.adjust();
    }

  @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
      this.adjust();
    }

  constructor(public element: ElementRef) {
    this.el = element.nativeElement;
    this.clientWidth = this.el.clientWidth;
  }
  
  ngAfterContentChecked(): void{
    this.adjust();
  }
  
  adjust(): void {
    if (this.el.style.height === this.element.nativeElement.scrollHeight + 'px') {
      return;
    }
    this.el.style.overflow = 'hidden';
    this.el.style.height = 'auto';
    this.el.style.height = this.el.scrollHeight + 'px';
  }

}