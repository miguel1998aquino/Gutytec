import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services/users.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.inteface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.css'],
})
export class EditPerfilComponent implements OnInit {
  editarPerfil: FormGroup;
  title: string;
  data: any;
  image$!: Observable<any>;
  cargando: boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public id: string,
    public dialogRef: MatDialogRef<EditPerfilComponent>,
    private userService: UsersService,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {
    this.cargando = false;
    this.title = 'editar perfil';
    this.editarPerfil = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      DNI: ['', [Validators.required, Validators.maxLength(9)]],
      tel: ['', Validators.required],
      Direccion: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.EsEditar();
  }

  EsEditar() {
    if (this.id != null) {
      this.userService.getUser(this.id).subscribe((data) => {
        this.data = data;
        this.editarPerfil.setValue({
          nombre: this.data.nombre,
          apellido: this.data.apellidos,
          DNI: this.data.DNI,
          tel: this.data.telefono,
          Direccion: this.data.direccion,
          image: this.data.image,
        });
      });
    }
  }

  edicionPerfil() {
    const usuario: User = {
      nombre: this.editarPerfil.value.nombre,
      apellidos: this.editarPerfil.value.apellido,
      DNI: this.editarPerfil.value.DNI,
      telefono: this.editarPerfil.value.tel,
      direccion: this.editarPerfil.value.Direccion,
      image: this.editarPerfil.value.image,
    };
    console.log(usuario)
    this.userService
      .actualizarUsur(this.id, usuario)
      .then(() => {
        this.toastr.info('Actualizado con exito', 'exito');
        this.dialogRef.close();
      })
      .catch((err) => {
        this.toastr.error('Ups No se Actualizo', 'Error');
        this.dialogRef.close();
      });
  }

  FotoEvento(e: any) {
    this.cargando = true;
    const id = this.editarPerfil.value.nombres;
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
            this.editarPerfil.get('image')?.setValue(url);
          });
        })
      )
      .subscribe();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
