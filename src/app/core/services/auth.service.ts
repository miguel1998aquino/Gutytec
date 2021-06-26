import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  logear(){
    // const provider = new firebase.auth.GoogleAuthProvider();
    // var credentials = await this.auth.signInWithPopup(provider);
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  async AuthLogin(provider:any) {
    return await this.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }


  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  async sendEmailVerificacion():Promise<void> {
    return await (await this.auth.currentUser)?.sendEmailVerification();
  }

  async crearUser(email: string, password: string) {
    const result = await this.auth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerificacion();
    return result
  }

  logout() {
    return this.auth.signOut();
  }

  hasUser() {
    return this.auth.authState;
  }


}
