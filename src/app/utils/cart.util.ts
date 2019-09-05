import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

export class CartUtil{
    constructor(){}

    public static get(): Cart{
        const data = localStorage.getItem('petshop.cart');

        if(!data)
            return new Cart();

        return JSON.parse(data);

    }
    public static add(data: CartItem){

        let cart = this.get();
        console.log(cart);

        cart.items.push(data);

        localStorage.setItem('petshop.cart',JSON.stringify(cart));
    }
    public static update(cart: Cart){

        localStorage.setItem('petshop.cart',JSON.stringify(cart));
    }
    public static clear(){

        localStorage.removeItem('petshop.cart');
    }
}