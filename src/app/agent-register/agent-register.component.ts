import { Component, OnInit } from '@angular/core';
import { AgentModel } from "../../models/agentModel";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomEmailValidator } from '../../customValidators/customEmailValidator';
import { MinLengthValidator } from '../../customValidators/customMinLength';
import { MaxLengthValidator } from '../../customValidators/customMaxLength';
import { AmountValidation } from '../../customValidators/customAmountValidation';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaModel } from '../../Models/AreaModel';
import { Subscription } from 'rxjs';
import { AgentService } from '../../app/apiServices/agent.service';
import { GlobalSharedService } from '../../providers/global';


@Component({
  selector: 'app-agent-register',
  templateUrl: './agent-register.component.html',
  styleUrls: ['./agent-register.component.css']
})
export class AgentRegisterComponent implements OnInit {
  agentAddForm : FormGroup;
  agentDetails : AgentModel;
  submitText: string;
  myHttpSubscription : Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router, 
    private global: GlobalSharedService,
    private agentService: AgentService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.setFormValues();
  }

  resetForm(){
    this.agentAddForm.setValue({
      firstName : '',
      lastName: '',
      phoneNumber:'',
      email: '',
      address: '',
      pinCode: '',
      isActivated: 1,
      password: '',
    })
  }

  setFormValues(){
    this.route.params.subscribe( 
      params => {
        if(params.id == undefined){
          this.agentDetails = {
            id : null,
            dishoneId : this.global.dishOneId,
            firstName : '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            pincode: '',
            photo: '',
            isActivated: 1,
            password: '',
            location: '',
            dateVal: new Date().toString()
          }
          this.submitText = "Add Agent";
        }
        else{
          this.agentDetails = {
            id : params.id,
            dishoneId : params.dishoneId,
            firstName : params.firstName,
            lastName: params.lastName,
            phoneNumber: params.phoneNumber,
            email: params.email,
            address: params.address,
            pincode: params.pincode,
            photo: params.photo,
            isActivated: params.isActivated,
            password: params.password,
            location: params.location,
            dateVal: params.dateVal
          }

          if(params.isActivated == "1"){
            this.agentDetails.isActivated = 1;
          }
          else if(params.isActivated == "0"){
            this.agentDetails.isActivated = 0;
          }
          this.submitText = "Save";
          this.setCustomerData();
        }
      }
    );
    
  } 

  setCustomerData(){
    this.agentAddForm.setValue({
      firstName : this.agentDetails.firstName,
      lastName: this.agentDetails.lastName,
      phoneNumber: this.agentDetails.phoneNumber,
      email: this.agentDetails.email,
      address: this.agentDetails.address,
      pinCode: this.agentDetails.pincode,
      isActivated: this.agentDetails.isActivated,
      password: this.agentDetails.password
    })
  }

  createForm(){
    this.agentAddForm = this.formBuilder.group({
      firstName : ['', [<any>Validators.required]],
      lastName: ['', [<any>Validators.required]],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), MaxLengthValidator(10), MinLengthValidator(10)])],
      email: ['', [CustomEmailValidator]],
      address: '',
      pinCode: '',
      isActivated: 1,
      password: ['', [<any>Validators.required]]
    })
  }

  onSubmit(){
    this.agentDetails.firstName = this.agentAddForm.get('firstName').value;
    this.agentDetails.lastName = this.agentAddForm.get('lastName').value;
    this.agentDetails.phoneNumber = this.agentAddForm.get('phoneNumber').value;
    this.agentDetails.email = this.agentAddForm.get('email').value;
    this.agentDetails.address = this.agentAddForm.get('address').value;
    this.agentDetails.pincode = this.agentAddForm.get('pinCode').value;
    //this.agentDetails.isActivated = this.agentAddForm.get('isActivated').value;
    this.agentDetails.password = this.agentAddForm.get('password').value;

    //saving and updating in server
    this.route.params.subscribe( 
      params => {
        if(params.id == undefined){
          this.myHttpSubscription = this.agentService.register(this.agentDetails).subscribe(response =>{
            if(response.status_code == 200){
              alert('Successfully Added');
              this.resetForm();
            }
            else{
              alert('Failed to add Agent, Try again Later!');
            }
          },error => {
            alert('server error!');
          });
      
        }
        else{
          this.myHttpSubscription = this.agentService.updateById(this.agentDetails).subscribe(response =>{
            if(response.status_code == 200){
              alert('Successfully Saved');
              this.resetForm();
            }
            else{
              alert('Failed to Update Agent, Try again Later!');
            }
          },error => {
            alert('server error!');
          });
        }
      }
    );
  }


  onActivateChange(){
    //this.agentDetails.isActivated = !this.agentDetails.isActivated;
    if(this.agentDetails.isActivated == 1){
      this.agentDetails.isActivated = 0
    }
    else{
      this.agentDetails.isActivated = 1;
    }
    this.agentAddForm.patchValue({
      isActivated : this.agentDetails.isActivated
    })
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }


}
