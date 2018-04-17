import { Injectable, EventEmitter } from '@angular/core'

@Injectable()
export class GlobalSharedService {
  isLogoutEvent: EventEmitter<boolean> = new EventEmitter();
  onMasterEvent: EventEmitter<boolean> = new EventEmitter();
  dishOneId: number = null;
}
