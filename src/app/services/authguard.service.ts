import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private _router : Router) { }

  canActivate(){
    if(sessionStorage.getItem('user')){
      return true;
    }
    this._router.navigate([''])
    return false
  }
}
