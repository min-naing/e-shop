import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  ordersCollection: AngularFirestoreCollection<any>;

  constructor(afs: AngularFirestore, private cartService: ShoppingCartService) {
    this.ordersCollection = afs.collection('orders');
  }

  async placeOrder(order: Order) {
    const orderObj = {
      userId: order.userId,
      datePlaced: order.datePlaced,
      shipping: order.shipping,
      items: order.items
    };
    let result = await this.ordersCollection.add(orderObj);
    this.cartService.clearCart();
    return result;
  }
}
