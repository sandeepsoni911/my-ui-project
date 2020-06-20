import { Component, OnInit, Input } from '@angular/core';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
import { ActivatedRoute, Router } from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-loan-details-edit',
  templateUrl: './loan-details-edit.component.html',
  styleUrls: ['./loan-details-edit.component.css']
})
export class LoanDetailsEditComponent implements OnInit {

  loan :Loan;
  itemContainers:any;
  displayModalObject : string = 'none'; 
  enteredDate : Date;
 loanCreatedDate:Date;
 successMessage;
 errorResponse;
 customerName;
 validationError;

  availableItemType : string[] = [
    "Gold", "Silver", "Platinum", "Diamond"
  ];

  rateOfInterestList : string[] = [
    "1.00", "1.25","1.50","1.75", "2.00","2.25", "2.50","2.75", "3.00","3.25","3.50", "3.75","4.00","4.25", "4.50","4.75", "5"
  ];

  itemQualityList : string[] = [
    "40", "50", "55", "60", "65","70", "75", "80", "85","90","95","99"
  ];


  constructor(private _loanService : LoanService
    , private _route : ActivatedRoute
    , private _router : Router) { }

  ngOnInit() {
    let loanId = this._route.snapshot.paramMap.get('id');

    this._loanService.getLoanDetail(loanId)
                           .subscribe(
                             (loanData) => {
                               this.loan = loanData;
                               this.itemContainers=loanData.itemsList;
                              
                              this.enteredDate = new Date(loanData.dueDate);
                              console.log("before conversion date is : "+loanData.createdDate)
                              this.loanCreatedDate = new Date(loanData.createdDate);
                              console.log("after conversion date is : "+this.loanCreatedDate);
                              console.log( "Loan details are : " + JSON.stringify(this.loan ))

                              });
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

  validateItemList() : string {
    let respnse ='';
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
     
      if(itm.itemPrice == null ){
        respnse='Please enter order amount for Item '+i;
        return respnse;
      }
  
     
     i++;
    }
    
    )
    return respnse;
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
  
    
  
    if(loan.rateOfInterest == null || loan.rateOfInterest == ''){
       
      this.validationError='Please select rateOfInterest';
      return false;
    }
  
    
    return true;
  }

  updateLoan(loan: Loan)  { //customerName
    // alert(this.enteredDate)
     let datePipe = new DatePipe('en-US');
     this.loan.dueDate=  datePipe.transform(this.enteredDate, 'yyyy-MM-dd');
     this.loan.createdDate = this.loanCreatedDate;
 
 
     let res = this.validateItemList();
     if(res != ''){
 
       this.validationError=res;
       return;
     } 
 
     if(!this.validateLoanData(loan)){
       return;
     }
     loan.itemsList=this.itemContainers;
     this.validationError = null;
 
     
    
    
     this._loanService.updateLoan(loan)
                           .subscribe(
                             
                             (res) => {
 
                             if(res != null){
 
                               if(res.status=='SUCCESS'){
                                  
                                   this.successMessage = "Loan Details Saved Successfully.";
                                   this.displayModalObject = 'block';
                                   this._router.navigate(['loanDetail', loan.loanId ]);
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
 
}
