import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';
import { CrearCrearProductComponent } from '../crear-crear-product/crear-crear-product.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['nombre', 'stock', 'editar', 'eliminar'];
  constructor(
    public dialog: MatDialog,
    private productoService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.verProducts().subscribe({
      next: (res) => {
        this.dataSource = [];
        res.forEach((element: any) => {
          // this.productService.categorias()
          this.dataSource.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        });
      },
    });
  }
  edicion(e: any) {
    const dialogRef = this.dialog.open(CrearCrearProductComponent, {
      height: '530px',
      width: '400px',
      data: e.id,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  eliminar(e: any) {
    this.productoService
      .eliminarProducto(e.id)
      .then((res) => {
        this.toastr.warning('Se elimino con exito', 'Eliminado');
      })
      .catch((err) => {
        this.toastr.error('Ocurrio un error', 'Error');
      });
  }
}
