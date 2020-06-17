import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-saved-users',
  templateUrl: './saved-users.component.html',
  styleUrls: ['./saved-users.component.scss' , 
              '../../../../_shared/css/registration_shared_styles.scss']
})
export class SavedUsersComponent implements OnInit {

  @Output() result:EventEmitter<number | boolean> = new EventEmitter<number | boolean>();

  constructor(
    private globalService:GlobalUserProService
  ) { }

  ngOnInit() {
  }

  get savedUsers(){
    return this.globalService
               .getSavedUser();
  }

  removeUser(id:string){
    return this.globalService
               .removeSavedUser(id);
  }

}
