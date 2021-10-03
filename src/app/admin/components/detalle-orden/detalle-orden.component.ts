import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.interface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css'],
})
export class DetalleOrdenComponent implements OnInit {
  datos: any[] = [];
  ids:[]=[];
  control:boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetalleOrdenComponent>,
    private productService: ProductService
  ) {
    this.ids = data.productos
    this.control=false;
  }

  ngOnInit(): void {
    this.traerProductos();
  }

  traerProductos() {
    var hola:any[]=[]
    this.ids.forEach((id) => {
    this.productService.verProduct(id).subscribe(
      (data:any) => {
        hola.push(data);
        this.datos=hola;
      },
      (error) => {
        console.log(error);
      }
    );
    });
  }

  verMas(){
    this.control=true;
    this.traerProductos();
  }
}
