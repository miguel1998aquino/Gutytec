import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }


  agregarProducto(product:Product){
    return this.firestore.collection('productos').add(product)

  }

  verProducts(){
    return this.firestore.collection('productos').snapshotChanges();
  }

  categorias(id:string){
    return this.firestore.collection('categorias').doc(id).valueChanges();
  }

  verProduct(id:string) {
    return this.firestore.collection('productos').doc(id).valueChanges();
  }

  BuscarNombre(nombre:string){
    return this.firestore.collection('productos',ref=> ref.where('nombre','==',nombre)).snapshotChanges()
  }

  eliminarProducto(id:string){
    return this.firestore.collection('productos').doc(id).delete();
  }

  actualizarProducto(id:string,producto:Product){
    return this.firestore.collection('productos').doc(id).update(producto)
  }

  actualizarStock(id:string,Astock:number){
    return this.firestore.collection('productos').doc(id).update({stock:Astock})
  }

}
