import { Component, OnInit } from '@angular/core';
import { PaymentDetailsModel } from "../../models/paymentModel";
import { ActivatedRoute, Router } from '@angular/router';
import { PagerService } from '../../providers/pagerService';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../app/apiServices/payment.service';
import { GlobalSharedService } from '../../providers/global';
import * as moment from 'moment';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 10;
  idToEdit : number = null;
  isLoadComplete : boolean;

  myHttpSubscription : Subscription;
  paymentDetails: PaymentDetailsModel[];
  tempPaymentDetails: PaymentDetailsModel[];

  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;

  customerId: number = null;

  deleteId: number = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private global: GlobalSharedService,
    private paymentService: PaymentService,
    private pagerService: PagerService) { 
      this.isLoadComplete = false;
    }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.minDate = new Date("01/01/2017");
    this.maxDate = new Date();
    this.route.params.subscribe( 
      params => {
        if(params.id != undefined){
          console.log(params.id);
          this.customerId = Number(params.id);
        }
      }
    );
    this.getPaymentDetails();
  }

  getPaymentDetails(){
    this.myHttpSubscription = this.paymentService.getById(this.global.dishOneId, this.customerId).subscribe(response =>{
      if(response.status_code == 200){
        this.paymentDetails = response.payment;
        this.tempPaymentDetails = this.paymentDetails;
        this.isLoadComplete = true;
      }
      else{
        alert('Failed to Save, Try again Later!');
        this.isLoadComplete = true;
      }
    },error => {
      alert('server error!');
      this.isLoadComplete = true;
    });
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }

  doRefresh(){
    this.paymentDetails = this.tempPaymentDetails;
  }

  onSearchClicked(){
    if(!this.startDate || !this.endDate){
      alert("Please select Start Sate and End Date");
    }
    else if(this.endDate < this.startDate){
      alert("End Date should be less than Start Date");
    }
    else{
      this.paymentDetails = this.tempPaymentDetails.filter(item => new Date(item.dateVal) >=  new Date(this.startDate)  && new Date(item.dateVal) <= moment(this.endDate).add(1, 'days').toDate());
    }
  }

  readyForDelete(id){
    this.deleteId = id;
  }

  delete(){
    this.myHttpSubscription = this.paymentService.deleteById(this.deleteId).subscribe(response =>{
      if(response.status_code == 200){
        alert('Successfully deleted');
        this.getPaymentDetails();
        this.paymentDetails = this.paymentDetails.filter(item => item.id != this.deleteId);
      }
      else{
        alert('server error');
      }
      
    },error => {
      alert('server error!');
    });
  }


}
