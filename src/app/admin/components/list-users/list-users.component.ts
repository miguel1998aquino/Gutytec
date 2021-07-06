import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['nombre','DNI','editar','eliminar'];
  constructor(private userService:UsersService) { }

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
  edicion(e:any){}

  eliminar(e:any){}

}
