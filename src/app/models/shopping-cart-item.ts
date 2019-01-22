import { Product } from './product';

export class ShoppingCartItem {

    id: string;
    title: string;
    category: string;
    price: number;
    imageUrl: string;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    // constructor(public product: Product, public quantity: number, public id: string) { }

    get totalPrice() {
        return this.price * this.quantity;
    }
}