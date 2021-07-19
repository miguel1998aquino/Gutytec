import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/core/models/order.interface';
import { Product } from 'src/app/core/models/product.interface';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-detalle-order',
  templateUrl: './detalle-order.component.html',
  styleUrls: ['./detalle-order.component.css'],
})
export class DetalleOrderComponent implements OnInit {
  pedido!: Order;
  data!: any[];
  control=false;


  constructor(
    public dialogRef: MatDialogRef<DetalleOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public e: string,
    private order: OrderService,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    this.getOrder(this.e);

  }
  getOrder(id: string): void {
    this.order.verOrder(id).subscribe((data: any) => {

      const datos: Order = {
        cliente: data.cliente,
        email: data.email,
        precio: data.precio,
        productos: data.productos,
      };
      this.pedido = datos;
    });
  }
  traerProducto(){
    this.data= this.pedido.productos
    const ver:any[]=[];
    this.data.forEach((item: any) => {
      this.product.verProduct(item).subscribe((data: any) => {
        const datos:any={
          nombre:data.nombre,
          precio:data.precio,
        }
        ver.push(datos)
        this.data=ver;
        this.control=true;
        console.log(this.data)
      })
    })
  }
}
