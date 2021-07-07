import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['email', 'precio','crear'];
  constructor( private oderService:OrderService,private authService:AuthService) { }

  ngOnInit(): void {
    this.traerUid()
  }

  traerUid(){
    this.authService.hasUser().subscribe((res:any)=>{
      var id = res.uid
      console.log(id)
      this.myOrder(id);
    })
  }

  myOrder(uid:string){
    this.oderService.verMyOrders(uid).subscribe((res)=>{
      this.dataSource=[];
      res.forEach((element: any) => {
        this.dataSource.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      })
  })
}

  edicion(e: any) {}

  eliminar(e: any) {}

}
