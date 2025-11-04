import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeRoutingModule } from '../home/home-routing.module';
import { HomeModule } from '../home/home.module';
import { AboutModule } from '../about/about.module';


const routes: Routes = [
  {path: '',loadChildren: () => import('../home/home.module').then(m => m.HomeModule)},
  {path: 'about',loadChildren: () => import('../about/about.module').then(m => m.AboutModule)},
  {path: 'contact',loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule)},

  {path: 'services',loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path: 'website-development',loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path : 'consultation-services',loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path : 'data-analytics',loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},
  {path: 'cloud-services',loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)},

  {path: 'products',loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsModule)},
  {path :'sakhyam',loadChildren: () => import('../pages/products/products.module').then(m => m.ProductsModule)},
  {path: 'document-m-system',loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},

  // {path: 'products',loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)},
  {path: '',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
