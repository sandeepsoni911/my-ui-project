import { Component, OnInit } from '@angular/core';
import {Loan} from '../models/loan.model';
import {LoanService} from '../services/loan.service';
import {DatePipe} from '@angular/common'
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {
  
 displayModalObject : string = 'none'; 
 enteredDate : Date;
 successMessage;
 errorResponse;
 customerName;
 validationError;

  availableItemType : string[] = [
    "Gold", "Silver", "Platinum", "Diamond"
  ];

  rateOfInterestList : string[] = [
    "1", "1.5", "2", "2.5", "3","3.5", "4", "4.5", "5"
  ];

  itemQualityList : string[] = [
    "40", "50", "55", "60", "65","70", "75", "80", "85","90","95","99"
  ];

  
  loan : Loan = {
  loanId : null,
	loanAmount : null,
	dueDate : null,
	customerId :null,
	rateOfInterest : null,
	comments : null,
	status : null,
	itemName : null,
	itemQuality: null,
	weight : null,
  customerName : null,
  itemType :null,
  createdDate : null,
  khataNumber : null,
  customerCity: null
  }

  
  constructor(private _loanService : LoanService
              , private _route : ActivatedRoute
              ,private _router : Router) {
   
   }

  ngOnInit() {

    let customerIdName = this._route.snapshot.paramMap.get('customerId');

    let customeIdNameSplitted : string[]  = customerIdName.split("-");
    let custId = customeIdNameSplitted[0];
    let custName = customeIdNameSplitted[1];

   // this.customerName=custName;
    this.loan.customerName = custName;
    this.loan.customerId=custId;
  }

  

  saveLoan(loan: Loan)  { //customerName
    let datePipe = new DatePipe('en-US');
    this.loan.dueDate=  datePipe.transform(this.enteredDate, 'yyyy-MM-dd');
    if(!this.validateLoanData(loan)){
      return;
    }
    this.validationError = null;

    
   
   
    this._loanService.saveLoan(loan)
                          .subscribe(
                            
                            (res) => {

                            if(res != null){

                              if(res.status=='SUCCESS'){
                                 
                                  this.successMessage = "Loan Details Saved Successfully.";
                                  this.displayModalObject = 'block';
                                 // this._router.navigate(['/loanList']);
                              }else{
                                this.errorResponse = res.message;
                              }
                              
                            }
                            
                              },
                            error => {
                              this.errorResponse = 'An Error Occured while saving Loan, Please try again.'
                              console.error(JSON.stringify(error));
                            });

                          console.log(this._loanService);
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if(charCode == 190  || charCode == 46){
    return true
  }
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
 window.location.reload();
 return this.displayModalObject;
}

dismissModalAndRedirect(){
 this._router.navigate(['/loanList'])
}



validateLoanData(loan : Loan) : boolean {
  if(loan == null){
    this.validationError='Please enter customer details';
    return false;
  }

  if(loan.loanAmount == null || loan.loanAmount == 0){
    this.validationError='Please enter valid loanAmount';
    return false;
  }
  
  if(loan.dueDate == null || loan.dueDate == ''){
    console.log('loan.dueDate : '+ loan.dueDate)
    this.validationError='Please enter dueDate';
    return false;
  }

  if(loan.itemType == null || loan.itemType == ''){
     
    this.validationError='Please select itemType';
    return false;
  }

  if(loan.rateOfInterest == null || loan.rateOfInterest == ''){
     
    this.validationError='Please select rateOfInterest';
    return false;
  }

  if(loan.itemName == null || loan.itemName == ''){
    this.validationError='Please enter itemName';
    return false;
  }

  if(loan.weight == null || loan.weight <= 0){
    this.validationError='Please enter weight';
    return false;
  }

  if(loan.itemQuality == null || loan.itemQuality == ''){
    this.validationError='Please select itemQuality';
    return false;
  }
  
  return true;
}

}
