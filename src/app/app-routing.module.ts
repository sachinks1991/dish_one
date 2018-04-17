import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { LoginComponent }      from './login/login.component';
import { CustomerRegisterComponent }      from './customer-register/customer-register.component';
import { CustomerDetailsComponent }      from './customer-details/customer-details.component';
import { AgentRegisterComponent }      from './agent-register/agent-register.component';
import { AgentDetailsComponent }      from './agent-details/agent-details.component';
import { AgentExpenseComponent }      from './agent-expense/agent-expense.component';
import { PaymentComponent }      from './payment/payment.component';
import { PaymentDetailsComponent }      from './payment-details/payment-details.component';
import { AgentExpenseDetailsComponent } from './agent-expense-details/agent-expense-details.component';
import { AreaComponent }  from './area/area.component';

const routes: Routes = [
  { path: 'area', component: AreaComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'customerdetails/:searchtext', component: CustomerDetailsComponent },
  { path: 'customerdetails', component: CustomerDetailsComponent },
  { path: 'customerregister', component: CustomerRegisterComponent },
  { path: 'customerregister/:customerdata', component: CustomerRegisterComponent },
  
  { path: 'agentdetails/:searchtext', component: AgentDetailsComponent },
  { path: 'agentdetails', component: AgentDetailsComponent },
  { path: 'agentregister', component: AgentRegisterComponent },
  { path: 'agentregister/:agentdata', component: AgentRegisterComponent },
  { path: 'agentexpense/:id', component: AgentExpenseComponent },
  { path: 'agentexpensedetails/:id', component: AgentExpenseDetailsComponent },

  { path: 'payment/:id', component: PaymentComponent },
  { path: 'paymentdetails/:id', component: PaymentDetailsComponent },
  { path: '**', component: LoginComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }