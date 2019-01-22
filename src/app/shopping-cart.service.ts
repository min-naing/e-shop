import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartCollection: AngularFirestoreCollection<any>;

  constructor(afs: AngularFirestore) {
    this.cartCollection = afs.collection('shoppingCarts');
  }

  private create() {
    return this.cartCollection.add({
      updatedAt: new Date()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.getItemsCollection(cartId).snapshotChanges()
              .pipe(
                map(x => new ShoppingCart(x as any) )
              );
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if( !cartId ) {
      let result = await this.create();
      localStorage.setItem('cartId', result.id);
      return result.id;
    } 
    else 
      return cartId; 
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItemDoc(cartId, product.id).valueChanges();
    item$.pipe(
      take(1)
    )
    .subscribe( (item: any) => {
      if( item ) {
        const qty = item.quantity + change;
        if( qty === 0 ) 
          this.getItemDoc(cartId, product.id).delete();
        else 
          this.getItemDoc(cartId, product.id).update({ quantity: qty });
      }
      else
        this.getItemDoc(cartId, product.id).set({
          title: product.title,
          category: product.category,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1
        });
    });
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.getItemsCollection(cartId).snapshotChanges()
      .pipe(take(1))
      .subscribe(items => {
        items.forEach(item => {
          this.getItemDoc(cartId, item.payload.doc.id).delete();
        });
      });
  }

  private getItemsCollection(cartId) {
    return this.cartCollection.doc(cartId).collection('items');
  }

  private getItemDoc(cartId: string, productId: string) {
    return this.cartCollection.doc(cartId).collection('items').doc(productId);
  }

}
