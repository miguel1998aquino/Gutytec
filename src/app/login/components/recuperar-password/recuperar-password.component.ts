import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css'],
})
export class RecuperarPasswordComponent implements OnInit {
  reset: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<RecuperarPasswordComponent>,
  ) {
    this.reset = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit(): void {}

  recuperar() {
    console.log(this.reset);
    this.auth.resetContrasena(this.reset.value.email).then(() => {
      this.toastr.success(
        'Se ha enviado un correo con las instrucciones para restablecer la contraseña',
        'Exito'
      );
      this.dialogRef.close();
    });
  }
}
