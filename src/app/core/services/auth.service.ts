import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from '../models/user.inteface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  localStorage: any;
  rol!: string;
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  logear() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // var credentials = await this.auth.signInWithPopup(provider);
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  async AuthLogin(provider: any) {
    return await this.auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  async sendEmailVerificacion(): Promise<void> {
    return await (await this.auth.currentUser)?.sendEmailVerification();
  }

  async crearUser(email: string, password: string) {
    const result = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    this.sendEmailVerificacion();
    return result;
  }

  logout() {
    return this.auth.signOut();
  }

  userDatos(
    id: string,
    nombre: string,
    apellidos: string,
    direccion: string,
    telefono: number,
    DNI: number,
    image: string
  ) {
    const usuario: User = {
      nombre: nombre,
      apellidos: apellidos,
      direccion: direccion,
      telefono: telefono,
      DNI: DNI,
      rol: 'cliente',
      image: image,
    };
    console.log(usuario);
    this.firestore.doc(`users/${id}`).set(usuario);
  }

  hasUser() {
    return this.auth.authState;
  }

  guardarLocalStorage(data: User) {
    localStorage.setItem('usuario', JSON.stringify(data));
  }

  traerLocal() {
    if(localStorage.getItem('usuario') !== undefined){
    return JSON.parse(localStorage.getItem('usuario')!);
    }
  }

  roles(rol: string) {
    this.rol = rol;
    console.log(rol);
  }

  resetContrasena(email: string){
    return this.auth.sendPasswordResetEmail(email);
  }
}
