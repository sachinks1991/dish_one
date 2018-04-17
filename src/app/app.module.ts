import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

//bootstrap modueles
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PaymentComponent } from './payment/payment.component';
import { AppRoutingModule } from './/app-routing.module';
import { MasterPageComponent } from './master-page/master-page.component';
import { GlobalSharedService } from '../providers/global';
import { PagerService } from '../providers/pagerService';

//services
import { HttpModule } from '@angular/http';
import { CONSTANTS, AppUrl  } from './app-url-constant';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgentRegisterComponent } from './agent-register/agent-register.component';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { AgentExpenseComponent } from './agent-expense/agent-expense.component';
import { AgentExpenseDetailsComponent } from './agent-expense-details/agent-expense-details.component';
import { MomentModule } from 'angular2-moment';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
//import { PaymentDetailService } from '../pages/payment-details/payment-details.service';

import { AgentService } from '../app/apiServices/agent.service';
import { AgentExpenseService } from '../app/apiServices/agent-expense.service';
import { AreaService } from '../app/apiServices/area.service';
import { CustomerService } from '../app/apiServices/customer.service';
import { PaymentService } from '../app/apiServices/payment.service';
import { LoginService } from './login/login.service';
import { AreaComponent } from './area/area.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CustomerRegisterComponent,
    CustomerDetailsComponent,
    PaymentComponent,
    MasterPageComponent,
    AgentRegisterComponent,
    AgentDetailsComponent,
    AgentExpenseComponent,
    AgentExpenseDetailsComponent,
    PaymentDetailsComponent,
    AreaComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentModule,
    BrowserAnimationsModule,
    // BsDropdownModule.forRoot(),
    // TooltipModule.forRoot(),
   NgbModule.forRoot(),
    // ModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [GlobalSharedService, PagerService, AppUrl, LoginService,
    AreaService, CustomerService, AgentService, AgentExpenseService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
