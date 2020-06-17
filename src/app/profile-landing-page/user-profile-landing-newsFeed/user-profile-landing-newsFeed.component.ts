import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-profile-landing-newsFeed',
  templateUrl: './user-profile-landing-newsFeed.component.html',
  styleUrls: ['./user-profile-landing-newsFeed.component.scss']
})
export class UserProfileLandingNewsFeedComponent implements OnInit, OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  isLoaded:boolean = true;

  userId: string; 
  userUrl: string;
  isCompany: boolean; 
  
  posts;


  constructor(
    private globalUserProService: GlobalUserProService,
    private newsFeedService: NewsFeedService
  ) { }

  ngOnInit() {
    this.userId = this.globalUserProService.getProfileId(); 
    this.userUrl = this.globalUserProService.getUserId(); 
    this.isCompany = this.globalUserProService.isCompanyActive(); 

    this.newsFeedService
    .getPosts(undefined, '3', '0', 'landing')
    .pipe(takeUntil(this.destroy$))
    .subscribe( (data) => {
      if(data) {
        this.posts = data['posts'];
      }
      this.isLoaded = false;
    }, (err) => { this.isLoaded = false; },
        () => { this.isLoaded = false; })
    
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


}
