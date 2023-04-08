import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  constructor(private _http : HttpClient , private productService : ProductsService , private _router : Router){}

  addFoodProduct : any = {
    name : "",
    image : "",
    price : 0,
    quantity : 0,
    details : "",
    customID : ""
  }

  handleSubmit(){

    this.productService.addNewItem({
      "product_id" : this.addFoodProduct.customID,
      "product_name" : (this.addFoodProduct.name).toLowerCase(),
      "product_img" : this.addFoodProduct.image,
      "product_price" : this.addFoodProduct.price,
      "product_details" : this.addFoodProduct.details,
      "product_quantity" : this.addFoodProduct.quantity,
      "product_added" : false
    }).subscribe((result) => {
      console.log(result)
    })

    alert("New item Added")

    this._router.navigate(['/products'])
  }

}
