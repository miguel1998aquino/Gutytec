import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { map, tap } from 'rxjs/operators';
import { UsersService } from './core/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ClienteGuard implements CanActivate {
  uid: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
    private toastr: ToastrService,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.VerRol(route);
  }

  VerRol(route: ActivatedRouteSnapshot): boolean {
    const { rol = []} = this.authService.traerLocal();
    console.log(rol.includes(route.data.role))

    if (rol.includes(route.data.role)){
      return true;
    }else{
      this.toastr.info(`se requiere tener el rol ${route.data.role} para ingresar`,'No autorizado')
      this.router.navigate(['product'])
      return false;
    }
  }
}
