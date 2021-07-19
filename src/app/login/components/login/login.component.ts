import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';
import { RecuperarPasswordComponent } from '../recuperar-password/recuperar-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  login: FormGroup;
  constructor(
    public Af: AngularFireAuth,
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UsersService
  ) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '300px',
      panelClass: 'custom',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  entrar() {
    if (this.login.valid) {
      const value = this.login.value;
      this.auth
        .login(value.email, value.password)
        .then((result: any) => {
          var id = result.user?.uid;
          this.localStorage(id);
          this.router.navigate(['home']);
        })
        .catch((error) => {
          this.toastr.error('Tus Datos Ingresado no son validos', 'Invalido');
        });
    }
  }

  localStorage(uid: string) {
    this.userService.getUser(uid).subscribe((res) => {
      this.auth.roles(res.rol);
      this.auth.guardarLocalStorage(res);
    });
  }
  reset() {
    const dialogRef = this.dialog.open(RecuperarPasswordComponent, {
      width: '300px',
      panelClass: 'custom',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
