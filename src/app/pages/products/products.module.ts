import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SakhyamComponent } from './sakhyam/sakhyam.component';
import { DocumentMSystemComponent } from './document-m-system/document-m-system.component';



@NgModule({
  declarations: [SakhyamComponent,DocumentMSystemComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    
  ]
  
})
export class ProductsModule { }
