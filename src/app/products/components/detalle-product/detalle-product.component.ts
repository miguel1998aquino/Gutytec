import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product.interface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-detalle-product',
  templateUrl: './detalle-product.component.html',
  styleUrls: ['./detalle-product.component.css']
})
export class DetalleProductComponent implements OnInit {

  public product!: Product;


  constructor(
    public dialogRef:MatDialogRef<DetalleProductComponent>,
    @Inject(MAT_DIALOG_DATA) public id:string,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.productService.verProduct(this.id).subscribe({
      next: (data:any) => {
        const datos={
          id: data.payload.id,
          ...data.payload.data()
        }
        this.product=datos;
        this.productService.categorias(this.product.categoria).subscribe(
          category => {
            console.log(category.payload.data().nombre);
            this.product.categoria=category.payload.data().nombre
          })
      }
    })
  }
  cancel(){
    this.dialogRef.close()
  }
}
