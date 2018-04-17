import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AmountValidation } from '../../customValidators/customAmountValidation';
import { AgentExpenseModel } from "../../models/agentExpenseModel";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgentExpenseService } from '../../app/apiServices/agent-expense.service';
import { GlobalSharedService } from '../../providers/global';

@Component({
  selector: 'app-agent-expense',
  templateUrl: './agent-expense.component.html',
  styleUrls: ['./agent-expense.component.css']
})
export class AgentExpenseComponent implements OnInit {
  expenseForm : FormGroup;
  expenseDetail : AgentExpenseModel;
  myHttpSubscription : Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private global: GlobalSharedService,
    private expenseService: AgentExpenseService) { }

  ngOnInit() {
    this.route.params.subscribe( 
      params => {
        if(params.id != undefined){
          this.expenseDetail = {
            id : null,
            dishoneId : this.global.dishOneId,
            agentId: Number(params.id),
            description : '',
            amount: 0,
            dateVal: new Date().toString()
          }
        }
      }
    );

    this.createForm();
  }

  createForm(){
    this.expenseForm = new FormGroup({
      description : new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required, AmountValidation, Validators.max(100000)])
    })
  }

  onAmountFocus(){
    this.expenseForm.patchValue({
      amount: ''
    })
  }

  resetForm(){
    this.expenseForm.patchValue({
      description : '',
      amount: null
    })
  }

  onSubmit(){
    this.expenseDetail.description = this.expenseForm.get('description').value;
    this.expenseDetail.amount = this.expenseForm.get('amount').value;

    this.myHttpSubscription = this.expenseService.register(this.expenseDetail).subscribe(response =>{
        if(response.status_code == 200){
          alert('Successfully Added');
          this.resetForm();
        }
        else{
          alert('Failed to add Agent Expense Try again Later!');
        }
      },error => {
        alert('server error!');
      });
    console.log(this.expenseDetail);
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }

}
