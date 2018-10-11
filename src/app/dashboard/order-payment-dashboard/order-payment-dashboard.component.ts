import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-payment-dashboard',
  templateUrl: './order-payment-dashboard.component.html',
  styleUrls: ['./order-payment-dashboard.component.css']
})
export class OrderPaymentDashboardComponent implements OnInit {

  totalIncomeFromOrders = '810780';

  constructor() { }

  ngOnInit() {
  }
  public lineChartData:Array<any> = [
    {data: [49200, 58500, 89300, 94800, 130900, 116500, 88520, 69800, 51230, 62030], label: 'Monthly Income from Orders '},
    
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April'
                                      , 'May', 'June', 'July', 'August','September','October'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#8FD4F9',
      borderColor: '#011C77',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
}
