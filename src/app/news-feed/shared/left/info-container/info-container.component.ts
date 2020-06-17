import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { Observable } from 'rxjs';
import { INewsFeedProfile } from 'src/app/_shared/models/news-feed/news-feed.interface';

@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss' , '../../scss/shared.scss']
})
export class InfoContainerComponent implements OnInit {

  profileQuery:Observable<any>;
  profile:INewsFeedProfile;

  constructor(
    private newsFeedService:NewsFeedService
  ) { }

  ngOnInit() {
     this.profileQuery = this.newsFeedService.profileQuery;
     this.profile = this.newsFeedService.profile;
  }

}
