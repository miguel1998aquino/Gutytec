import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { Product } from 'src/app/core/models/product.interface';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { ProductService } from 'src/app/core/services/product.service';
import { DetalleProductComponent } from '../detalle-product/detalle-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {



  productos: Product[] = [];
  value="Buscador";
  datos:any[] = [];

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private carritoService: CarritoService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.traerProductos();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);
  }

  traerProductos() {
    this.productService.verProducts().subscribe((res:any) => {
      res.forEach((element: any) => {
        // this.productService.categorias()
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });

      console.log(this.productos);
    });
  }

  detalle(id: any) {
    const dialogRef = this.dialog.open(DetalleProductComponent, {
      height: '530px',
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  Comprar(producto: Product) {
    this.carritoService.addCarrito(producto);
  }
  buscador() {
    if (this.value){
      console.log(this.value);
      this.productService.BuscarNombre(this.value).subscribe((data:any) =>{
        data.forEach((element: any) => {
          this.datos=[];
          this.datos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        });
        this.productos=this.datos;
        console.log(this.datos)
      })
    }else{
      return;
    }
  }
}
