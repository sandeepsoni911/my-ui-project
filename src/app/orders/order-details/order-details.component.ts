import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/order.model';
import {OrderPayment} from '../../models/orderPayment.model';
import {BaseResponse} from '../../models/baseResponse.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  initialPendingAmount;
  baseResponse : BaseResponse;
  currencyFormatting:boolean;
  orderPaymentDetailsList : OrderPayment[];

  success_response;
  errorResponseOnPayment;
  orderPayment : OrderPayment = {
    orderId : null,
    partialPaymentAmount : null,
    balanceAmount : null,
    orderPaymentId : null,
	  dueDate : null,
    comment : null,
    paymentType : "Cash",
    
    
  };
  
  paymentTypeList: string[] = ["Cash","Card","Paytm","Cheque","Ohter"];
  
  orderDetail : Order;

  constructor(private _orderService : OrderService, private _route : ActivatedRoute
    , private _router : Router) { }

  ngOnInit() {
    let orderId = this._route.snapshot.paramMap.get('id');

    this._orderService.getOrderDetails(orderId).subscribe(
      (
        res) => {
          if(res != null){
            this.orderDetail = res;
            this.calculatePendingAmount(res);
          }
          
         
        },
        error =>{
          console.log('some error occurred while getting order details')
        }
        
    )
   
    this.getOrderPaymentDetails( orderId);
   
    console.log('Order details '+this.orderDetail)
  }

  savePartialPayment(payment : OrderPayment){
    payment.orderId = this.orderDetail.orderId;
    console.log(payment);
    this._orderService.saveOrderPayment(payment).subscribe(
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

  getOrderPaymentDetails(orderId : string){
    
    //console.log(' orderId in getOrderPaymentDetails '+orderId)
    this._orderService.getPaymentDetailsByOrderId(orderId)
                      .subscribe(
                        (orderPaymentsData) => 
                        {
                          this.orderPaymentDetailsList = orderPaymentsData;
                        },
                  error => {
                        this.handleError(error);
                        console.log("Some error occured while saving order details")
                        this.errorResponseOnPayment = JSON.stringify(error); 
      }

                      )
  }



  checkPaymentDetailsAvailable(): boolean {

    if (typeof this.orderPaymentDetailsList !== 'undefined' && this.orderPaymentDetailsList.length > 0) {

      console.log("inside checkPaymentDetailsAvailable" +this.checkPaymentDetailsAvailable.length)
     // this.currLoanAmount = this.loanPaymentDetailsList[this.loanPaymentDetailsList.length - 1].balanceAmount;
      return true;
    } else {
      return false;
    }
    
  }

  calculatePendingAmount(orderData : Order){
    if(orderData != null){
      //console.log('Inside calculate Pending amount' + orderData.receivedAmount);
      //let makingCharge = orderData.makingCharge != null?orderData.makingCharge:0;
      //let discount = orderData.discount != null ?orderData.discount:0;
      let receivedAmount = orderData.receivedAmount != null ?orderData.receivedAmount:0;
      let pendingAmount =(
                          Number(orderData.orderAmount))
                           -(+Number(receivedAmount)
                           );
      this.initialPendingAmount = pendingAmount;
      if(pendingAmount>999){
        this.currencyFormatting=true;
      }
    }
    
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
