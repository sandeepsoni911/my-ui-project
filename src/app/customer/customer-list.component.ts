import { Component, OnInit } from '@angular/core';
import {Customer} from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {PagerService} from '../services/pagerService.service';

@Component({
  
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers:[CustomerService]
})
export class CustomerListComponent implements OnInit {

 customerList: Customer[] ;
 errorResponseOnSearch;
 noSearchResultFound;
 emptySearchString;
 errorResponse;
 totalRecords;
 perPage;
 currentPage = 1;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];



  constructor(private _customerService : CustomerService
              , private _router : Router
              , private pagerService: PagerService) { 
    
  }

  ngOnInit() {

  //this._customerService.getCustomers()
                         // .subscribe((customerData) => this.customerList = customerData);

   if(this.currentPage == 1){
    this.getCustomerList(this.currentPage, 10);
   } 
 
  }

  getCustomerList(pageNumber : number, perPage : number){
    console.log("Invoking getCustomerList for Page "+ pageNumber +" perPage : "+perPage);
    this._customerService.getCustomersWithPagination(pageNumber, perPage).subscribe(
      res => {
        console.log('CustomerList response with pagination');
        console.log(res);
        if(res != null){
          
          if(res.status == 'SUCCESS'){
            this.customerList = res.data;
            this.totalRecords = res.totalCount;
            console.log('totalRecords is '+this.totalRecords)
            this.perPage = res.perPage;
            // initialize to page 1
            this.setPageOnLoad(res.pageNumber);
          }else{
            this.errorResponse = res.message;
          }
        }
       
      },
      err => {
        this.errorResponse = JSON.stringify(err.message);
        console.log(err)
      }
  
     )
  }

  setPageOnLoad(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalRecords, page, this.perPage);
    this.currentPage = page;
    //console.log('Current page is : '+page);
    // get current page of items
    this.pagedItems = this.customerList.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
   //if(page != 1){
      this.getCustomerList(page, 10);
   // }
    
    this.pagedItems = this.customerList.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  createCustomerLoan(custId){
    this._router.navigate(['/createLoan', custId]);
  }

  fetchLoanDetails(id){
    this._router.navigate(['/customerLoanDetail', id]);
  }



  searchCustomer(searchString : string){
    if(searchString == null || searchString ==''){
      this.emptySearchString = "Please enter any name to search."

      return;
    }
    this.emptySearchString = null;
    this._customerService.searchCustomers(searchString).subscribe(
      (customerData) => 
      {
        if(customerData != null){
          this.customerList = customerData
          this.noSearchResultFound = null;
        }else{
          this.customerList = null;
          this.noSearchResultFound = "No Customer found with given name";
        }
       
      },
      error => { this.handleError(error);
        this.errorResponseOnSearch = JSON.stringify(error);  
       }

    )
   
    console.log('searchString is '+searchString)
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
