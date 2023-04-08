import { Component } from '@angular/core';

import {FormGroup , FormBuilder , Validators} from "@angular/forms"
import { AccountService } from '../services/account.service';

import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm : FormGroup;
  submitted : boolean = false;

  registrationObj : any = {
    name : '',
    username : '',
    email : '',
    phone : '',
    profession : '',
    password : '',
    confirmPassword : ''
  }

  constructor(private _accountService : AccountService ,private _formbuilder : FormBuilder , private _router : Router){
    this.registerForm = this._formbuilder.group({
      name : ["" , Validators.required],
      username : ['' , Validators.required],
      email : ['' , Validators.required , Validators.email],
      phone : ['' , Validators.required , Validators.minLength(10) , Validators.maxLength(12)],
      profession : ['' , Validators.required],
      password : ['' , Validators.required , Validators.minLength(6)],
      confirmPassword : ['' , Validators.required]
    })
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit() : void{
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }

    this._accountService.createAccount(
      {"name" : this.registrationObj.name,
       "username" : this.registrationObj.username,
       "email" : this.registrationObj.email,
       "phone" : this.registrationObj.phone,
       "profession" : this.registrationObj.profession,
       "password" : this.registrationObj.password,
       "confirmPassword" : this.registrationObj.confirmPassword
      }).subscribe((result) => {
        console.log(result)
      })

      this._router.navigate(['/login'])
  }

}
