import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-payment-dashboard',
  templateUrl: './loan-payment-dashboard.component.html',
  styleUrls: ['./loan-payment-dashboard.component.css']
})
export class LoanPaymentDashboardComponent implements OnInit {
  totalIncomeFromLoans = '86900';

  constructor() { }

  ngOnInit() {
  }

  public lineChartData:Array<any> = [
    {data: [10200, 12500, 9300, 8800, 6900, 7500, 8520, 6800, 7350, 9030], label: 'Monthly Income from loans '},
    
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April'
                                      , 'May', 'June', 'July', 'August','September','October'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#F9BC8F',
      borderColor: '#772F01',
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
