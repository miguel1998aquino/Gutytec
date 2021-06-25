import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import auth from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  // async logear(): Promise<any> {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   var credentials = await this.auth.signInWithPopup(provider);
  //   return credentials;

  // }
  // logear() {
  //   this.auth.signInWithPopup(new auth.auth.GoogleAuthProvider);
  // }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  crearUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  hasUser() {
    return this.auth.authState;
  }
}
