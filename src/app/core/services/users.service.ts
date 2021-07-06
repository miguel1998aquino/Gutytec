import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  getUsuarios(): Observable<any> {
    return this.firestore.collection('users').snapshotChanges();
  }

  getUser(uid: string): Observable<any> {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }
}
