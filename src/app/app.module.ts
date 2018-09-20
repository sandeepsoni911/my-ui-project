import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';




 



import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { CreateCustomerComponent } from './customer/create-customer.component';
import {CustomerService} from './services/customer.service';
import { LoanListComponent } from './loan/loan-list.component';
import { LoanService } from './services/loan.service';
import { CreateLoanComponent } from './loan/create-loan.component';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './util/date-picker/date-picker.component';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { CustomerLoanDetailComponent } from './loan/customer-loan-detail.component';
import { HomePageComponent } from './home/home-page.component';
import { CustomerDetailsComponent } from './customer/customer-details.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './services/auth.service';
import { PartialPaymentComponent } from './loan/partial-payment.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';



const appRoutes : Routes = [
{path: 'customerList' , component :CustomerListComponent, canActivate : [AuthGuard] },
{path: 'createCustomer', component: CreateCustomerComponent, canActivate : [AuthGuard] },
{path: 'loanList', component: LoanListComponent, canActivate : [AuthGuard] },
{path: 'createLoan/:customerId', component : CreateLoanComponent, canActivate : [AuthGuard] },
{path: 'loanDetail/:id', component: LoanDetailComponent, canActivate : [AuthGuard] },
{path: 'customerLoanDetail/:id', component: CustomerLoanDetailComponent, canActivate : [AuthGuard] },
{path: 'customerDetails/:id', component: CustomerDetailsComponent, canActivate : [AuthGuard] },
{path: 'login', component: LoginComponent},
{path: 'home', component: HomePageComponent},
{path: 'orderDetails/:id', component : OrderDetailsComponent},
{path: 'createOrder/:cutomerId', component : CreateOrderComponent},
{path: 'orderList', component: OrderListComponent},

{path: '', redirectTo: '/home', pathMatch: 'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CreateCustomerComponent,
    LoanListComponent,
    CreateLoanComponent,
    DatePickerComponent,
    LoanDetailComponent,
    CustomerLoanDetailComponent,
    HomePageComponent,
    CustomerDetailsComponent,
    LoginComponent,
    PartialPaymentComponent,
    OrderListComponent,
    OrderDetailsComponent,
    CreateOrderComponent
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    NgbModule.forRoot(),
    
  
  ],
  providers: [AuthService, CustomerService, LoanService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule {

  model;

 }
