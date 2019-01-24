import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: Date;
    items: any[];

    constructor(public userId: string, public shipping: any, public cart: ShoppingCart) {
        this.datePlaced = new Date();

        this.items = cart.items.map(item => {
            return {
              product: {
                title: item.title,
                price: item.price,
                imageUrl: item.imageUrl
              },
              quantity: item.quantity,
              totalPrice: item.totalPrice
            }
          });
    }
}