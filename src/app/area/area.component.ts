import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AreaModel } from '../../Models/areaModel';
import { GlobalSharedService } from '../../providers/global';
import { AreaService } from '../../app/apiServices/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  areaForm : FormGroup;
  areaData: AreaModel;
  myHttpSubscription : Subscription;
  areaId: number = null

  isLoadComplete : boolean;
  areaDetails: AreaModel[];
  deleteId: number = null;

  constructor(private route: ActivatedRoute,
    private global: GlobalSharedService,
    private router: Router,
    private areaService: AreaService,
     private formBuilder: FormBuilder) { 
        this.isLoadComplete = false;
     }

  ngOnInit() {
    this.createForm();

    this.areaData = {
      id : null,
      dishoneId : this.global.dishOneId,
      areaName : '',
      dateVal : new Date().toString()
    }

    this.getAreaDetails();
        
  }

  getAreaDetails(){
    this.myHttpSubscription = this.areaService.get().subscribe(response =>{
      if(response.status_code == 200){
        this.areaDetails = response.areas;
        this.isLoadComplete = true;
      }
      else{
        alert('Failed to Retrive Area Data!');
        this.isLoadComplete = true;
      }
    },error => {
      alert('server error!');
      this.isLoadComplete = true;
    });
  }

  createForm(){
    this.areaForm = new FormGroup({
      area: new FormControl(0, [Validators.required])
    })
  }

  onSubmit(){
    this.areaData.areaName = this.areaForm.get('area').value;
    this.myHttpSubscription = this.areaService.register(this.areaData).subscribe(response =>{
        if(response.status_code == 200){
          this.areaForm.patchValue({
            area: null
          })
          this.getAreaDetails();
          alert('Successfully Added');
        }
        else{
          alert('Failed to Save, Try again Later!');
        }
      },error => {
        alert('server error!');
      });
  }

  readyForDelete(id){
    this.deleteId = id;
  }

  delete(){
    this.myHttpSubscription = this.areaService.deleteById(this.deleteId).subscribe(response =>{
      if(response.status_code == 200){
        alert('Successfully deleted');
        this.areaDetails = this.areaDetails.filter(item => item.id != this.deleteId);
        this.getAreaDetails();
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
