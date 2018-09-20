import { Component, OnInit } from '@angular/core';
import { Loan } from '../../models/loan.model';
import {LoanService} from '../../services/loan.service';
import {ActivatedRoute, Router} from '@angular/router';
import { LoanPayment } from '../../models/loanPayment.model';
import {InterestResponse} from '../../models/interestResponse.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  success_response;
  errorResponseOnPayment;
  interestResponse :InterestResponse;
  loanDetail : Loan ;
  loanPayment : LoanPayment = {
    loanId : null,
    partialPaymentAmount : null,
    balanceAmount : null,
    loanPaymentId : null,
	  dueDate : null,
    comment : null,
    paymentType : null
    
  };
  
  paymentTypeList: string[] = ['Loan' , 'Payment'];
  loanPaymentDetailsList : LoanPayment[];
  simpleInterest  ;
  totalAmount ;
  noOfDays;
  noOfMonths : number;
  currLoanAmount : number;
  paymentDetailsAvailable : boolean = false;

  //totalPartialInterest : number;
  
  constructor(private _loanService : LoanService
              , private _route : ActivatedRoute
              , private _router : Router) { }

  ngOnInit() {
   let loanId = this._route.snapshot.paramMap.get('id');

    this._loanService.getLoanDetail(loanId)
                           .subscribe((loanData) => this.loanDetail = loanData);
 
                          

    this._loanService.getLoanPaymentDetailList(loanId)
                    .subscribe((paymentListData) => this.loanPaymentDetailsList = paymentListData);
                    
    
    this._loanService.getInterest(loanId, null).subscribe(
      (interestAmountResponse) => {this.interestResponse =interestAmountResponse;
                                   }
    )
    
  }

  calculateInterest(loanDetail) {
    let todayDate : Date = new Date();
    let loanDate : Date = null;
    let diffInMs: number =  Math.abs(todayDate.getTime() - loanDetail.createdDate);
    this.noOfDays = Math.ceil(diffInMs / (1000 * 3600 * 24)); 
    
    if(typeof this.loanPaymentDetailsList !== 'undefined' && this.loanPaymentDetailsList.length > 0){
      this.currLoanAmount =  this.loanPaymentDetailsList[this.loanPaymentDetailsList.length-1].balanceAmount;
      this.paymentDetailsAvailable = true;
    }else{
      this.currLoanAmount = loanDetail.loanAmount;
    }
    if( this.interestResponse == null){
        let principal = loanDetail.loanAmount;
        let rate = loanDetail.rateOfInterest;
        let  month : number = 365/12;
        this.simpleInterest = (this.currLoanAmount) *(rate/100)* (this.noOfDays/month);// time in days
      }else{
        
        this.simpleInterest = this.interestResponse.INTEREST ;
        this.noOfDays = this.interestResponse.DAYS ;
      }
      this.noOfMonths= Math.floor(this.noOfDays/30);
      this.noOfDays = this.noOfDays%30;
      this.totalAmount = parseFloat(this.simpleInterest)+this.currLoanAmount;
  }

  checkPaymentDetailsAvailable(): boolean {

    if (typeof this.loanPaymentDetailsList !== 'undefined' && this.loanPaymentDetailsList.length > 0) {
      this.currLoanAmount = this.loanPaymentDetailsList[this.loanPaymentDetailsList.length - 1].balanceAmount;
      return true;
    } else {
      return false;
    }
    
  }
  
  /* calculateTotalPartialInterest() : number {
    let totalPartialInterest : number = 0;
    if(typeof this.loanPaymentDetailsList !== 'undefined' && this.loanPaymentDetailsList.length > 0){
      for (let partialPayment of this.loanPaymentDetailsList) {
     
        totalPartialInterest = totalPartialInterest + partialPayment.interestAmount;
        }
    }
    return totalPartialInterest;
  } */

  
  savePartialPayment(loanPayment : LoanPayment) : void {
    loanPayment.loanId=this.loanDetail.loanId;
    console.log(JSON.stringify(loanPayment))
    this._loanService.saveLoanPayment(loanPayment)
                  .subscribe((loanData) =>
                   {this.loanPayment = loanData
                    console.log("loan Payment Saved SuccessFully.")
                    this.success_response='loan Payment Saved SuccessFully.'
                    window.location.reload();
                   },
                  error => { this.handleError(error);
                   this.errorResponseOnPayment = JSON.stringify(error);
                   
                    
                  });
                  
                  
                  

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
     throw error;
  };

}
