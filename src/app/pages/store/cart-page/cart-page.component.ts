import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartUtil } from 'src/app/utils/cart.util';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  public cart = new Cart();
  constructor() { }

  ngOnInit() {
    this.loadCart();
  }
  loadCart(){
    this.cart = CartUtil.get();
  }
  remove(item){
    const index = this.cart.items.indexOf(item);
    this.cart.items.splice(index,1);
    CartUtil.update(this.cart);
    this.loadCart();
  }
  clear(){
    CartUtil.clear();
    this.loadCart();
  }
  total(){
    let total = 0;
    this.cart.items.forEach((item)=>{
      total += (item.price * item.quantity);
    });
    return total;
  }

}
