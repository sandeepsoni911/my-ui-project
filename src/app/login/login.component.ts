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
  loginUserData : any = {

    userName: null,
    password: null,
    auth_token: null


  }

  constructor(private _authService : AuthService
            , private _router : Router) { }

  ngOnInit() {
  }

  loginUserOld(){
    console.log(this.loginUserData);
    this._authService.loginUserOld(this.loginUserData)
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


  loginUser() {
    this._authService.loginUser(
      {
        username: this.loginUserData.userName,
        password: this.loginUserData.password
      }
    )
    .subscribe(success => {
      if (success) {
        this._router.navigate(['/home']);
      }else{
        this.errorResponse = 'Please enter correct Username/Password.';
      }
    });
  }


}
