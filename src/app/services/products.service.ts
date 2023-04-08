import { EventEmitter, Injectable, Output } from '@angular/core';
import { IProducts } from '../models/products';

import { productData } from '../data.ts/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http : HttpClient) { }

  getProductsFromDb() : Observable<IProducts[]>{
    return this._http.get<IProducts[]>('http://localhost:3001/products')
  }

  addNewItem(item : any){
    return this._http.post('http://localhost:3001/products' , item)
  }

  getProducts(){
    return productData;
  }
}
