import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { PagerService } from 'src/app/services/pagerService.service';
import { Loan } from 'src/app/models/loan.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-default-loan-list',
  templateUrl: './default-loan-list.component.html',
  styleUrls: ['./default-loan-list.component.css']
})
export class DefaultLoanListComponent implements OnInit {

  loanList: any[] ;

  goldRate = 40000;
  silverRate = 70000;
  calcuLationDate : Date = new Date();
  

  //Pagination & Search attributes
  errorResponseOnSearch;
  noSearchResultFound;
  emptySearchString;
  searchString;
  filterInfo: boolean;
  errorResponse;
  totalRecords;
  perPage;
  
  currentPage = 1;
   // pager object
   pager: any = {};
 
   // paged items
   pagedItems: any[];




   constructor(private _loanService : LoanService
              ,private _router : Router
              , private pagerService: PagerService) { 
     
   }
 
   ngOnInit() {
    if(this.currentPage == 1){
       
    } 
   }

   getDefaultLoanListDetails(currentPage, perPageSize, goldRate, silverRate, calcuLationDate){

    let datePipe = new DatePipe('en-US');
   let calcuLationDateStr =  datePipe.transform(this.calcuLationDate, 'yyyy-MM-dd');
      this._loanService.getDefaltLoanList(currentPage, perPageSize, goldRate, silverRate, calcuLationDateStr)
                           .subscribe(
                      //(loanData) => this.loanList = loanData
                      res => {
      
                        console.log(res);
                        if(res != null){
                          
                          if(res.status == 'SUCCESS'){
                            this.loanList = res.data;
                            this.totalRecords = res.totalCount;
                            console.log('totalRecords is '+this.totalRecords)
                            this.perPage = res.perPage;
                            // initialize to page 1
                            this.setPageOnLoad(res.pageNumber, res.totalCount);
                          }else{
                            this.errorResponse = res.message;
                          }
                        }
                       
                      },
                      err => {
                        this.errorResponse = JSON.stringify(err.message);
                        console.log(err)
                      }
                  );
   }


   

   onSelect(id){
      this._router.navigate(['/loanDetail', id]);
   }

   createCustomerLoan(custId, custName){
    this._router.navigate(['createLoan', custId+'-'+custName ]);
  }

  setPageOnLoad(page: number, totalCount : number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(totalCount, page, this.perPage);
    this.currentPage = page;
    //console.log('Current page is : '+page);
    // get current page of items
    this.pagedItems = this.loanList.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalRecords, page, this.perPage);
    this.currentPage = page;
    //console.log('Current page is : '+page);
    // get current page of items
   if(this.searchString != null){
    this.searchLoans(this.searchString);
   }else{
    this.getDefaultLoanListDetails(page, 10, this.goldRate, this.silverRate, this.calcuLationDate);
   }
      
    
    this.pagedItems = this.loanList.slice(this.pager.startIndex, this.pager.endIndex + 1);
}


searchLoans(searchString : string){
  if(searchString == null || searchString ==''){
    this.emptySearchString = "Please enter any name to search."

    return;
  }
  this.emptySearchString = null;
  this._loanService.searchLoans(searchString, this.currentPage, this.perPage).subscribe(
    
    res => {
      console.log(res);
      if(res != null){
        
        if(res.status == 'SUCCESS'){
          this.loanList = res.data;
          this.totalRecords = res.totalCount;
          this.noSearchResultFound = null;
          this.filterInfo = true;
          this.perPage = res.perPage;
          // initialize to page 1
          this.setPageOnLoad(res.pageNumber, res.totalCount);
        }else{
          this.errorResponse = res.message;
        }
      }
     
    },
    err => {
      this.errorResponseOnSearch = JSON.stringify(err);  
      console.log(err)
    }

  )
 
  
}

/* To clear serch filters*/
clearFilter(){
  this.getDefaultLoanListDetails(this.currentPage, 10, this.goldRate, this.silverRate, this.calcuLationDate);
  this.searchString = null;
  this.filterInfo = false;
}

fetchDefaultLoans(){
  this.getDefaultLoanListDetails(1, 10, this.goldRate, this.silverRate, this.calcuLationDate);
}

}
