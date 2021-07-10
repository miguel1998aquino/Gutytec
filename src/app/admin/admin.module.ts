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
import { ListOrdenesComponent } from './components/list-ordenes/list-ordenes.component';
import { DetalleUserComponent } from './components/detalle-user/detalle-user.component';

@NgModule({
  declarations: [
    DsabhboardComponent,
    ListProductsComponent,
    ListUsersComponent,
    ListCategoryComponent,
    CrearCategoryComponent,
    CrearCrearProductComponent,
    ListOrdenesComponent,
    DetalleUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,

  ],
})
export class AdminModule {}
