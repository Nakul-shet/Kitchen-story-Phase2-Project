import { Component } from '@angular/core';
import { IProducts } from '../models/products';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private _productService : ProductsService){}

  products : IProducts[] = [];

  ngOnInit(){
  //  this.products = this._productService.getProducts()
    this._productService.getProductsFromDb().subscribe((result) => {
      this.products = result;
      console.log(this.products)
    })
   console.log(this.products)
  }

  viewDetails(product : IProducts){
      alert(JSON.stringify(product))
  }

  isAdmin() : boolean{
    if(sessionStorage.getItem("user") === "admin"){
      return true;
    }else{
      return false;
    }
  }

  addToCart(product : IProducts){

    let itemToAdd ={
        product_id: product.product_id,
        product_name: product.product_name,
        product_img: product.product_img,
        product_price: product.product_price,
        product_details: product.product_details,
        product_quantity: 1
    }

    this.products.map((pro) => {
      if(pro.product_id === product.product_id){
        pro.product_quantity -= 1;
        pro.product_added = true
      }
    })

    if (localStorage.getItem('cart') == null) {
      let cart: any = [];
      cart.push(JSON.stringify(itemToAdd));
      localStorage.setItem('cart', JSON.stringify(cart));
    }else {
      let cart: any = JSON.parse(localStorage.getItem('cart') || '{}');
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let cartitem = JSON.parse(cart[i]);
        if (cartitem.product_id == itemToAdd.product_id) {
          index = i;
          break;
        }
      }
      if (index == -1) {
        cart.push(JSON.stringify(itemToAdd));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let item = JSON.parse(cart[index]);
        item.product_quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }

    alert("Added to the Cart")

  }

  // handleStyleChange(){

  // }

}
