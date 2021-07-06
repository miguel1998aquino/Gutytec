import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-list-ordenes',
  templateUrl: './list-ordenes.component.html',
  styleUrls: ['./list-ordenes.component.css']
})
export class ListOrdenesComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['cliente', 'precio', 'editar','eliminar'];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.orderService.verOrders().subscribe(result=>{
      console.log(result)
      this.dataSource=[];
      result.forEach((e:any)=>{
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
