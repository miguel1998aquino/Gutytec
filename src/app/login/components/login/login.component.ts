import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private fb: FormBuilder
  ) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '270px',
      panelClass: 'custom',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  entrar() {
    if (this.login.valid) {
      const value = this.login.value;
      this.auth
        .login(value.email, value.password)
        .then(() => {
          this.router.navigate(['admin']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
