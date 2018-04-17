import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AgentModel } from "../../models/agentModel";
import { AgentService } from '../../app/apiServices/agent.service';
import { GlobalSharedService } from '../../providers/global';
import { CustomerService } from '../../app/apiServices/customer.service';
import { CustomerModel } from "../../models/customerModel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myHttpSubscription : Subscription;
  totalAgents: number = null;
  totalCustomers: number = null;
  totalAmount: number = null;

  agentDetails: AgentModel[];
  customerDetails: CustomerModel[];
  constructor(private formBuilder: FormBuilder,
    private global: GlobalSharedService,
    private customerService: CustomerService,
    private agentService: AgentService) { }

  ngOnInit() {
    this.getTotalAgents();
    this.getTotalCustomers();
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }

  getTotalAgents(){
    this.myHttpSubscription = this.agentService.getById(this.global.dishOneId).subscribe(response =>{
      if(response.status_code == 200){
        this.agentDetails = response.agent;
        this.totalAgents = this.agentDetails.length;
      }
      else{
        //alert('server error');
      }
    },error => {
      //this.isLoadComplete = true;
      //alert('server error');
    });
  }

  getTotalCustomers(){
    this.myHttpSubscription = this.customerService.getById(this.global.dishOneId).subscribe(response =>{
        if(response.status_code == 200){
          this.customerDetails = response.customers;
          this.totalCustomers = this.customerDetails.length;
        }
        else{
          //alert('server error');
        }
    },error => {
        //alert('server error');
    });
  }

  // getTodaysPayment(){
  //   this.myHttpSubscription = this.customerService.get().subscribe(response =>{
  //       if(response.status_code == 200){
  //         this.customerDetails = response.customer;
  //         this.totalCustomers = this.customerDetails.length;
  //       }
  //       else{
  //         //alert('server error');
  //       }
  //   },error => {
  //       //alert('server error');
  //   });
  // }
}
