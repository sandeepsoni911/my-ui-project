import { Injectable } from "@angular/core";
import {Loan} from '../models/loan.model';
import {LoanPayment} from '../models/loanPayment.model'
import { Response} from '@angular/http';
import {HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map,catchError, filter, switchMap } from 'rxjs/operators';
import {Http} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import {InterestResponse} from '../models/interestResponse.model';
import { environment } from '../..//environments/environment';
import {BaseResponse} from '../models/baseResponse.model';


const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
     })
  };


@Injectable()
export class LoanService{

  baseUrl = environment.apiUrl;

  //private apiUrl = 'http://ec2-18-188-183-35.us-east-2.compute.amazonaws.com/CounterWebApp/';

  //private apiUrl = 'http://localhost:8080/CounterWebApp/';

   getLoanUrl = this.baseUrl+'loan';

   getDefaultLoanUrl = this.baseUrl+'defaultLoans';

   getLoanPaymentUrl = this.baseUrl+'loanPartialPayment';

   getCustomerLoanUrl = this.baseUrl+'loanDetailsByCustomerId';


   

   
constructor(private _http : Http, private _httpClient: HttpClient){
    
}



getLoanList(pageNum, perPage) : Observable<any>  {
    return this._httpClient.get(this.getLoanUrl+'?pageNumber='+pageNum+'&perPage='+perPage)
    .pipe(
      // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
};

getDefaltLoanList(pageNum, perPage, goldRate, silverRate, calcuLationDate) : Observable<any>  {
  return this._httpClient.get(this.getDefaultLoanUrl+'?pageNumber='+pageNum+'&perPage='
  +perPage+'&goldRate='+goldRate+'&silverRate='+silverRate+'&calcuLationDate='+calcuLationDate)
  .pipe(
    // retry(3), // retry a failed request up to 3 times
     catchError(this.handleError) // then handle the error
   );
};



getCustomerLoanList(customerId: string) : Observable<any>  {
  console.log('jhfginside loanlist  s')
  return this._httpClient.get(this.getCustomerLoanUrl.concat('/'+customerId))
  //.pipe(map((response : Response) => <Loan[]>response.json()));
  .pipe(
    // retry(3), // retry a failed request up to 3 times
     catchError(this.handleError) // then handle the error
   );
};



saveLoan(loan :Loan) : Observable<BaseResponse> {
  console.log(JSON.stringify(loan))
    return this._httpClient.post<BaseResponse>(this.getLoanUrl, loan, httpOptions);
  };

  updateLoan(loan :Loan) : Observable<BaseResponse> {
    console.log(JSON.stringify(loan))
      return this._httpClient.put<BaseResponse>(this.getLoanUrl, loan, httpOptions);
    };

  saveLoanPayment(loanPayment :LoanPayment) : Observable<any> {
    return this._httpClient.post<LoanPayment>(this.baseUrl.concat('loanPartialPayment'), loanPayment, httpOptions, ) ;
  };

  getLoanDetail(id : string) : Observable<any>  {
    return this._httpClient.get(this.getLoanUrl.concat('/'+id))
   // .pipe(map((response : Response) => <Loan>response.json()));
   .pipe(
    // retry(3), // retry a failed request up to 3 times
     catchError(this.handleError) // then handle the error
   );
  };

  getLoanPaymentDetailList(id : string) : Observable<any>  {
    return this._httpClient.get(this.getLoanPaymentUrl.concat('/'+id))
    //.pipe(map((response : Response) => <LoanPayment[]>response.json()));
    .pipe(
      // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  };

  getInterest(id : string, date : Date, interestType :string, inputRate: number) : Observable<any>  {
    return this._httpClient.get(this.baseUrl.concat('interest/'+id)+'?interestType='+interestType+'&inputRate='+inputRate)
    //.pipe(map((response : Response) => <InterestResponse>response.json()));
    .pipe(
      // retry(3), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
  };

  deleteLoanPayment(id : string) : Observable<any>  {
    return  this._httpClient.delete(this.baseUrl.concat('loanPartialPayment/').concat(id), httpOptions, ) ;
  };


  searchLoans(searchString: string, pageNo : number, perPage : number) : Observable<any>  {
    return this._httpClient.get<Loan[]>(this.baseUrl+'searchLoans/'+searchString
    +'?pageNumber='+pageNo+'&perPage='+perPage)
    .pipe(
     // retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  };

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
    return throwError(
      'Something bad happened; please try again later.');
  };

}