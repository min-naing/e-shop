import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from './models/category';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(afs: AngularFirestore) {
    this.categoriesCollection = afs.collection<Category>('categories', ref => ref.orderBy('name', 'asc'));
  }

  getAll(): Observable<Category[]> {
    return this.categoriesCollection.snapshotChanges().pipe(
      map(categories => categories.map(category => {
        const data = category.payload.doc.data();
        const id = category.payload.doc.id;
        return { id, ...data };
      })
      )
    );
  }
}
