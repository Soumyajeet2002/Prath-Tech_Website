import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import HomeComponent from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { ServiceSectionComponent } from './service-section/service-section.component';
import { OndemandSectionComponent } from './ondemand-section/ondemand-section.component';
import { ProductsPlatformsComponent } from './products-platforms/products-platforms.component';
import { ChooseUsComponent } from './choose-us/choose-us.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MobSectionComponent } from './mob-section/mob-section.component';
import { IndustrySectionComponent } from './industry-section/industry-section.component';
import { ReadySectionComponent } from './ready-section/ready-section.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SwiperModule } from 'swiper/angular';
import { register } from 'swiper/element/bundle';
import { LettersOnlyDirective } from './ready-section/letters-only.directive';
import { NumberonlyDirective } from './ready-section/numberonly.directive';

register();
@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ServiceSectionComponent,
    OndemandSectionComponent,
    ProductsPlatformsComponent,
    ChooseUsComponent,
    MobSectionComponent,
    IndustrySectionComponent,
    ReadySectionComponent,
    LettersOnlyDirective,
    NumberonlyDirective,
  ],
  imports: [
    CommonModule,
    // SwiperModule,
    CarouselModule,
    SharedModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ],
})
export class HomeModule { }
