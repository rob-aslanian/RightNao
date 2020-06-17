import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../shared/services/groups.service';
import { ActivatedRoute } from '@angular/router';
import { ICoverImage } from 'src/app/_shared/models/company/coverImage.interface';

@Component({
  selector: 'app-groups-profile',
  templateUrl: './groups-profile.component.html',
  styleUrls: ['./groups-profile.component.scss']
})
export class GroupsProfileComponent implements OnInit {

  // Cover image
  coverImage: ICoverImage = {
      cover:"",
      id:"",
      isAdmin:true,
      company_id: ''
  };

  // Headline 
  headline = {
    tagline:          '',
    type:             '',
    privacy_type:     '',
    name:             '',
    amount_of_members: 0,
    id:               ''
  }

  constructor(
    private groupService: GroupsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
   const { url } =  this.activatedRoute.snapshot.params;
     this.groupService
      .getGroup(url)
       .subscribe( ({ data }) => {
         
          const groups = data['GetGroupByURL'];
        // Cover Image
          this.coverImage = {
            cover:   groups.cover,
            id:      groups.id,
            isAdmin: true,
          };
         
       // Headline 
          this.headline = {
             id:                groups['id'],
             tagline:           groups['tagline'],
             type:              groups['type'],
             privacy_type:      groups['privacy_type'],
             name:              groups['name'],
             amount_of_members: groups['amount_of_members']
          }

       });
  }

}
