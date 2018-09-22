import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method':'*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'authorization, content-type'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  //private _loginUrl = "http://localhost:8080/CounterWebApp/login";

  private _loginUrl = "http://ec2-18-188-183-35.us-east-2.compute.amazonaws.com/CounterWebApp/login";

  constructor(private http: HttpClient,
              private _router: Router) { }

  

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user, httpOptions);
  }

  loggedIn() : boolean {
    return !!localStorage.getItem('token');
  }

  logoutUser() : void {
   
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    
    
    this._router.navigate(['/home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUserName() : string {
    return localStorage.getItem('userName')
  }
}
