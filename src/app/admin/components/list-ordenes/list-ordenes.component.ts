import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/core/services/order.service';
import { UsersService } from 'src/app/core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleOrdenComponent } from '../detalle-orden/detalle-orden.component';

@Component({
  selector: 'app-list-ordenes',
  templateUrl: './list-ordenes.component.html',
  styleUrls: ['./list-ordenes.component.css'],
})
export class ListOrdenesComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['cliente', 'precio', 'editar', 'eliminar','ver'];
  constructor(
    private orderService: OrderService,
    private usersService: UsersService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.verOrders().subscribe((result) => {
      this.dataSource = [];
      result.forEach((e: any) => {
        this.dataSource.push({
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        });
      });
      this.dataSource.forEach((e) => {
        this.usersService.getUser(e.cliente).subscribe(
          res=>{
            e.cliente = res.nombre
          }
        )
      });
    });
  }

  edicion(e: any) {}

  eliminar(e: any) {
    console.log(e.id)
    this.orderService.elimarOrder(e.id).then(res=>{
      this.toastr.info('La Orden se ah Eliminado','Eliminado')
    })
}

ver(e:any){
  const dialogRef = this.dialog.open(DetalleOrdenComponent, {
    height: '530px',
    width: '400px',
    panelClass:'custom',
    data: e,
  });
  dialogRef.afterClosed().subscribe((result) => {});
}
}
