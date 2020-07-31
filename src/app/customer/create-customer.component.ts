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

  
  displayModalObject : string = 'none';
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
    city : 'Kannauj',
    gender : null,
    photoPath : null,
    status: null
  };
  submitClicked=false;
  constructor(private _customerService : CustomerService
    , private _router : Router) {}

  ngOnInit() {

    
  }

   saveCustomer(customer :Customer): void {
    this.success_response = null;
    this.errorResponse = null;
    if(!this.validateCustomerData(customer)){
      //this.validationError='Please enter all required details.';
      //console.log('validationError: '+this.validationError);
      console.log('required customer details are not present');
      return ;
    }
    this.validationError= null;
    this.submitClicked=true;
    this._customerService.saveCustomer(customer)
                          .subscribe(
                            
                             
                              res => {
                              
                                if(res != null){
                                  
                                  if(res.status == 'SUCCESS'){
                                   
                                    this.success_response = 'Customer Added Successfully.';
                                    this.success_msg = 'Customer Added Successfully.';
                                    this.displayModalObject = 'block';
                                   
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
      this.validationError='Please enter customer details';
      return false;
    }

     if(customer.fullName == null || customer.fullName == ''){
      this.validationError='Please enter fullName name';
      return false;
    }

    if(customer.fatherName == null || customer.fatherName == ''){
      console.log("invalid fatherName"); 
      this.validationError='Please enter father name';
      return false;
    }
    if(customer.city == null || customer.city == ''){
      this.validationError='Please enter city name';
      console.log("invalid city");
      return false;
    }

    if(customer.address == null || customer.address == ''){
      console.log("invalid address");
      this.validationError='Please enter address';
      return false;
    }
   
    
   

    
    if(customer.gender == null || customer.gender == ''){
      console.log("invalid gender ");
      this.validationError='Please select gender';
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


  getDisplayObject() {
   
    return this.displayModalObject;

 }

 dismissModal()  {
   this.displayModalObject = 'none';

   return this.displayModalObject;
 }

 dismissModalAndRedirect(){
   this._router.navigate(['/customerList'])
 }

}
