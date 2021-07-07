import { Component, DoCheck, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CarritoService } from '../core/services/carrito.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  botones:any;
  data:any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private router: Router,
    public carritoService: CarritoService,
    public authService: AuthService,
  ) {}


  ngOnInit(): void {
    this.ocultarBoton();

  }

  salir() {
    this.auth.logout().then(() => {
      this.router.navigate(['home']);
    });
    localStorage.clear();
  }

  ocultarBoton() {
    this.auth.hasUser().subscribe((result:any) => {
      this.botones=result
      this.roles()
    });
  }

  roles() {
    if(this.authService.traerLocal() != undefined){
      this.data=this.authService.traerLocal()
      this.authService.roles(this.data.rol)

    }
  }


}
