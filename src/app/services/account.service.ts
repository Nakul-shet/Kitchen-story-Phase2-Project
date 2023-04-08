import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAccount } from '../models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn : boolean = false;

  accounts : IAccount[] = []
  account : any;

  constructor(private _http : HttpClient) { }

  createAccount(account : IAccount) : Observable<IAccount>{
    return this._http.post<IAccount>('http://localhost:3001/account' , account)
  }

  getAccounts() : Observable<IAccount[]>{
    return this._http.get<IAccount[]>('http://localhost:3001/account')
  }

  getAccountById(accountID : any){
    return this._http.get(`http://localhost:3001/account/${accountID}`)
  }

  loginn(username : string , password : string){

    this.getAccounts().subscribe((result) => {
      this.accounts = result
    })

    this.account = this.accounts.find((p) => p.username === username)

    if(this.account.username === username && this.account.password === password){
      sessionStorage.setItem("user" , username)
      sessionStorage.setItem('id' , this.account.id)
      this.loggedIn = true;
      return this.loggedIn
    }else{
      this.loggedIn = false;
      return this.loggedIn;
    }

  }

  logout(){
    this.loggedIn = false;
  }

  isLoggedIn(): boolean{
    return this.loggedIn;
  }

}
