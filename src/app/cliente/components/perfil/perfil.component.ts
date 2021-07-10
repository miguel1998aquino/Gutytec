import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.inteface';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  Usuario!: User;

  constructor(
    private serviceAuth: AuthService,
    private userService: UsersService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.traerUid();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);
  }

  traerUid() {
    this.serviceAuth.hasUser().subscribe((res: any) => {
      var id = res?.uid;
      this.traerUser(id);
    });
  }

  traerUser(uid: string) {
    this.userService.getUser(uid).subscribe((res: any) => {
      this.Usuario = res;
      console.log(this.Usuario);
    });
  }
}
