import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserDetails} from '../models/userDetails.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData : UserDetails = {

    userName: null,
    password: null,


  }

  constructor(private _authService : AuthService
            , private _router : Router) { }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.loginUserData);
    this._authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.userDetails.userName);
        this._router.navigate(['customerList']);
      },
      err => console.log(err)
    )


  }

}
