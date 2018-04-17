import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginModel } from "../../models/LoginModel"
import { Router } from '@angular/router'; 
import { GlobalSharedService } from '../../providers/global';
import { Subscription } from 'rxjs';
import { DishOneCustomerModel } from "../../models/dishOneCustomerModel";
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData : LoginModel = new LoginModel('','');
  myHttpSubscription : Subscription;
  customerDetails: DishOneCustomerModel[];
  constructor(private router: Router, 
    private loginService: LoginService,
    private global: GlobalSharedService) {
      this.global.onMasterEvent.emit(false);
      this.global.isLogoutEvent.emit(true);
   }

  ngOnInit() {
  }

  onSubmit() {
    //this.global.masterEnable = true;

    this.myHttpSubscription = this.loginService.getCustomerDetails().subscribe(response =>{
      if(response.status_code == 200){
        this.customerDetails = response.customer;
        if(this.customerDetails.length > 0){
          let customer: DishOneCustomerModel = this.customerDetails[0];
          if((this.loginData.userName == customer.email || this.loginData.userName == customer.phoneNumber) && this.loginData.password == customer.password && customer.isActivated == 1){
            this.global.dishOneId = customer.id;
            this.global.onMasterEvent.emit(true);
            this.global.isLogoutEvent.emit(false);
            this.router.navigate(['/dashboard']);
          }
          else{
            alert("Invalid Login, UserName or password Incorrect please check!");
          }
        }
        else{
          alert("Invalid Login");
        }
      }
      else{
        alert('Server Error Please Login Later!');
      }
    },error => {
      alert('server error!');
    });
  }

  


  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }

}
