import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CustomerService } from '../services/customer.service';
import {Customer} from '../models/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerDetail : Customer;

  constructor(private _activatedRoute : ActivatedRoute
    ,private _customerService : CustomerService) { }

  ngOnInit() {
   let custId = this._activatedRoute.snapshot.paramMap.get("id");
   this._customerService.getCustomerDetailsById(custId)
   .subscribe((customerData) => {
   
     this.customerDetail = customerData
    });
  }

}
