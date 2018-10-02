import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';
import {Loan} from '../models/loan.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  loanList: Loan[] ;
 
   constructor(private _loanService : LoanService
              ,private _router : Router) { 
     
   }
 
   ngOnInit() {
 
   this._loanService.getLoanList()
                           .subscribe((loanData) => this.loanList = loanData);
 
   }

   onSelect(id){
      this._router.navigate(['/loanDetail', id]);
   }

   createCustomerLoan(custId, custName){
    this._router.navigate(['createLoan', { custId, custName } ]);
  }

}
