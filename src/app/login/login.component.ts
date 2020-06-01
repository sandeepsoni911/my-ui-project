import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserDetails} from '../models/userDetails.model';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorResponse;
  loginUserData : UserDetails = {

    userName: null,
    password: null,
    auth_token: null


  }

  constructor(private _authService : AuthService
            , private _router : Router) { }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.loginUserData);
    this._authService.loginUser(this.loginUserData)
    //.pipe(map(res => res.json()))
    .subscribe(
      res => {
        console.log('loggin response');
        console.log(res);
        if(res != null){
          
          if(res.status == 'SUCCESS'){
            localStorage.setItem('token', res.userDetails.authToken);
            localStorage.setItem('userName', res.userDetails.userName);
            this._router.navigate(['dashboard']);
          }else{
            this.errorResponse = res.message;
          }
        }
       
      },
      err => {
        this.errorResponse = JSON.stringify(err.message);
        console.log(err)
      }
    )
  }

}
