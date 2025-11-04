import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { SakhyamComponent } from './sakhyam/sakhyam.component';
import{ DocumentMSystemComponent } from './document-m-system/document-m-system.component';

const routes: Routes = [
  {path: '',component:ProductsComponent},
  {path:'sakhyam',component:SakhyamComponent},
  {path : 'document-m-system',component:DocumentMSystemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
