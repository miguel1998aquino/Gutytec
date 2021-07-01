import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { Product } from 'src/app/core/models/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Order } from 'src/app/core/models/order.interface';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { element } from 'protractor';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CarritoComponent implements OnInit {
  public Productos: Product[] = [];
  public addPedidos: any[] = [];
  public usuario: any;
  Totalprecio!: number;
  stock:any;
  constructor(
    private carritoService: CarritoService,
    private orders: OrderService,
    private toastr: ToastrService,
    private ServiceAuth: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.carrito();
    this.traerUser();

  }

  traerUser() {
    this.ServiceAuth.hasUser().subscribe((res) => {
      console.log(res?.email);
      const auth = {
        cliente: res?.uid,
        email: res?.email,
      };
      this.usuario = auth;
    });
  }

  carrito() {
    this.Productos = this.carritoService.product;
  }

  comprar() {
    var suma = 0;
    this.Productos.forEach((item) => {
      this.addPedidos.push(item.id);
      suma += item.precio;
      this.Totalprecio = suma;
    });
    const pedidos: Order = {
      cliente: this.usuario.cliente,
      email: this.usuario.email,
      precio: this.Totalprecio,
      productos: this.addPedidos,
    };
    this.orders
      .agregarOrder(pedidos)
      .then((res) => {
        this.toastr.success('Agregado al carrito', 'Exito');

      })
      .catch((err) => {
        console.log(err);
      });

    // guardar el pedido
    this.carritoService.resetearCarrito();
  }



}
