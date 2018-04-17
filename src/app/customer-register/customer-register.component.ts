import { Component, OnInit } from '@angular/core';
import { CustomerModel } from "../../models/customerModel";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomEmailValidator } from '../../customValidators/customEmailValidator';
import { MinLengthValidator } from '../../customValidators/customMinLength';
import { MaxLengthValidator } from '../../customValidators/customMaxLength';
import { AmountValidation } from '../../customValidators/customAmountValidation';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaModel } from '../../Models/AreaModel';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../app/apiServices/customer.service';
import { GlobalSharedService } from '../../providers/global';
import { AreaService } from '../../app/apiServices/area.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  billDates : number[];
  customerAddForm : FormGroup;
  customerDetails : CustomerModel;
  areas: AreaModel[];
  submitText: string;
  myHttpSubscription : Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router, 
    private global: GlobalSharedService,
    private areaService: AreaService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getAreas();
    this.setFormValues();
    this.billDates = [];
    for(let i=1; i<=28; i++){
      this.billDates.push(i);
    }
  }

  setFormValues(){
    this.route.params.subscribe( 
      params => {
        if(params.id == undefined){
          this.customerDetails = {
            id : null,
            dishoneId : this.global.dishOneId,
            stbNumber : '',
            vcNumber : '',
            firstName : '',
            lastName : '',
            phoneNumber : '',
            email : '',
            photo : '',
            address : '',
            pincode : '',
            monthlyBillAmount : 0,
            monthlyBillDate : '',
            isActivated : 1,
            areaName : '',
            areaId: null,
            dateVal: new Date().toString(),
            previousAmount: 0
          }
          this.submitText = "Add Customer";
        }
        else{
          this.customerDetails = {
            id : params.id,
            dishoneId : params.dishoneId,
            stbNumber : params.stbNumber,
            vcNumber : params.vcNumber,
            firstName : params.firstName,
            lastName : params.lastName,
            phoneNumber : params.phoneNumber,
            email : params.email,
            photo : params.photo,
            address : params.address,
            pincode : params.pincode,
            monthlyBillAmount : params.monthlyBillAmount,
            monthlyBillDate : params.monthlyBillDate,
            isActivated : params.isActivated,
            areaName : params.areaName,
            areaId: params.areaId,
            dateVal: params.dateVal,
            previousAmount: params.previousAmount
          }

          if(params.isActivated == "1"){
            this.customerDetails.isActivated = 1;
          }
          else if(params.isActivated == "0"){
            this.customerDetails.isActivated = 0;
          }
          this.submitText = "Save";
          this.setCustomerData();
        }
      }
    );
  } 

  getAreas(){
    this.myHttpSubscription = this.areaService.get().subscribe(response =>{
      if(response.status_code == 200){
        this.areas = response.areas; 
        if(this.areas.length <=0 ){
          alert("first you have to add atleast one area in order to register customer!")
        }
      }
      else{
        //alert('server error');
      }
  },error => {
      //alert('server error');
  });
  }

  setCustomerData(){
    this.customerAddForm.setValue({
      customerActivation: this.customerDetails.isActivated,
      stbNumber: this.customerDetails.stbNumber,
      vcNumber: this.customerDetails.vcNumber,
      firstName: this.customerDetails.firstName,
      lastName: this.customerDetails.lastName,
      phoneNumber: this.customerDetails.phoneNumber,
      email: this.customerDetails.email,
      address: this.customerDetails.address,
      areaId: this.customerDetails.areaId,
      pinCode: this.customerDetails.pincode,
      monthlyBillAmount: this.customerDetails.monthlyBillAmount,
      monthlyBillDate: this.customerDetails.monthlyBillDate
    })
  }

  createForm(){
    this.customerAddForm = this.formBuilder.group({
      customerActivation: true,
      stbNumber: ['', [<any>Validators.required]],
      vcNumber: ['', [<any>Validators.required]],
      firstName: ['', [<any>Validators.required]],
      lastName: ['', [<any>Validators.required]],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), MaxLengthValidator(10), MinLengthValidator(10)])],
      email:  ['', [CustomEmailValidator]],
      address: '',
      areaId: [null, [<any>Validators.required]],
      pinCode: ['', [<any>Validators.required, Validators.pattern('[0-9]*'), MaxLengthValidator(6), MinLengthValidator(6)]],
      monthlyBillAmount: [0, [Validators.required, AmountValidation, Validators.max(100000)]],
      monthlyBillDate: [1, [Validators.required, AmountValidation, Validators.max(28)]],
    })
  }

  onSubmit(){
    this.customerDetails.stbNumber = this.customerAddForm.get('stbNumber').value;
    this.customerDetails.vcNumber = this.customerAddForm.get('vcNumber').value;
    this.customerDetails.firstName = this.customerAddForm.get('firstName').value;
    this.customerDetails.lastName = this.customerAddForm.get('lastName').value;
    this.customerDetails.phoneNumber = this.customerAddForm.get('phoneNumber').value;
    this.customerDetails.email = this.customerAddForm.get('email').value;
    this.customerDetails.address = this.customerAddForm.get('address').value;
    this.customerDetails.pincode = this.customerAddForm.get('pinCode').value;
    //this.customerDetails.isActivated = this.customerAddForm.get('customerActivation').value;
    this.customerDetails.monthlyBillAmount = this.customerAddForm.get('monthlyBillAmount').value;
    this.customerDetails.monthlyBillDate = this.customerAddForm.get('monthlyBillDate').value;
    this.customerDetails.areaId = this.customerAddForm.get('areaId').value;
    let area = this.areas.find(item => item.id == this.customerDetails.areaId);
    this.customerDetails.areaName = area.areaName;
    console.log(this.customerDetails);

   
    this.route.params.subscribe( 
      params => {
        if(params.id == undefined){
          this.myHttpSubscription = this.customerService.register(this.customerDetails).subscribe(response =>{
            if(response.status_code == 200){
              alert('Successfully Added');
              this.reserForm();
            }
            else{
              alert('Failed to add Customer, Try again Later!');
            }
          },error => {
            alert('server error!');
          });
      
        }
        else{
          this.myHttpSubscription = this.customerService.updateById(this.customerDetails).subscribe(response =>{
            if(response.status_code == 200){
              alert('Successfully Saved');
              this.reserForm();
            }
            else{
              alert('Failed to Update Customer, Try again Later!');
            }
          },error => {
            alert('server error!');
          });
        }
      }
    );
  }

  reserForm(){
    this.customerAddForm.setValue({
      customerActivation: true,
      stbNumber: '',
      vcNumber: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email:  '',
      address: '',
      areaId: '',
      pinCode: '',
      monthlyBillAmount: 0,
      monthlyBillDate: 1
    })
  }


  onActivateChange(){
   // this.customerDetails.isActivated = !this.customerDetails.isActivated;
    if(this.customerDetails.isActivated == 1){
      this.customerDetails.isActivated = 0
    }
    else{
      this.customerDetails.isActivated = 1;
    }
    this.customerAddForm.patchValue({
      customerActivation : this.customerDetails.isActivated
    })
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }
}

// export const areas: AreaModel[] = [
//     {
//         id:1,
//         areaName: 'area1',
//         dishoneId: 1,
//         dateVal: new Date().toString()
//     },
//     {
//         id:2,
//         areaName: 'area2',
//         dishoneId: 1,
//         dateVal: new Date().toString()
//     },
//     {
//         id:3,
//         areaName: 'area3',
//         dishoneId: 1,
//         dateVal: new Date().toString()   
//     },
//     {
//         id:4,
//         areaName: 'area4',
//         dishoneId: 1,
//         dateVal: new Date().toString()   
//     },
//     {
//         id:5,
//         areaName: 'area5',
//         dishoneId: 1,
//         dateVal: new Date().toString()   
//     }
// ]
