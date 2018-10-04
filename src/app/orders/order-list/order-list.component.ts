import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order.model';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PagerService} from '../../services/pagerService.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList : Order[];

  todaysDate : Date = new Date();

  errorResponse;
  totalRecords;
  perPage;
  
  currentPage = 1;
   // pager object
   pager: any = {};
 
   // paged items
   pagedItems: any[];
 


  constructor(private _orderService : OrderService
            , private _router : Router
            , private pagerService: PagerService) { }

  ngOnInit() {

   this.getOrderListDetials(1, 10)
    
  }

  getOrderListDetials(pageNum, perPage){

    this._orderService.getOrderList(pageNum, perPage).subscribe(
     // (orderData)=> this.orderList = orderData
     res => {
      console.log(res);
      if(res != null){
        
        if(res.status == 'SUCCESS'){
          this.orderList = res.data;
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


  getOrderDetails(id){
    this._router.navigate(['/orderDetails', id]);
 }

 createOrderForCustomer(custId, custName){
  this._router.navigate(['/createOrder', custId+'-'+custName]);
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
  this.pagedItems = this.orderList.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
 
    this.getOrderListDetials(page, 10);
  
  this.pagedItems = this.orderList.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

}
