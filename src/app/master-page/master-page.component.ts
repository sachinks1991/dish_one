import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSharedService } from '../../providers/global';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
  providers: [FormsModule]
})
export class MasterPageComponent implements OnInit {
  @Input() enabled: boolean;
  searchInput: string = '';
  constructor(private router: Router,private global: GlobalSharedService) { 
  
  }
  ngOnInit() {
  }

  logout(){
    this.global.isLogoutEvent.emit(true);
  }

  onKey(value: string) {
    this.searchInput = value;
  }

  // onSearchClicked(){
  //   let param = this.searchInput;
  //   //this.searchInput = '';
  //   this.router.navigate(['customerdetails', param]);
  // }


}
