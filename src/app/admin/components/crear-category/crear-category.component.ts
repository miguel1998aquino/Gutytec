import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.interface';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-category',
  templateUrl: './crear-category.component.html',
  styleUrls: ['./crear-category.component.css'],
})
export class CrearCategoryComponent implements OnInit {
  public title: string;
  crearCategoria: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceCategory: CategoryService,
    public dialogRef: MatDialogRef<CrearCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private toastr:ToastrService,
  ) {
    this.title = 'Crear Categoria';
    this.crearCategoria = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarEditar() {
    if (this.crearCategoria.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarCategoria();
    } else {
      this.editarCategoria(this.id);
    }
  }
  agregarCategoria() {
    if (this.crearCategoria.invalid) {
      return;
    }
    const categoria: Category = {
      nombre: this.crearCategoria.value.nombre,
      descripcion: this.crearCategoria.value.descripcion,
    };

    this.serviceCategory
      .agregarCategoria(categoria)
      .then(() => {
        this.toastr.success('Creado con exito','Exito')
        this.dialogRef.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  editarCategoria(id: string) {
    const categoria: Category = {
      nombre: this.crearCategoria.value.nombre,
      descripcion: this.crearCategoria.value.descripcion,
    };
    this.serviceCategory
      .actualizarCategoria(id, categoria)
      .then(() => {
        this.toastr.info('Actualizado con exito','Exito')
        this.dialogRef.close();
      })
      .catch(() => {
        this.toastr.error('Ocurrio un Error','Error')
        this.dialogRef.close();
      });
  }
  cancelar() {
    this.dialogRef.close();
  }
}
