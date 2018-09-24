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
  validationError;
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

    if(this.validateCustomerData(customer)){
      this.validationError='Please enter all required details.'
      return ;
    }
    console.log(customer);
    this._customerService.saveCustomer(customer)
                          .subscribe((customerData) => this.customer = customerData);
                          this.success_response='Customer Added Successfully.'
                          //this._router.navigate(['/customerList']);
                          console.log(this.customer);
  }

  validateCustomerData(customer : Customer) : boolean {
    if(customer.city == null || customer.city == ''){
      console.log(customer.city);
      return false;
    }
    if(customer.name == null || customer.name== ''){
      console.log(customer.name);
      return false;
    }
    if(customer.address == null || customer.address== ''){
      console.log(customer.address);
      return false;
    }
    if(customer.phone == null || customer.phone== ''){
      return false;
    }
    return true;
  }

}
