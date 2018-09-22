import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order.model';
import { OrderService } from '../../services/order.service';

import {BaseResponse} from '../../models/baseResponse.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';




@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  baseResponse : BaseResponse;
  success_response : string;
  successMessage : string;
  errorResponse : string;
  errorResponseOnPayment : string;

  //customerId : null;

  availableItemType : string[] = [
    "Gold", "Silver", "Platinum", "Diamond"
  ];

  itemQualityList : string[] = [
    "40", "50", "55", "60", "65","70", "75", "80", "85","90","95","99"
  ];

  order : Order = {
      orderId : null,
      orderAmount : null,
      dueDate: null,
      itemType: null,
      customerId: null,
      comments: null,
      status: null,
      itemName : null,
      itemQuality : null,
      weight : null,
      customerName : null,
      customerCity : null,
      createdDate : null,
      khataNumber : null,
      exchangeItemName : null,
      exchangeItemQuality : null,
      exchangeWeight : null,
      receivedAmount : null


  }

  constructor(private _orderService : OrderService
              ,private _activatedRoute : ActivatedRoute) { }

  ngOnInit() {

    this.order.customerId = parseInt(this._activatedRoute.snapshot.paramMap.get('cutomerId'));
  }

  saveOrder(order : Order){

    console.log(order)
    this._orderService.saveOrderDetails(order).subscribe(
      (paymentData : BaseResponse) => 
      {
        this.baseResponse = paymentData;
        this.success_response= paymentData.message;
        window.location.reload();
      },
      error => { this.handleError(error);
        console.log("Some error occured while saving order details")
        this.errorResponseOnPayment = JSON.stringify(error); 
      }
      
    )
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
     throw error;
  };

}
