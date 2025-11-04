import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent, FooterComponent, RouterModule] // 👈 Important: Export!
})
export class SharedModule { }
