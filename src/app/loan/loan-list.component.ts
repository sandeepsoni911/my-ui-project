import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';
import {Loan} from '../models/loan.model';
import {Router} from '@angular/router';
import {PagerService} from '../services/pagerService.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  loanList: Loan[] ;
  

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
        this.getLoanListDetails(1, 10);
    }
   }

   getLoanListDetails(currentPage, perPageSize){
      this._loanService.getLoanList(currentPage, perPageSize)
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
   
      this.getLoanListDetails(page, 10);
    
    this.pagedItems = this.loanList.slice(this.pager.startIndex, this.pager.endIndex + 1);
}


}
