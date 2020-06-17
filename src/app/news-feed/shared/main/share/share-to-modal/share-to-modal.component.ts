import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { INewsFeedPost } from 'src/app/_shared/models/news-feed/news-feed.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-share-to-modal',
  templateUrl: './share-to-modal.component.html',
  styleUrls: ['./share-to-modal.component.scss']
})
export class ShareToModalComponent implements OnInit {

  @Input() type:string;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  profileName:string;
  profileAvatar:string;
  profileId:string;
  isCompany:boolean;

  postToShare:INewsFeedPost;
  textControl:FormControl;

  constructor(
    private globalService:GlobalUserProService,
    private newsFeedService:NewsFeedService
  ) { 
    this.profileName = globalService.getProfileName();
    this.profileAvatar = globalService.getProfileAvatar();
    this.profileId = globalService.getProfileId();
    this.isCompany =globalService.isCompanyActive();

    this.textControl = new FormControl('');

  }

  ngOnInit() {
    this.postToShare = this.newsFeedService.sharedPost;
  }

  submit(){
    let text = this.textControl.value,
        shared_post_id = this.postToShare.id,
        newsfeed_user_id = !this.isCompany ? this.profileId : undefined,
        newsfeed_company_id = this.isCompany ? this.profileId : undefined;

   
    if(this.textControl.valid){
      this.newsFeedService
          .AddPost({
            text,
            shared_post_id,
            newsfeed_user_id,
            newsfeed_company_id
          })
          .subscribe(
            () => { this.close.emit(true) }
          )
    }

  }

}
