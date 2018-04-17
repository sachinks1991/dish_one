import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomEmailValidator } from '../../customValidators/customEmailValidator';
import { MinLengthValidator } from '../../customValidators/customMinLength';
import { MaxLengthValidator } from '../../customValidators/customMaxLength';
import { AmountValidation } from '../../customValidators/customAmountValidation';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentDetailsModel } from '../../Models/PaymentModel';
import { GlobalSharedService } from '../../providers/global';
import { PaymentService } from '../../app/apiServices/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm : FormGroup;
  payment: PaymentDetailsModel;
  myHttpSubscription : Subscription;
  amountDue: number = 0;
  constructor(private route: ActivatedRoute,
    private global: GlobalSharedService,
    private router: Router,
    private paymentService: PaymentService,
     private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
      this.route.params.subscribe( 
        params => {
          if(params.id != undefined){
            console.log(params.id);
            this.payment = {
              id : null,
              dishoneId : this.global.dishOneId,
              customerId : params.id,
              agentId : -1,
              amountPaid : null,
              amountDue : null,
              dateVal: new Date().toString()
            }
          }
        }
      );
  }

  createForm(){
    this.paymentForm = new FormGroup({
      payment: new FormControl(0, [Validators.required, AmountValidation, Validators.max(100000)])
    })
  }

  onSubmit(){
    this.payment.amountPaid = this.paymentForm.get('payment').value;
    this.payment.amountDue = this.amountDue - this.payment.amountPaid;
    if(this.payment.amountPaid > 0){
      this.myHttpSubscription = this.paymentService.register(this.payment).subscribe(response =>{
          if(response.status_code == 200){
            this.paymentForm.patchValue({
              payment: null
            })
            alert('Successfully Added');
          }
          else{
            alert('Failed to Save, Try again Later!');
          }
        },error => {
          alert('server error!');
        });
    }
    else{
      alert("Amount should be greater than 0");
    }
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }

}

