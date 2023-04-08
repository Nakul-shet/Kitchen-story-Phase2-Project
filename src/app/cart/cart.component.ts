import { Component } from '@angular/core';
import { IProducts } from '../models/products';

import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor(private _router : Router){}

  items : any;
  total : number = 0;

  ngOnInit(){
    this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart') || '{}');
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
        id : item.product_id,
        price : item.product_price,
        image : item.product_img,
				product: item.product_name,
				quantity: item.product_quantity
			});
			this.total += item.product_price * item.product_quantity;
		}
  }

  isCartEmpty() : boolean{
    if(this.items.length === 0){
      return true
    }else{
      return false
    }
  }

  removeItem(productID : any){

    let cart: any = JSON.parse(localStorage.getItem('cart') || '{}');

    cart.splice(productID , 1);

		localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload()
  }

  increment(productID : any){

    // console.log(productID)

    let cart: any = JSON.parse(localStorage.getItem('cart') || '{}');

    JSON.parse(cart[productID]).product_quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    // window.location.reload()
  }

  decrement(productID : any){

    let cart: any = JSON.parse(localStorage.getItem('cart') || '{}');

    cart[productID].product_quantity -= 1;
    
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload()
  }

}
