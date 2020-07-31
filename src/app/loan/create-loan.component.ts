import { Component, OnInit } from '@angular/core';
import {Loan} from '../models/loan.model';
import {LoanService} from '../services/loan.service';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import { Items } from '../models/items.model';



@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {
  
 displayModalObject : string = 'none'; 
 enteredDate : Date;
 loanCreatedDate:Date = this.getTodayDate();
 successMessage;
 errorResponse;
 customerName;
 validationError;
 submitClicked=false;

 item = new Items();

  itemContainers  =[];

  availableItemType : string[] = [
    "Gold", "Silver", "Platinum", "Diamond"
  ];

  rateOfInterestList : string[] = [
    "1.00", "1.25","1.50","1.75", "2.00","2.25", "2.50","2.75", "3.00","3.25","3.50", "3.75","4.00","4.25", "4.50","4.75", "5"
  ];

  itemQualityList : string[] = [
    "40", "50", "55", "60", "65","70", "75", "80", "85","90","95","99","100"
  ];

  
  loan : Loan = {
  loanId : null,
	loanAmount : null,
	dueDate : null,
	customerId :null,
	rateOfInterest : null,
	comments : null,
	status : null,
	itemName : null,
	itemQuality: null,
	weight : null,
  customerName : null,
  itemType :null,
  createdDate : null,
  khataNumber : null,
  customerCity: null,
  itemsList:null,
  customerAddress:null,
  customerFatherName:null
  }

  
  constructor(private _loanService : LoanService
              , private _route : ActivatedRoute
              ,private _router : Router) {
   
   }

  ngOnInit() {

    let customerIdName = this._route.snapshot.paramMap.get('customerId');

    let customeIdNameSplitted : string[]  = customerIdName.split("-");
    let custId = customeIdNameSplitted[0];
    let custName = customeIdNameSplitted[1];

   // this.customerName=custName;
    this.loan.customerName = custName;
    this.loan.customerId=custId;
    this.itemContainers.push(this.item);
  }

  validateItemList() : string {
    let respnse ='';
    let i =1;
    this.itemContainers.forEach(function(itm){
  
      if(itm.itemName == null ){
        respnse='Please enter Item Name for item '+i;
        return respnse;
      }
  
      if(itm.weight == null ){
        respnse='Please enter Weight for item : '+i;
        return respnse;
      }
      if(itm.marketRate == null ){
        respnse='Please enter marketRate for item : '+i;
      return respnse;
      }
     
      if(itm.itemPrice == null ){
        respnse='Please enter order amount for Item '+i;
        return respnse;
      }
  
     
     i++;
    }
    
    )
    return respnse;
  }
  

  saveLoan(loan: Loan)  { //customerName
   // alert(this.enteredDate)
    let datePipe = new DatePipe('en-US');
    this.loan.dueDate=  datePipe.transform(this.enteredDate, 'yyyy-MM-dd');
    this.loan.createdDate = this.loanCreatedDate;


    let res = this.validateItemList();
    if(res != ''){

      this.validationError=res;
      return;
    } 

    if(!this.validateLoanData(loan)){
      return;
    }
    loan.itemsList=this.itemContainers;
    this.validationError = null;

    
   
    this.submitClicked = true;
    this._loanService.saveLoan(loan)
                          .subscribe(
                            
                            (res) => {

                            if(res != null){

                              if(res.status=='SUCCESS'){
                                 
                                  this.successMessage = "Loan Details Saved Successfully.";
                                  this.displayModalObject = 'block';
                                 // this._router.navigate(['/loanList']);
                              }else{
                                this.errorResponse = res.message;
                              }
                              
                            }
                            
                              },
                            error => {
                              this.errorResponse = 'An Error Occured while saving Loan, Please try again.'
                              console.error(JSON.stringify(error));
                            });

                          console.log(this._loanService);
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if(charCode == 190  || charCode == 46){
    return true
  }
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  
  return true;

}


getDisplayObject() {
   
  return this.displayModalObject;

}

dismissModal()  {
 this.displayModalObject = 'none';
 window.location.reload();
 return this.displayModalObject;
}

dismissModalAndRedirect(){
 this._router.navigate(['/loanList'])
}



validateLoanData(loan : Loan) : boolean {
  if(loan == null){
    this.validationError='Please enter customer details';
    return false;
  }

  if(loan.loanAmount == null || loan.loanAmount == 0){
    this.validationError='Please enter valid loanAmount';
    return false;
  }
  
  if(loan.dueDate == null || loan.dueDate == ''){
    console.log('loan.dueDate : '+ loan.dueDate)
    this.validationError='Please enter dueDate';
    return false;
  }



  if(loan.rateOfInterest == null || loan.rateOfInterest == ''){
     
    this.validationError='Please select rateOfInterest';
    return false;
  }



  if(loan.khataNumber == null ){
    this.validationError='Please enter Khata Number';
    return false;
  }
  
  return true;
}




addMoreItems() {
  console.log(JSON.stringify(this.itemContainers));
  this.item = new Items();
  this.itemContainers.push(this.item);
}

deleteItems() {
  this.itemContainers.pop();
}

calculateSellingAmount(item, i :number){
  console.log(JSON.stringify(item));
  console.log(i);
  let sellingPrice;
  let sellPrice;
  if(item.itemType == 'GOLD' ||  item.itemType == 'Gold' ){
    console.log(JSON.stringify(item));
     sellPrice = Number(item.weight)*Number(item.itemQuality)/100;
     sellingPrice = sellPrice*(item.marketRate/10);
     this.itemContainers[i].itemPrice = sellingPrice;
  }else{
    sellPrice = Number(item.weight)*Number(item.itemQuality)/100;
    sellingPrice = sellPrice*item.marketRate/1000;
    this.itemContainers[i].itemPrice = sellingPrice;
  }
  

}


getTodayDate() {
  let dt = new Date();
  console.log('sdfsf date creating '+dt)
  dt.setMonth(dt.getMonth()+1);
  return dt;
}



}
