import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleUserComponent } from '../detalle-user/detalle-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['nombre','DNI','Ver'];
  constructor(private userService:UsersService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsuarios().subscribe(users =>{
      this.dataSource=[];
      users.forEach((e:any)=>{
        this.dataSource.push({
          id:e.payload.doc.id,
          ...e.payload.doc.data(),
        })
      })
    })
  }
  ver(e:string){
    const dialogRef = this.dialog.open(DetalleUserComponent, {
      height: '540px',
      width: '400px',
      panelClass:'custom',
      data: e,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

}
