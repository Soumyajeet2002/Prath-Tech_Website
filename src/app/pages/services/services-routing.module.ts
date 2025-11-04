import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';

import { ConsultationServicesComponent } from './consultation-services/consultation-services.component';
import { WebsiteDevelopmentComponent } from './website-development/website-development.component';
import { DataAnalyticsComponent } from '../services/data-analytics/data-analytics.component';
import { CloudServicesComponent } from './cloud-services/cloud-services.component';

const routes: Routes = [
  {path: '' ,component:ServicesComponent},
  {path: 'website-development',component:WebsiteDevelopmentComponent},
  {path:'consultation-services',component:ConsultationServicesComponent},
  {path: 'data-analytics',component:DataAnalyticsComponent},
  {path: 'cloud-services',component:CloudServicesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
