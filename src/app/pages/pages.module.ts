import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [ServicesComponent],
  imports: [CommonModule, PagesRoutingModule, ReactiveFormsModule],
})
export class PagesModule {}
