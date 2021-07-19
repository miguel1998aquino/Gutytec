import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-editar-home',
  templateUrl: './editar-home.component.html',
  styleUrls: ['./editar-home.component.css'],
})
export class EditarHomeComponent implements OnInit {
  public title: string;
  EditarHome: FormGroup;
  data:any

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarHomeComponent>,
    private homeService: HomeService,
    private toastr: ToastrService,
  ) {
    this.title = 'Editar Home';
    this.EditarHome = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      descripcion: ['', Validators.required],
      email: ['', Validators.required],
      facebook: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.EsEditar();
  }

  EsEditar() {
    this.homeService.verHome().subscribe((data) => {
      this.data=data;
      this.EditarHome.setValue({
        nombre: this.data.nombre,
        direccion: this.data.direccion,
        descripcion: this.data.descripcion,
        email: this.data.email,
        facebook: this.data.facebook,
      });
    })
  }

  Editar() {
    const home:any={
      nombre: this.EditarHome.value.nombre,
      direccion: this.EditarHome.value.direccion,
      descripcion: this.EditarHome.value.descripcion,
      email: this.EditarHome.value.email,
      facebook: this.EditarHome.value.facebook,
    }
    this.homeService.actualizarHome(home).then((data) => {
      this.dialogRef.close();
      this.toastr.info('Home actualizado','Editado');
    })
  }

  cancelar() {
    this.dialogRef.close();
  }
}
