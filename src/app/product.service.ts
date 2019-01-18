import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productCollection: AngularFirestoreCollection<Product>;

  constructor(private afs: AngularFirestore) {
    this.productCollection = afs.collection<Product>('products');
  }

  create(product) {
    this.productCollection.add(product);
  }

  getAll(): Observable<Product[]> {
    return this.productCollection.snapshotChanges()
      .pipe(
        map(products => products.map(product => {
          const id = product.payload.doc.id;
          const data = product.payload.doc.data();
           
          return { id, ...data };
        }))
      );
  }

  get(productId: string): Observable<Product> {
    return this.productCollection.doc<Product>(productId).valueChanges();
  }

  update(productId: string, product: Product) {
    this.productCollection.doc<Product>(productId).update(product);
  }

  delete(productId) {
    this.productCollection.doc(productId).delete();
  }
}
