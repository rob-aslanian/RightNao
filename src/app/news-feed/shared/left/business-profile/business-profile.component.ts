import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { INewsFeedProfile } from 'src/app/_shared/models/news-feed/news-feed.interface';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss' , '../../scss/shared.scss']
})
export class BusinessProfileComponent implements OnInit {

  profile:INewsFeedProfile;
  companies:Observable<any>;

  constructor(
    private newfsFeedService:NewsFeedService,
    private utilService:UtilsService
  ) {

   }

  ngOnInit() {
    this.profile = this.newfsFeedService.profile;
    
    if(!this.profile.isCompany){
      this.getCompanies();
    }
  }

  getCompanies(){
    this.companies = this.utilService
                         .getMyCompanies();
  }

}
