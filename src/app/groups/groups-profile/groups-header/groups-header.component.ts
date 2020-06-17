import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { GroupsService } from '../../shared/services/groups.service';

@Component({
  selector: 'app-groups-header',
  templateUrl: './groups-header.component.html',
  styleUrls: ['./groups-header.component.scss']
})
export class GroupsHeaderComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) _modal: AppModalComponent;

  @Input() data: any;

  modalType: string ;

  constructor(
    private groupService: GroupsService
  ) { }

  ngOnInit() {
  }

  openDescriptionModal() {

    this.modalType = 'add';
    this._modal.open();
    this._modal.title = 'Add Tagline';

  }
  
  getResultTagline( e ) {
    
 
      this.groupService
      .changeTagline( this.data.id, e  ).subscribe( data => {
         this.data.tagline = e;
      } )
 
    this._modal.close();
     
  }
  inviteUsers(users) {
     const userId = users.map( user => user.id );
 
     
     this.groupService.sendInvations( this.data.id, userId ).subscribe( () => this._modal.close() )
      
  }
  inviteFriends() {
      this.modalType = 'invations';
      this._modal.title = 'Ivite Members';
      this._modal.open();
  }
}
