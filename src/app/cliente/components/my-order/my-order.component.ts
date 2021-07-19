import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleOrderComponent } from '../detalle-order/detalle-order.component';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['email', 'precio','crear'];
  constructor( private oderService:OrderService,private authService:AuthService,public dialog: MatDialog,) { }

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
        });
      })
  })
}

  ver(e: any) {
    const dialogRef = this.dialog.open(DetalleOrderComponent, {
      height: '530px',
      width: '400px',
      data: e,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  eliminar(e: any) {}

}
