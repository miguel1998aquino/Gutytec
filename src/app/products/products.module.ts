import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from '../material/material.module';
import { DetalleProductComponent } from './components/detalle-product/detalle-product.component';



@NgModule({
  declarations: [
    ProductComponent,
    DetalleProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule
  ]
})
export class ProductsModule { }
