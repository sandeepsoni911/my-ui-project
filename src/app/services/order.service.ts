import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { map,catchError, filter, switchMap } from 'rxjs/operators';
import {Http} from '@angular/http';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import {Order} from '../models/order.model';
import { Response} from '@angular/http';
import {OrderPayment} from '../models/orderPayment.model';
import { BaseResponse } from '../models/baseResponse.model';
import { environment } from '../..//environments/environment';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
   })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;

  //private apiUrl = 'http://ec2-18-188-183-35.us-east-2.compute.amazonaws.com/CounterWebApp/';

  //private apiUrl = 'http://localhost:8080/CounterWebApp/';

  constructor(private _http : Http, private _httpClient: HttpClient) {

   }

   getOrderList(pageNumber, perPage) : Observable<any>  {
    return this._http.get(this.baseUrl+'/order?pageNumber='+pageNumber+'&perPage='+perPage)
    .pipe(map((response : Response) => <any>response.json()));
    };

    getOrderListForCustomer(customerId : string, customerName : string) : Observable<Order[]>  {
      return this._http.get(this.baseUrl+'/orderDetailsByCustomer?customerId='+customerId
                            +"&customerName="+customerName)
      .pipe(map((response : Response) => <Order[]>response.json()));
      };

    getOrderDetails(id : string) : Observable<Order>  {
      console.log('invoking order details api for id : '+id);
      return this._http.get(this.baseUrl.concat('/order/'+id))
      .pipe(map((response : Response) => <Order>response.json()));
    };

    saveOrderPayment(orderPayment :OrderPayment) : Observable<BaseResponse> {
      return this._httpClient.post<BaseResponse>(this.baseUrl.concat('orderPayment'), orderPayment, httpOptions ) ;
    };

    getPaymentDetailsByOrderId(orderId : string) : Observable<OrderPayment[]>{

      return this._http.get(this.baseUrl+'orderPayment/'+orderId)
      .pipe(map((response : Response) =>  <OrderPayment[]>response.json()))
    }

    saveOrderDetails(order : Order): Observable<BaseResponse> {

      return this._httpClient.post<BaseResponse>(this.baseUrl+'order', order, httpOptions);
    }

    updateOrderDetails(order : Order): Observable<BaseResponse> {

      return this._httpClient.put<BaseResponse>(this.baseUrl+'order', order, httpOptions);
    }
  

    
    searchOrders(searchString: string, pageNo : number, perPage : number) : Observable<any>  {
      return this._httpClient.get<Order[]>(this.baseUrl+'searchOrder/'+searchString
      +'?pageNumber='+pageNo+'&perPage='+perPage)
      .pipe(
       // retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
    };

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
