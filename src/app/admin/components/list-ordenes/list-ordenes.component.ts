import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { OrderService } from 'src/app/core/services/order.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-list-ordenes',
  templateUrl: './list-ordenes.component.html',
  styleUrls: ['./list-ordenes.component.css'],
})
export class ListOrdenesComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['cliente', 'precio', 'editar', 'eliminar'];
  constructor(
    private orderService: OrderService,
    private usersService: UsersService,
    private toastr: ToastrService
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
}
