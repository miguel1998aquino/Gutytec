import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario:any;

  constructor( private serviceAuth:AuthService) { }

  ngOnInit(): void {
    this.traerUser();
  }

  traerUser(){
    this.serviceAuth.hasUser().subscribe(res=>{
      const datos ={
        nombre:res?.displayName,
        image: res?.photoURL,
        email:res?.email
      }
      this.usuario=datos;

    })
  }

}
