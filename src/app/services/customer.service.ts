import { Injectable } from "@angular/core";
import {Customer} from '../models/customer.model';
import { Response} from '@angular/http';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map,catchError, filter, switchMap } from 'rxjs/operators';
import {Http} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';




const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class CustomerService{
private apiUrl = 'http://ec2-18-188-183-35.us-east-2.compute.amazonaws.com/CounterWebApp/';
//private apiUrl = 'http://localhost:8080/CounterWebApp/';


constructor(private _http : Http, private _httpClient: HttpClient
        , private _router : Router){
    
}

getCustomers() : Observable<Customer[]>  {
    return this._httpClient.get<Customer[]>(this.apiUrl+'customers')
    .pipe(
     // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
};

getCustomerDetailsById(custId : String) : Observable<Customer>  {
  return this._httpClient.get<Customer>(this.apiUrl+'customers/'+custId)
  .pipe(
   // retry(3), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );
};

saveCustomer(customer :Customer) : any {
  
  return this._httpClient.post(this.apiUrl+'registerCustomer', customer, httpOptions)
  .pipe(
   
    catchError(this.handleError)
  );

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


}