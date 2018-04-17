import { Component, OnInit } from '@angular/core';
import { AgentExpenseModel } from "../../models/agentExpenseModel";
import { ActivatedRoute, Router } from '@angular/router';
import { PagerService } from '../../providers/pagerService';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { AgentExpenseService } from '../../app/apiServices/agent-expense.service';
import { GlobalSharedService } from '../../providers/global';


@Component({
  selector: 'app-agent-expense-details',
  templateUrl: './agent-expense-details.component.html',
  styleUrls: ['./agent-expense-details.component.css']
})
export class AgentExpenseDetailsComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 10;
  idToEdit : number = null;
  isLoadComplete : boolean;
  agentId: number = null;
  deleteId: number = null;

  myHttpSubscription : Subscription;
  expenseDetails: AgentExpenseModel[];
  tempExpenseDetails: AgentExpenseModel[];

  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;
  constructor(private route: ActivatedRoute,
    private expenseService: AgentExpenseService,
    private global: GlobalSharedService,
    private router: Router, 
    private pagerService: PagerService) {
      this.isLoadComplete = false;
    }

  ngOnInit() {
    this.route.params.subscribe( 
      params => {
        if(params.id != undefined){
          console.log(params.id);
          this.agentId = Number(params.id);
        }
      }
    );
    this.getExpenseDetails();
    this.startDate = new Date();
    this.endDate = new Date();
    this.minDate = new Date("01/01/2017");
    this.maxDate = new Date();
  }

  getExpenseDetails(){
    this.myHttpSubscription = this.expenseService.getById(this.global.dishOneId, this.agentId).subscribe(response =>{
      if(response.status_code == 200){
        this.expenseDetails = response.expense;
        this.tempExpenseDetails = this.expenseDetails;
      }
      else{
        alert('Failed to fetch Agent Expense Details.');
      }
    },error => {
      alert('server error!');
    });
    this.isLoadComplete = true;
  }

  doRefresh(){
    this.expenseDetails = this.tempExpenseDetails;
  }

  onSearchClicked(){
    if(!this.startDate || !this.endDate){
      alert("Please select Start Sate and End Date");
    }
    else if(this.endDate < this.startDate){
      alert("End Date should be less than Start Date");
    }
    else{
      this.expenseDetails = this.tempExpenseDetails.filter(item => new Date(item.dateVal) >=  new Date(this.startDate)  && new Date(item.dateVal) <= moment(this.endDate).add(1, 'days').toDate());
    }
  }

  readyForDelete(id){
    this.deleteId = id;
  }

  delete(){
    this.myHttpSubscription = this.expenseService.deleteById(this.deleteId).subscribe(response =>{
      if(response.status_code == 200){
        alert('Successfully deleted');
        this.getExpenseDetails();
        this.expenseDetails = this.expenseDetails.filter(item => item.id != this.deleteId);
      }
      else{
        alert('server error!');
      }
      
    },error => {
      alert('server error!');
    });
  }

  // navigateToEdit(data: AgentModel){
  //   this.router.navigate(['agentregister', data]);
  // }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }
}