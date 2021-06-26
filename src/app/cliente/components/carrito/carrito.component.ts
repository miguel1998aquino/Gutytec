import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { Product } from 'src/app/core/models/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  Totalprecio!: number;
  CrearPedido: FormGroup;
  constructor(
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.CrearPedido = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      referencia: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.carrito();
  }

  carrito() {
    this.Productos = this.carritoService.product;
  }

  comprar(){
    if (this.CrearPedido.invalid) {
      return;
    }
    var suma = 0;
    this.Productos.forEach((item) => {
      this.addPedidos.push(item.id);
      suma += item.precio;
      this.Totalprecio = suma;
    });
    const carrito: any = {
      nombre: this.CrearPedido.value.nombre,
      apellido: this.CrearPedido.value.apellido,
      direccion: this.CrearPedido.value.direccion,
      referencia: this.CrearPedido.value.referencia,
      celular: this.CrearPedido.value.telefono,
      email: this.CrearPedido.value.email,
      precio: this.Totalprecio,
      producto: this.addPedidos,
    };
    this.carritoService.resetearCarrito();
    // guardar el pedido
  }
}
