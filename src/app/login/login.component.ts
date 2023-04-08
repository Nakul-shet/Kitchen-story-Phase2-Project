import { Component } from '@angular/core';

import { AccountService } from '../services/account.service';

import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _accountService : AccountService , private _router : Router){
    if(this._accountService.isLoggedIn()){
      this._router.navigate(['/dashboard'])
    }
  }

  userObj : any = {
    username : "",
    password : ""
  }

  login(){
    if(this.userObj.username != "" && this.userObj.password != ""){
      
      if(this._accountService.loginn(this.userObj.username , this.userObj.password)){
        this._router.navigate(['/home'])
      }else{
        alert("Plase Register Yourself")
        this.userObj.username = ""
        this.userObj.password = ''
      } 
    }else{
      alert("invalid Credentials")
    }
  }

}
