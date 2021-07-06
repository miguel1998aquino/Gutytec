import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  image$!: Observable<any>;
  cargando: boolean;
  crearUser: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private storage: AngularFireStorage,
  ) {
    this.cargando = false;
    this.crearUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tel: ['', [Validators.required, Validators.maxLength(9)]],
      DNI:['', [Validators.required, Validators.maxLength(8)]],
      direccion:['', Validators.required],
      image: ['',]
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.crearUser.valid) {
      const value = this.crearUser.value;
      this.authService.crearUser(value.email,value.password).then((res:any) => {
        console.log(res.user.uid)
        var id = res.user.uid
        this.router.navigate(['/login']);
        this.dialogRef.close();
        this.authService.userDatos(id,value.nombres,value.apellidos,value.direccion,value.tel,value.DNI,value.image)
      }).catch((error) => {console.log(error)});
    }else{
      this.toastr.info('Los campos no son validos o ya existen','Invalido')
    }
  }
  FotoEvento(e: any) {
    this.cargando = true;
    const id = this.crearUser.value.nombres;
    const file = e.target.files[0];
    const name = `upload/usuarios_${id}`;
    const fileRef = this.storage.ref(name);
    const tsk = this.storage.upload(name, file);

    tsk
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.cargando = false;
          this.image$.subscribe((url) => {
            this.crearUser.get('image')?.setValue(url);
          });
        })
      )
      .subscribe();
  }
}
