import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category.interface';
import { Product } from 'src/app/core/models/product.interface';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-crear-crear-product',
  templateUrl: './crear-crear-product.component.html',
  styleUrls: ['./crear-crear-product.component.css'],
})
export class CrearCrearProductComponent implements OnInit {
  crearProducto: FormGroup;
  data:any
  image$!: Observable<any>;
  public title: string;
  category: Category[] = [];
  cargando: boolean;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrearCrearProductComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private storage: AngularFireStorage,
    private productoService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.cargando = false;
    this.title = 'Crear Producto';
    this.crearProducto = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock:['', Validators.required],
      image: [''],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.probarUser();
    this.EsEditar();
    this.traerCategorys();
  }

  agregaEditar() {
    if (this.crearProducto.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarProducto();
    } else {
      this.editarProducto(this.id);
    }
  }

  EsEditar() {
    if (this.id != null) {
      this.title = 'Editar Producto';
      this.productoService.verProduct(this.id).subscribe((data) => {
        this.data=data
        this.crearProducto.setValue({
          nombre: this.data.nombre,
          descripcion: this.data.descripcion,
          precio: this.data.precio,
          categoria: this.data.categoria,
          image:this.data.image,
          stock: this.data.stock,
        });
      });
    }
  }

  agregarProducto() {
    const producto: Product = {
      nombre: this.crearProducto.value.nombre,
      descripcion: this.crearProducto.value.descripcion,
      precio: this.crearProducto.value.precio,
      image: this.crearProducto.value.image,
      categoria: this.crearProducto.value.categoria,
      stock:this.crearProducto.value.stock,
    };

    this.productoService
      .agregarProducto(producto)
      .then(() => {
        this.toastr.success('Creado con exito!', 'Exito!');
        this.dialogRef.close();
      })
      .catch((err) => {
        this.toastr.error('Ups No se guardo','Error');
        this.dialogRef.close();
      });
  }
  editarProducto(id: string) {
    const producto: Product = {
      nombre: this.crearProducto.value.nombre,
      descripcion: this.crearProducto.value.descripcion,
      precio: this.crearProducto.value.precio,
      image: this.crearProducto.value.image,
      categoria: this.crearProducto.value.categoria,
      stock:this.crearProducto.value.stock,
    };
    this.productoService
      .actualizarProducto(id, producto)
      .then(() => {
        this.toastr.info('Producto editado','Editado')
        this.dialogRef.close();
      })
      .catch((err) => {
        this.toastr.error('Error no se Edito','error')
        this.dialogRef.close();
      });
  }

  traerCategorys() {
    this.categoryService.verCategorias().subscribe({
      next: (res) => {
        res.forEach((element: any) => {
          this.category.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  FotoEvento(e: any) {
    this.cargando = true;
    const id = Math.random().toString(36).substring(2)
    const file = e.target.files[0];
    const name = `upload/producto_${id}`;
    const fileRef = this.storage.ref(name);
    const tsk = this.storage.upload(name, file);

    tsk
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.cargando = false;
          this.image$.subscribe((url) => {
            this.crearProducto.get('image')?.setValue(url);
          });
        })
      )
      .subscribe();
  }

  cancelar() {
    this.dialogRef.close();
  }

  probarUser(){
    this.authService.hasUser().subscribe(res=>{
      console.log(res);
      console.log(res?.email)

    })
  }
}
