import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}

  agregarCategoria(category: Category): Promise<any> {
    return this.firestore.collection('categorias').add(category);
  }

  verCategorias(): Observable<any> {
    return this.firestore.collection('categorias').snapshotChanges();
  }

  verCategoria(id: string): Observable<any> {
    return this.firestore.collection('categorias').doc(id).snapshotChanges();
  }

  eliminarCategoria(id: string): Promise<any> {
    return this.firestore.collection('categorias').doc(id).delete();
  }

  actualizarCategoria(id: string, category: Category): Promise<any> {
    return this.firestore.collection('categorias').doc(id).update(category);
  }
}
