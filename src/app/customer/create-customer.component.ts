import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Customer} from '../models/customer.model';
import {Router} from '@angular/router';
import { JsonPipe } from '@angular/common';
import { CustomerService } from '../services/customer.service';




@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
  
})
export class CreateCustomerComponent implements OnInit {

  success_response;

  customer : Customer = {
    id :null,
    name : null,
    fatherName : null,
    phone : null,
    address : null,
    city : null,
    gender : null,
    photoPath : null,
    status: null
  };

  constructor(private _customerService : CustomerService
    , private _router : Router) {}

  ngOnInit() {
    
  }

   saveCustomer(customer :Customer): void {
    console.log(customer);
    this._customerService.saveCustomer(customer)
                          .subscribe((customerData) => this.customer = customerData);
                          this.success_response='Customer Added Successfully.'
                          //this._router.navigate(['/customerList']);
                          console.log(this.customer);
  }

}
