import { Component, OnInit } from '@angular/core';
import { AgentModel } from "../../models/agentModel";
import { ActivatedRoute, Router } from '@angular/router';
import { PagerService } from '../../providers/pagerService';
import { Subscription } from 'rxjs';
import { AgentService } from '../../app/apiServices/agent.service';
import { GlobalSharedService } from '../../providers/global';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 10;
  isLoadComplete : boolean;
  deleteId: number;

  myHttpSubscription : Subscription;
  agentDetails: AgentModel[];
  tempAgentDetails: AgentModel[];
  constructor(private route: ActivatedRoute,
    private router: Router, 
    private global: GlobalSharedService,
    private agentService: AgentService,
    private pagerService: PagerService) { 
      this.isLoadComplete = false;
    }

  ngOnInit() {
    this.getAgentDetails();
  }

  getAgentDetails(){
    this.myHttpSubscription = this.agentService.getById(this.global.dishOneId).subscribe(response =>{
        if(response.status_code == 200){
          this.agentDetails = response.agent;
          this.tempAgentDetails = this.agentDetails;
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
    this.getAgentDetails();
  }

  onInput(searchText){
    this.agentDetails = this.tempAgentDetails.filter(item => 
                  item.firstName.toLowerCase() + " " + item.lastName.toLowerCase() == searchText.toLowerCase() || 
                  item.firstName.toLowerCase() == searchText.toLowerCase() || 
                  item.lastName.toLowerCase() == searchText.toLowerCase() || item.phoneNumber == searchText ||
                  item.email == searchText);

    if(searchText == null || searchText == ""){
      this.agentDetails = this.tempAgentDetails;
    }
  }


  navigateToEdit(data: AgentModel){
    this.router.navigate(['agentregister', data]);
  }

  ngOnDistroy(){
    this.myHttpSubscription.unsubscribe();
  }

  readyForDelete(id){
    this.deleteId = id;
  }

  delete(){
    this.myHttpSubscription = this.agentService.deleteById(this.deleteId).subscribe(response =>{
      if(response.status_code == 200){
        alert('Successfully deleted');
        this.getAgentDetails();
        this.agentDetails = this.agentDetails.filter(item => item.id != this.deleteId);
      }
      else{
        alert('server error');
      }
      
    },error => {
      alert('server error!');
    });
  }

}
