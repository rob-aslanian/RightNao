import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-connections',
  templateUrl: './user-profile-connections.component.html',
  styleUrls: ['../../../network/network.component.scss', '../../../_shared/css/modals_shared_styles.scss', './user-profile-connections.component.scss']
})
export class UserProfileConnectionsComponent implements OnInit {

  userId :string; 
   
  constructor(
    private router:ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.router.snapshot.params['id'];    
        
  }

}
