import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.inteface';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { EditPerfilComponent } from '../edit-perfil/edit-perfil.component';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  Usuario!: User;
  uid: any;

  constructor(
    private serviceAuth: AuthService,
    private userService: UsersService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
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
      this.uid=id;
      this.traerUser(id);
    });
  }

  traerUser(uid: string) {
    this.userService.getUser(uid).subscribe((res: any) => {
      this.Usuario = res;
      console.log(this.Usuario);
    });
  }

  ver() {
    console.log(this.uid);
    const dialogRef = this.dialog.open(EditPerfilComponent, {
      height: '530px',
      width: '330px',
      data: this.uid,
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
