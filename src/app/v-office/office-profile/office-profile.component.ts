import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICoverImage } from 'src/app/_shared/models/company/coverImage.interface';
import { Iheader } from 'src/app/_shared/models/service/v-office/v-office-model';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';


@Component({
  selector: 'app-office-profile',
  templateUrl: './office-profile.component.html',
  styleUrls: ['./office-profile.component.scss']
})
export class OfficeProfileComponent implements OnInit {

  
  office: any = {};
  
 
  header: Iheader = {
    isMe: true,
    name: '',
    location: {
      city: '',
      country: ''
    },
    office_id:'',
    id: '',
    isOut: false,
    return_date: '',
    category: '',
    isCompanyAcitve: true,
    created_at: '',
    description: '',
    languages: [],
    avatar: '',
    originAvatar: ''
  }

  isMe: boolean = false;


  constructor(
    private router:ActivatedRoute,
    private globalUserProService: GlobalUserProService
  ) {  }


  ngOnInit() {
 
  // Get data from Resolver 
    this.office =  this.router.snapshot.data['office']['data']['GetVOfficeByID'];
    

    this.isMe = this.globalUserProService.isCompanyActive() ?
                this.office['isMe'] && this.globalUserProService.getComapnyId() === this.office['companyID'] :
                this.office['isMe'] && this.globalUserProService.getUserProfile()['id'] === this.office['userID'];
 
  // Get header info
    this.header = {
      name: this.office['name'],
      location: {
        city: this.office['location']['city']['city'],
        country: this.office['location']['country']['country']
      },
      office_id: this.office['id'],
      id: this.office['companyID'] || this.office['userID'],
      isMe: this.isMe,
      isOut: this.office['isOut'],
      return_date: this.office['return_date'],
      category: this.office['category'],
      isCompanyAcitve: this.office['companyID'] ? true : false,
      created_at: this.getOfficeCreatedDate( this.office.created_at ),
      description: this.office['description'],
      languages: this.office['languages'],
      avatar: this.office['cover'],
      originAvatar: this.office['cover_origin']
  }
   
   

  }
  getOfficeCreatedDate( date: string ) {
     const dateInMonthAndYears =  this.office['created_at'].split('-');
     return `${dateInMonthAndYears[1]}/${dateInMonthAndYears[0]}/${dateInMonthAndYears[2]}`
  }

 
}
