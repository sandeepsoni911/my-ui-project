import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order.model';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList : Order[];

  todaysDate : Date = new Date();

  constructor(private _orderService : OrderService
            , private _router : Router) { }

  ngOnInit() {

    this._orderService.getOrderList().subscribe((orderData)=> this.orderList = orderData);
    
  }


  getOrderDetails(id){
    this._router.navigate(['/orderDetails', id]);
 }

 createOrderForCustomer(custId){
  this._router.navigate(['/createOrder', custId]);
}

}
