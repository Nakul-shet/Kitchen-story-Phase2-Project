import { Component } from '@angular/core';

import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileID : any;

  profileAccountDetails : any;

  constructor(private _accountService : AccountService){}

  ngOnInit(){

    this.profileID = sessionStorage.getItem('id');

    this._accountService.getAccountById(this.profileID).subscribe((result) => {
      this.profileAccountDetails = result;
    })


  }

  
}
