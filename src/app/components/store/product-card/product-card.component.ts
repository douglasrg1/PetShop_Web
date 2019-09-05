import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartUtil } from 'src/app/utils/cart.util';
import { CartItem } from 'src/app/models/cart-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  constructor(
    private toast: ToastrService
  ) { }

  ngOnInit() {
  }
  addToCart(){
    const cartItem = new CartItem(this.product._id,this.product.title,1,this.product.price,this.product.images[0]);
    CartUtil.add(cartItem);
    this.toast.success(`${this.product.title} adicionado ao carrinho`,'Produto adicionado');
  }

}
