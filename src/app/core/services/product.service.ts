import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }


  agregarProducto(product:Product): Promise<any>{
    return this.firestore.collection('productos').add(product)

  }

  verProducts():Observable<any>{
    return this.firestore.collection('productos').snapshotChanges();
  }

  categorias(id:string):Observable<any>{
    return this.firestore.collection('categorias').doc(id).snapshotChanges();
  }

  verProduct(id:string):Observable<any>{
    return this.firestore.collection('productos').doc(id).snapshotChanges();
  }

  eliminarProducto(id:string):Promise<any>{
    return this.firestore.collection('productos').doc(id).delete();
  }

  actualizarProducto(id:string,producto:Product): Promise<any>{
    return this.firestore.collection('productos').doc(id).update(producto)
  }
}
