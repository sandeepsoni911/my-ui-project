import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from '../..//environments/environment';


import { BaseResponse } from '../models/baseResponse.model';

const httpOptions = {
  headers: {
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Methods':'OPTIONS, GET, PUT, PATCH, DELETE',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
    //'Access-Control-Allow-Credentials':'true'
  },
  //withCredentials: true
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient,
              private _router: Router) { }

  

  loginUser(user) {
    console.log(httpOptions)
    return this.http.post<any>( this.baseUrl+'/login', user,  httpOptions);
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
