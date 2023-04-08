import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { IProducts } from '../models/products';

import {Router} from "@angular/router"
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foodItems : any[] = []
  searchItem : any = "";
  searchResult : any[] = []
  noneMessage : any = "";

  constructor(private _router : Router , private _productService : ProductsService){}

  ngOnInit(){

    this._productService.getProductsFromDb().subscribe((result) => {
      this.foodItems = result
    })
  }

  handleSearch(){
    this.noneMessage = ""
    this.searchResult = []
    if(this.searchItem != ""){
      
      this.foodItems.map((item) => {
        if(item.product_name.includes(this.searchItem)){
          this.searchResult.push(item)
        } 
      })
    }else{
      this.noneMessage = "Please enter the food name"
      return
    }

    if(this.searchResult.length === 0){
      this.noneMessage = "Sorry , Your Search is Unavailable"
    }
  }

  logout(){
    alert("Are you sure you want to logout?")
    sessionStorage.removeItem("user");
    this._router.navigate(['/landing'])
    
  }

  deleteAccount(){
    alert("Are you sure you want to delete the Account?")
    sessionStorage.removeItem("user");

    localStorage.removeItem("user");
    localStorage.removeItem("password")

    this._router.navigate(['/landing'])
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

    this.searchResult.map((pro) => {
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


}
