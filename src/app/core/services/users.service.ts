import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.inteface';

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

  actualizarUsur(id: string, user: User) {
    return this.firestore.collection('users').doc(id).update(user);
  }
}
