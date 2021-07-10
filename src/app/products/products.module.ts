import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from '../material/material.module';
import { DetalleProductComponent } from './components/detalle-product/detalle-product.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    ProductComponent,
    DetalleProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FormsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule { }
