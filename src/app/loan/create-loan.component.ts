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
  
 enteredDate : Date;
 successMessage;
 errorResponse;
 customerName;

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

  

  saveLoan(loan: Loan) : void { //customerName
   
    let datePipe = new DatePipe('en-US');
    this.loan.dueDate=  datePipe.transform(this.enteredDate, 'yyyy-MM-dd');
    //console.log(loan);
    this._loanService.saveLoan(loan)
                          .subscribe((loanData) => {
                            this.loan = loanData
                            this.successMessage = "Loan Details Saved Successfully.";
                            this.delay(3000);
                            this._router.navigate(['/loanList']);
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
}
