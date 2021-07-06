import { Component , OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { CrearCategoryComponent } from '../crear-category/crear-category.component';
import { CrearCrearProductComponent } from '../crear-crear-product/crear-crear-product.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dsabhboard',
  templateUrl: './dsabhboard.component.html',
  styleUrls: ['./dsabhboard.component.css']
})
export class DsabhboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Prductos', cols: 1, rows: 1 },
          { title: 'Categorias', cols: 1, rows: 1 },
          { title: 'Usuarios', cols: 1, rows: 1 },
          { title: 'Ordenes', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Productos', cols: 1, rows: 1 },
        { title: 'Categorias', cols: 1, rows: 1 },
        { title: 'Usuarios', cols: 1, rows: 2 },
        { title: 'Ordenes', cols: 1, rows: 2 }
      ];
    })
  );
  ngOnInit(): void {
  }
  constructor(private auth: AuthService, public dialog: MatDialog,private breakpointObserver: BreakpointObserver) {}

  createCategoria() {
    const dialogRef = this.dialog.open(CrearCategoryComponent, {
      width: '270px',
      panelClass:'custom'
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  createProdcuto() {
    const dialogRef = this.dialog.open(CrearCrearProductComponent, {
      height: '530px',
      width: '330px',
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }



  crear($value:any){
    if($value=="Categorias"){
      this.createCategoria()
    }else if($value == "Productos" ){
        this.createProdcuto()

    }else{
      console.log($value)
    }
  }
}
