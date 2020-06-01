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


  validationError;

  baseResponse : BaseResponse;
  success_response : string;
  successMessage : string;
  errorResponse : string;
  errorResponseOnCreateOrder : string;
  displayModalObject : string = 'none';
  calculationLogic : string;
  submitClicked=false;

  pendingAmount : number ;

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
      receivedAmount : null,
      discount : null,
      makingCharge : null,
      marketRate : null,
      itemList:null


  }

  constructor(private _orderService : OrderService
              ,private _activatedRoute : ActivatedRoute
              ,private _router : Router) { }

  ngOnInit() {

   let customerIdName = this._activatedRoute.snapshot.paramMap.get('cutomerId');

   
   let customeIdNameSplitted : string[]  = customerIdName.split("-");
   let customerId = customeIdNameSplitted[0];
   let customerName = customeIdNameSplitted[1];

   this.order.customerId = parseInt(customerId);
   this.order.customerName = customerName;
  }

  saveOrder(order : Order) {

    if(!this.validateLoanData(order)){
      return;
    }
    this.submitClicked = true;

    console.log(order)
    this._orderService.saveOrderDetails(order).subscribe(
      (paymentData : BaseResponse) => 
      {

        if(paymentData.status=='SUCCESS'){
          this.baseResponse = paymentData;
          this.success_response= paymentData.message;
          this.displayModalObject = 'block';
        }else{
          this.errorResponseOnCreateOrder =paymentData.message;
        }
        
        
      },
      error => { this.handleError(error);
        console.log("Some error occured while saving order details")
        this.errorResponseOnCreateOrder = JSON.stringify(error); 
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


  getPendingAmount(order : Order){

    let  orderAmount: number = order.orderAmount;
    let  makingCharge: number = order.makingCharge;


   let  discount: number = order.discount;
    
   let receivedAmount : number = order.receivedAmount;

   
    this.pendingAmount = (Number(orderAmount)+Number(makingCharge))-(Number(discount)+Number(receivedAmount));
  }


   getDisplayObject() {
   
    return this.displayModalObject;

 }

 dismissModal()  {
   this.displayModalObject = 'none';
    window.location.reload;
   return this.displayModalObject;
 }

 dismissModalAndRedirect(){
   this._router.navigate(['/orderList'])
 }

 validateLoanData(order : Order) : boolean {
  if(order == null){
    this.validationError='Please enter order details';
    return false;
  }

  if(order.itemName == null || order.itemName == ''){
    this.validationError='Please enter itemName';
    return false;
  }
  
  if(order.itemType == null || order.itemType == ''){
    this.validationError='Please select itemType';
    return false;
  }
  if(order.weight == null || order.weight == 0){
    this.validationError='Please enter weight';
    return false;
  }
  if(order.itemQuality == null ){
    this.validationError='Please enter itemQuality';
    return false;
  }
  if(order.dueDate == null ){
    this.validationError='Please enter dueDate';
    return false;
  }
  if(order.orderAmount == null || order.orderAmount == 0){
    this.validationError='Please enter orderAmount';
    return false;
  }
  
  
  return true;
}


calculateAmount(order : Order) {
  let amount : number = 0;
  if(order.itemType != null && (order.itemType == 'Silver' || order.itemType == 'silver')){
    this.calculationLogic = 'Amount calculated for Silver rate '+order.marketRate+' per Kg  for weight '+order.weight + ' grams'; 
    amount = (order.marketRate/1000)*order.weight;
    amount = Math.round(amount);
  }else if (order.itemType != null && (order.itemType == 'Gold' || order.itemType == 'gold')){
    this.calculationLogic = 'Amount calculated for Gold rate '+order.marketRate+' per 10 grams  for weight '+order.weight + ' grams';
    amount = (order.marketRate/10)*order.weight;
    amount = Math.round(amount);
  }

 this.order.orderAmount=amount;

}

}
