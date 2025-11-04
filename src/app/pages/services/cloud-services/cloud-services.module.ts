import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudServicesRoutingModule } from './cloud-services-routing.module';
import { CloudServicesComponent } from './cloud-services.component';


@NgModule({
  declarations: [
    CloudServicesComponent
  ],
  imports: [
    CommonModule,
    CloudServicesRoutingModule
  ]
})
export class CloudServicesModule { }
