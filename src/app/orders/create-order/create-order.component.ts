import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order.model';
import { OrderService } from '../../services/order.service';

import {BaseResponse} from '../../models/baseResponse.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { Items } from 'src/app/models/items.model';




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
  totalOrderAmount=0;

  pendingAmount : number ;
  item = new Items();

  itemContainers  =[];
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

      itemsList:null,
      totalOrderAmount:null


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
   this.item = new Items();
   this.itemContainers.push(this.item);
  }

  saveOrder(order : Order) {

   let res = this.validateItemList();
    if(res != ''){
      this.validationError=res;
      return;
    } 
    if(!this.validateLoanData(order)){
      return;
    } 
    

    this.submitClicked = true;
    order.itemsList=this.itemContainers;
    console.log(order)
    this._orderService.saveOrderDetails(order).subscribe(
      (paymentData : BaseResponse) => 
      {

        if(paymentData.status=='SUCCESS' || paymentData.message=='SUCCESS'){
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

    let  orderAmount: number = order.totalOrderAmount;
   let receivedAmount : number = order.receivedAmount;

   
    this.pendingAmount = (Number(orderAmount) - Number(receivedAmount));
   
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

  /* if(order.itemName == null || order.itemName == ''){
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
  } */
  if(order.dueDate == null ){
    this.validationError='Please enter dueDate';
    return false;
  }
  /* if(order.orderAmount == null || order.orderAmount == 0){
    this.validationError='Please enter orderAmount';
    return false;
  } */
  
  
  return true;
}

validateItemList() : string {
  let respnse='';
  let i =1;
  this.itemContainers.forEach(function(itm){

    if(itm.itemName == null ){
      respnse='Please enter Item Name for item '+i;
      return respnse;
    }

    if(itm.weight == null ){
      respnse='Please enter Weight for item : '+i;
      return respnse;
    }
    if(itm.marketRate == null ){
      respnse='Please enter marketRate for item : '+i;
    return respnse;
    }
    if(itm.makingCharge == null ){
      this.validationError='Please enter makingCharge for item : '+i;
    return respnse;
    }
    if(itm.itemPrice == null ){
      respnse='Please enter order amount for Item '+i;
      return respnse;
    }

   
   i++;
  }
  
  )
  return respnse;
}


calculateItemOrderAmount(itemObj : Items, i:number) {
  let amount : number = 0;
  let calculationLogicStr="";
  if(itemObj.itemType != null && (itemObj.itemType == 'Silver' || itemObj.itemType == 'silver')){
    calculationLogicStr = 'Amount calculated for Silver rate '+itemObj.marketRate+' per Kg  for weight '+itemObj.weight + ' grams'; 
    itemObj.discount  = itemObj.discount !=null?itemObj.discount :0;
    amount = (((itemObj.marketRate/1000)*itemObj.weight)+Number(itemObj.makingCharge))-itemObj.discount;
    amount = Math.round(amount);
  }else if (itemObj.itemType != null && (itemObj.itemType == 'Gold' || itemObj.itemType == 'gold')){
    calculationLogicStr = 'Amount calculated for Gold rate '+itemObj.marketRate+' per 10 grams  for weight '+itemObj.weight + ' grams';
    itemObj.discount  = itemObj.discount !=null?itemObj.discount :0;
    amount = (((itemObj.marketRate/10)*itemObj.weight)+Number(itemObj.makingCharge))-itemObj.discount;
    amount = Math.round(amount);
  }
this.itemContainers[i].itemPrice=amount;
this.itemContainers[i].calculationLogicString=calculationLogicStr;
 //this.order.orderAmount=amount;

}

calculateTotalOrderAmount(order){
  let ordrAmnt:number=0;
  this.itemContainers.forEach(function(itm){
    if(itm.itemPrice != null && !isNaN(itm.itemPrice)){
      ordrAmnt = ordrAmnt+parseInt(itm.itemPrice);
      console.log('totalAmount is : '+ordrAmnt);
      order.totalOrderAmount = ordrAmnt;
    }
   
  }
  
  )
 
}



addMoreItems() {
  console.log(JSON.stringify(this.itemContainers));
  this.item = new Items();
  this.itemContainers.push(this.item);
}

deleteItems() {
  this.itemContainers.pop();
}


}
