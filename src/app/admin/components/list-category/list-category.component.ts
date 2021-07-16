import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/services/category.service';
import { CrearCategoryComponent } from '../crear-category/crear-category.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['nombre', 'editar', 'eliminar'];
  constructor(
    private categoriaService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoriaService.verCategorias().subscribe({
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
    const dialogRef = this.dialog.open(CrearCategoryComponent, {
      width: '270px',
      panelClass:'custom',
      data: e.id,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  eliminar(e: any) {
    this.categoriaService
      .eliminarCategoria(e.id)
      .then(() => {
        this.toastr.warning('Se elimino con exito', 'Eliminado');
      })
      .catch(() => {
        this.toastr.error('Ocurrio un error', 'Error');
      });
  }
}
