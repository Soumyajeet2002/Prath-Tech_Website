import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberonly]',
})
export class NumberonlyDirective {
  @HostListener('input', ['$event'])
  onInput(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }
}
