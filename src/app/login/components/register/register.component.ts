import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  crearUser: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.crearUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.crearUser.valid) {
      const value = this.crearUser.value;
      this.authService.crearUser(value.email, value.password).then(() => {
        this.router.navigate(['/login']);
        this.dialogRef.close();
      });
    }
  }
}
