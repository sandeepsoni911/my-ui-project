import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css']
})
export class OrderDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public pieChartLabels:string[] = ['Customer with only Orders', 'Customer with only Loan'
                                    , 'Customer with Loan & Orders'];
  public pieChartData:number[] = [300, 500, 200];
  public pieChartType:string = 'pie';

  public lineChartDataForOrders:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40, 37,45, 49, 77,84], label: '2017'},
    {data: [28, 48, 40, 19, 86, 27, 60, 69], label: '2018'}
  ];


  public lineChartDataForLoans:Array<any> = [
    {data: [20, 38, 45, 34, 36, 55, 25, 37,45, 39, 67,54], label: '2017'},
    {data: [28, 48, 50, 39, 46, 57, 30, 49], label: '2018'}
  ];


  public lineChartLabels:Array<any> = ['January', 'February', 'March'
                                        , 'April', 'May', 'June', 'July'
                                        ,'August', 'September', 'October','November','December'];
  public lineChartType:string = 'bar';


  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'line' : 'bar';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#ffd699',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#ccb3ff',
      borderColor: 'rgba(137,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  
}
