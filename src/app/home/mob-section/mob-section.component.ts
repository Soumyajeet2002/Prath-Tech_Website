import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-mob-section',
  templateUrl: './mob-section.component.html',
  styleUrl: './mob-section.component.scss',


  //   animations: [
  //   trigger('fadeInRight', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateX(-50px)' }),
  //       animate('1.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  //     ])
  //   ]),
  //   trigger('fadeInLeft', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateX(50px)' }),
  //       animate('1.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  //     ])
  //   ])
  // ]
})
export class MobSectionComponent { }