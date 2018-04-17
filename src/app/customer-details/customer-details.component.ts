import { Component, OnInit } from '@angular/core';
import { CustomerModel } from "../../models/customerModel";
import { ActivatedRoute, Router } from '@angular/router';
import { PagerService } from '../../providers/pagerService';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../app/apiServices/customer.service';
import { GlobalSharedService } from '../../providers/global';
// import * as _ from 'underscore';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 10;
  idToEdit : number = null;
  isLoadComplete : boolean;
  deleteId: number;

  myHttpSubscription : Subscription;
  customerDetails: CustomerModel[];
  tempCustomerDetails: CustomerModel[];

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private global: GlobalSharedService,
              private customerService: CustomerService,
              private pagerService: PagerService) {
                this.isLoadComplete = false;
  }

  ngOnInit() {
    this.getCustomerDetails();
  }

  getCustomerDetails(){
    this.myHttpSubscription = this.customerService.getById(this.global.dishOneId).subscribe(response =>{
        if(response.status_code == 200){
          this.customerDetails = response.customers;
          this.tempCustomerDetails = this.customerDetails;
          this.isLoadComplete = true;  
        }
        else{
          this.isLoadComplete = true;  
          alert('server error');
        }
    },error => {
      this.isLoadComplete = true;
        alert('server error');
    });
  }

  doRefresh(){
    this.getCustomerDetails();
  }

  onInput(searchText){
    this.customerDetails = this.tempCustomerDetails.filter(item => item.stbNumber == searchText || 
                  item.vcNumber == searchText || 
                  item.firstName.toLowerCase() + " " + item.lastName.toLowerCase() == searchText.toLowerCase() || 
                  item.firstName.toLowerCase() == searchText.toLowerCase() || 
                  item.lastName.toLowerCase() == searchText.toLowerCase() || item.phoneNumber == searchText);

    if(searchText == null || searchText == ""){
      this.customerDetails = this.tempCustomerDetails;
    }
  }


  navigateToEdit(data: CustomerModel){
    this.router.navigate(['customerregister', data]);
  }

  readyForDelete(id){
    this.deleteId = id;
  }

  delete(){
    this.myHttpSubscription = this.customerService.deleteById(this.deleteId).subscribe(response =>{
      if(response.status_code == 200){
        alert('Successfully deleted');
        this.getCustomerDetails();
        this.customerDetails = this.customerDetails.filter(item => item.id != this.deleteId);
      }
      else{
        alert('server error');
      }
      
    },error => {
      alert('server error!');
    });
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }
}
