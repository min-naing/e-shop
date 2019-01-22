import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private prodcutService: ProductService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {

    this.cart = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);

    this.prodcutService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) : this.products;
      });
  }

}
