import { Component } from '@angular/core';
import { GlobalSharedService } from '../providers/global';
import { Router, NavigationStart, NavigationEnd } from '@angular/router'; 
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public masterEnable : boolean = false;
  public isLogout: boolean;

  constructor(private global: GlobalSharedService, private router: Router){
    //this.global.isLogoutEvent.emit(true);
    global.onMasterEvent.subscribe((showMaster) => { this.masterEnable = showMaster });
    global.isLogoutEvent.subscribe(
      (isLogout) => { 
        this.isLogout = isLogout; 
        if(this.isLogout || this.isLogout == undefined){
          this.router.navigate(['/login']);
        }    
      }
    );

    //performing logout operation (not allowing user to browse other components except login after logout opertaion)
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(this.isLogout || this.isLogout == undefined){
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
