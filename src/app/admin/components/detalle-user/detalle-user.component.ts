import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.inteface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-detalle-user',
  templateUrl: './detalle-user.component.html',
  styleUrls: ['./detalle-user.component.css'],
})
export class DetalleUserComponent implements OnInit {
  user!: User;
  constructor(
    public dialogRef: MatDialogRef<DetalleUserComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios(){
    this.userService.getUser(this.id).subscribe(
      res=>{
        this.user=res;
      }
    )
  }
}
