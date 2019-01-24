import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  @Input('cart') cart: ShoppingCart;
  shipping = {};
  private userId: string;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.pipe(take(1)).subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id]);
  }

}
