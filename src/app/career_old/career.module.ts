import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CareerRoutingModule } from './career-routing.module';
import { CareerComponent } from './career.component';
import { JobOpeningComponent } from './job-opening/job-opening.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';




// 



import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';




@NgModule({
  declarations: [
    CareerComponent,
    JobOpeningComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CareerComponent }])
  ]
})
export class CareerModule { }
