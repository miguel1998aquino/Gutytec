import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MyOrderComponent } from './components/my-order/my-order.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ClienteRoutingModule } from './cliente-routing.module';



@NgModule({
  declarations: [
    CarritoComponent,
    MyOrderComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ClienteRoutingModule,
  ]
})
export class ClienteModule { }
