import { Injectable } from "@angular/core";
import {Loan} from '../models/loan.model';
import {LoanPayment} from '../models/loanPayment.model'
import { Response} from '@angular/http';
import {HttpErrorResponse} from '@angular/common/http';
import { Observable} from 'rxjs';
import { map,catchError, filter, switchMap } from 'rxjs/operators';
import {Http} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import {InterestResponse} from '../models/interestResponse.model';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     })
  };


@Injectable()
export class LoanService{

  private apiUrl = 'http://ec2-18-188-183-35.us-east-2.compute.amazonaws.com/CounterWebApp/';

  //private apiUrl = 'http://localhost:8080/CounterWebApp/';

   getLoanUrl = this.apiUrl+'loan';

   getLoanPaymentUrl = this.apiUrl+'loanPartialPayment/';

   getCustomerLoanUrl = this.apiUrl+'loanDetailsByCustomerId/';


   

   
constructor(private _http : Http, private _httpClient: HttpClient){
    
}

getLoanList() : Observable<Loan[]>  {
    return this._http.get(this.getLoanUrl)
    .pipe(map((response : Response) => <Loan[]>response.json()));
};

getCustomerLoanList(customerId: string) : Observable<Loan[]>  {
  console.log('jhfginside loanlist  s')
  return this._http.get(this.getCustomerLoanUrl.concat(customerId))
  .pipe(map((response : Response) => <Loan[]>response.json()));
};


saveLoan(loan :Loan) : Observable<Loan> {
    return this._httpClient.post<Loan>(this.getLoanUrl, loan, httpOptions);
  };

  saveLoanPayment(loanPayment :LoanPayment) : Observable<any> {
    return this._httpClient.post<LoanPayment>(this.apiUrl.concat('loanPartialPayment'), loanPayment, httpOptions, ) ;
  };

  getLoanDetail(id : string) : Observable<Loan>  {
    return this._http.get(this.getLoanUrl.concat('/'+id))
    .pipe(map((response : Response) => <Loan>response.json()));
  };

  getLoanPaymentDetailList(id : string) : Observable<LoanPayment[]>  {
    return this._http.get(this.getLoanPaymentUrl.concat('/'+id))
    .pipe(map((response : Response) => <LoanPayment[]>response.json()));
  };

  getInterest(id : string, date : Date) : Observable<InterestResponse>  {
    return this._http.get(this.apiUrl.concat('/interest/'+id))
    .pipe(map((response : Response) => <InterestResponse>response.json()));
  };

}