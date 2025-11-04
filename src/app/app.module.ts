import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './pages/products/products.component';
import { SakhyamComponent } from './pages/products/sakhyam/sakhyam.component';
import { DocumentMSystemComponent } from './pages/products/document-m-system/document-m-system.component';
import { PagesModule } from './pages/pages.module';
import { HomeModule } from './home/home.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LettersOnlyDirective } from './contact/letters-only.directive';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { TestCodeNewComponent } from './test-code-new/test-code-new.component';
// import { SwiperModule } from 'swiper/angular';
// import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ProductsComponent,
    // CarouselHolderComponent
    // TestCodeNewComponent,
  ],
  imports: [
    BrowserModule,
    // CarouselModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    CommonModule,
    // PerfectScrollbarModule
    // HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
