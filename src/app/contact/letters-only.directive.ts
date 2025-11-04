import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appLettersOnly]',
  standalone: true,
})
export class LettersOnlyDirective {
  @HostListener('input', ['$event'])
  onInput(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
  }
}
