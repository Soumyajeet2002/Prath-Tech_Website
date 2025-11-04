import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloudServicesComponent } from './cloud-services.component';


const routes: Routes = [
  {path:"",component:CloudServicesComponent}
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudServicesRoutingModule { }
