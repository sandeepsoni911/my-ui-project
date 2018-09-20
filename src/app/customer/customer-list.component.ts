import { Component, OnInit } from '@angular/core';
import {Customer} from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers:[CustomerService]
})
export class CustomerListComponent implements OnInit {

 customerList: Customer[] ;

  constructor(private _customerService : CustomerService,
              private _router : Router) { 
    
  }

  ngOnInit() {

  this._customerService.getCustomers()
                          .subscribe((customerData) => this.customerList = customerData);

              

  }

  createCustomerLoan(custId){
    this._router.navigate(['/createLoan', custId]);
  }

  fetchLoanDetails(id){
    this._router.navigate(['/customerLoanDetail', id]);
  }

  

}
