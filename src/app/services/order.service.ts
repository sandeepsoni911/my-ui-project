import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map,catchError, filter, switchMap } from 'rxjs/operators';
import {Http} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
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

   getOrderList() : Observable<Order[]>  {
    return this._http.get(this.baseUrl+'/order')
    .pipe(map((response : Response) => <Order[]>response.json()));
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
      .pipe(map((response : Response) => <OrderPayment[]>response.json()))
    }

    saveOrderDetails(order : Order): Observable<BaseResponse> {

      return this._httpClient.post<BaseResponse>(this.baseUrl+'/order', order, httpOptions);
    }
  
}
