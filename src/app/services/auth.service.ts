import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from '../..//environments/environment';
import { of, Observable, throwError } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';



import { BaseResponse } from '../models/baseResponse.model';
import { Tokens } from '../models/tokens.model';
import { UserDetailResponse } from '../models/userDetailResponse.model';
import { UserDetails } from '../models/userDetails.model';

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
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient,
              private _router: Router) { }

  

  loginUserOld(user) {
    console.log(httpOptions)
    return this.http.post<any>( this.baseUrl+'login', user,  httpOptions);
  }

  loginUser(user) {
    console.log(httpOptions)
    return this.http.post<any>( this.baseUrl+'authenticate', user,  httpOptions)
    .pipe(
      tap(tokens => this.doLoginUser(user.username, tokens)),
      mapTo(true),
      catchError(error => {
        alert(JSON.stringify(error.error));
        return of(false);
      }));
  }


  logoutNotWorking():Observable<boolean> {
    console.log("inside logout")
    return this.http.get<any>( this.baseUrl+'logout')
    .pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  logout() {
    console.log("inside logout")
     this.http.get<any>(this.baseUrl+'logout').pipe(
        // retry(3), // retry a failed request up to 3 times
         catchError(this.handleError) // then handle the error
       );
       this.doLogoutUser();
       this._router.navigate(['/login'])
       return;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(this.baseUrl+'refresh', {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, userDetailsRes: UserDetailResponse) {
    this.loggedUser = username;
    this.storeTokens(userDetailsRes.userDetails);
  }

  private doLogoutUser() {
    console.log('inside doLogoutUser')
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(userDetails: UserDetails) {
    console.log('storing to localStorage : '+JSON.stringify(userDetails));
    localStorage.setItem(this.JWT_TOKEN, userDetails.authToken);
    localStorage.setItem(this.REFRESH_TOKEN, userDetails.refreshToken);
   // localStorage.setItem('userName', userDetails.userName);

  }

  private removeTokens() {
    console.log('inside removeTokens()')
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
   //localStorage.removeItem('userName');

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };














  //******************below are old mehtods ********* */

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
