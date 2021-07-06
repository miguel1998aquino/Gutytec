import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  public product: Product[] = [];
  constructor() {}
  addCarrito(producto: Product) {
    this.product.push(producto);
  }

  resetearCarrito() {
    this.product = [];
  }
}
