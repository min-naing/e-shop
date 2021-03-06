import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem } ) {
        this.itemsMap = itemsMap || {};

        for(let index in itemsMap) {
            const item = itemsMap[index] as any;
            this.items.push(new ShoppingCartItem({ 
                id: item.payload.doc.id,
                ...item.payload.doc.data()
            }));
        }
    }

    getQuantity(product: Product) {
        let qty = 0;
        this.items.forEach(item => {
            if(item.id === product.id) {
                qty = item.quantity;
                return qty;
            }
        });
        return qty;
    }

    get totalItemsCount() {
        let count = 0;
        this.items.forEach(item => {
            count += item.quantity;
        });
        return count;
    }

    get totalPrice() {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.totalPrice;
        });
        return totalPrice;
    }
}