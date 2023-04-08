import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

cartLength : any;

accountName : any = "";

constructor(private _router : Router){
  this.isLogin()
  this.getAccountName()
  this.getCartItemsLength()
  // window.location.reload()
}


isLogin() : boolean{
  if(sessionStorage.getItem("user") != null){
    return true
  }else{
    return false
  }
}


isAdmin() : boolean{
  if(sessionStorage.getItem("user") === "admin"){
    return true;
  }else{
    return false;
  }
}

getUserName() : boolean{
  if(sessionStorage.getItem("user") === "admin"){
    return true
  }else{
    return false
  }
}

logout(){
  alert("Are you sure you want to logout?")
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("id");
  this._router.navigate(['/landing'])
  
}

getAccountName() : any{
  this.accountName = sessionStorage.getItem("user")
}

getCartItemsLength(){
  let cart = JSON.parse(localStorage.getItem('cart') || '{}');
  this.cartLength = cart.length;
}

}
