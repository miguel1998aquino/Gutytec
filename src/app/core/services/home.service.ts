import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private firestore: AngularFirestore) { }

  verHome() {
    return this.firestore.collection('tienda').doc('FeXsoEeGgDJE361TGste').valueChanges();
  }

  actualizarHome(data: any) {
    return this.firestore.collection('tienda').doc('FeXsoEeGgDJE361TGste').update(data)
  }
}
