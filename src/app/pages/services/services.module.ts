import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';

// import { ConfusedAboutComponent } from './consultation-services/confused-about/confused-about.component';
import { CloudServicesComponent } from './cloud-services/cloud-services.component';

import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ConsultationServicesComponent } from './consultation-services/consultation-services.component';
import { DataAnalyticsComponent } from './data-analytics/data-analytics.component';
import { WebsiteDevelopmentComponent } from './website-development/website-development.component';
import { ConsultationServicesComponent } from './consultation-services/consultation-services.component';

@NgModule({
  declarations: [
    // ConfusedAboutComponent,
    CloudServicesComponent,
    ConsultationServicesComponent,
    DataAnalyticsComponent,
    WebsiteDevelopmentComponent,
    ConsultationServicesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesRoutingModule,
  ],
})
export class ServicesModule {}
