import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Loan} from '../models/loan.model';
import { LoanService } from '../services/loan.service';
import {OrderService} from '../services/order.service';
import {Router} from '@angular/router';
import {Order} from '../models/order.model';

@Component({
  selector: 'app-customer-loan-detail',
  templateUrl: './customer-loan-detail.component.html',
  styleUrls: ['./customer-loan-detail.component.css']
})
export class CustomerLoanDetailComponent implements OnInit {
  loanList: Loan[] ;
  customerOrderList : Order[];

  
  constructor(private _ActivatedRoute : ActivatedRoute
              ,private _loanService : LoanService
              ,private _router : Router
              ,private _orderService : OrderService) { }

  ngOnInit() {

   let customerId = this._ActivatedRoute.snapshot.paramMap.get("id");

   this._loanService.getCustomerLoanList(customerId)
   .subscribe((loanData) => this.loanList = loanData);

   this._orderService.getOrderListForCustomer(customerId, null)
                    .subscribe((orderData) => this.customerOrderList = orderData)
  }

  
  onSelect(custId){
    this._router.navigate(['/loanDetail', custId]);
  }

  getOrderDetails(id){
    this._router.navigate(['/orderDetails', id]);
 }

 createOrderForCustomer(custId){
  this._router.navigate(['/createOrder', custId]);
}

}
