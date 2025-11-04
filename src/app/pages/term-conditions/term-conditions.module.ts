import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermConditionsRoutingModule } from './term-conditions-routing.module';
import { TermConditionsComponent } from './term-conditions.component';

@NgModule({
  declarations: [TermConditionsComponent],
  imports: [CommonModule, TermConditionsRoutingModule],
})
export class TermConditionsModule {}
