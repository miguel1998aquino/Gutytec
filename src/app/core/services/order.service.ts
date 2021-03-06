import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  agregarOrder(order: Order): Promise<any> {
    return this.firestore.collection('order').add(order);
  }
  verOrders(): Observable<any> {
    return this.firestore.collection('order').snapshotChanges();
  }

  verMyOrders(uid: string): Observable<any> {
    return this.firestore
      .collection('order', (ref) => ref.where('cliente', '==', uid))
      .snapshotChanges();
  }
  elimarOrder(id: string): Promise<any> {
    return this.firestore.collection('order').doc(id).delete();
  }

  actualizarOrder(id: string, order: Order): Promise<any> {
    return this.firestore.collection('order').doc(id).update(order);
  }

  verOrder(id: string){
    return this.firestore.collection('order').doc(id).valueChanges();
  }
}
