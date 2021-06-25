import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsabhboardComponent } from './components/dsabhboard/dsabhboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { CrearCategoryComponent } from './components/crear-category/crear-category.component';
import { CrearCrearProductComponent } from './components/crear-crear-product/crear-crear-product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DsabhboardComponent,
    ListProductsComponent,
    ListUsersComponent,
    ListCategoryComponent,
    CrearCategoryComponent,
    CrearCrearProductComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,

  ],
})
export class AdminModule {}
