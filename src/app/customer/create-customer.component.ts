import { Component, OnInit } from '@angular/core';
import {NgForm, FormControl, Validators, FormGroup} from '@angular/forms';
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
  success_msg;
  errorResponse;
  validationError;
  customer : Customer = {
    id :null,
    fullName : null,
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
    this.success_response = null;
    this.errorResponse = null;
    if(!this.validateCustomerData(customer)){
      this.validationError='Please enter all required details.';
      console.log('required customer details are not present');
      return ;
    }
    console.log(customer);
    this._customerService.saveCustomer(customer)
                          .subscribe(
                            
                              //(customerData) => this.customer = customerData
                              res => {
                              
                                if(res != null){
                                  
                                  if(res.status == 'SUCCESS'){
                                    this.customer = res.data;
                                    this.success_response = 'Customer Added Successfully.';
                                    this.success_msg = 'Customer Added Successfully.';
                                    console.log(this.success_response);
                                    this._router.navigate(['/customerList']);
                                  }else{
                                    this.errorResponse = "An Error occurred while processing your request. Please try again later.";
                                    console.log(this.errorResponse);
                                  }
                                }
                              
                              },
                              err => {
                                this.errorResponse = JSON.stringify(err);  
                                console.log(err)
                              }
                          
                          )
  }

  validateCustomerData(customer : Customer) : boolean {
    if(customer == null){
      return false;
    }

    if(customer.city == null || customer.city == ''){
      console.log("invalid city");
      return false;
    }
    if(customer.fullName == null || customer.fullName == ''){
      console.log("invalid fullName");
      return false;
    }
    if(customer.address == null || customer.address == ''){
      console.log("invalid address");
      return false;
    }
    if(customer.phone == null || customer.phone == ''){
      console.log("invalid phone");
      return false;
    }
    return true;
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
