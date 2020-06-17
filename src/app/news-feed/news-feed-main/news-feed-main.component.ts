import { Component, OnInit, HostBinding, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { NewsFeedService } from '../services/news-feed.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NewsFeedPostType } from 'src/app/_shared/models/news-feed/news-feed.model';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-news-feed-main',
  templateUrl: './news-feed-main.component.html',
  styleUrls: ['./news-feed-main.component.scss' , '../shared/scss/shared.scss']
})
export class NewsFeedMainComponent implements OnInit , OnDestroy {

  @HostBinding('attr.class') class = 'col-lg-6 col-md-8 pl-0';

  @ViewChild("anchor", { static: true }) anchor:ElementRef<HTMLElement>;

  @Input() type:NewsFeedPostType = 'any';


  destroy$:Subject<any> = new Subject<any>();
  profileId:string;
  isCompany:boolean;
  newPosts: string[] = [];
  hasNewPost:boolean = false;
  currentPostion:number = window.pageYOffset;

  constructor(
    private utilService:UtilsService,
    private newsFeedService:NewsFeedService,
    private router:ActivatedRoute,
    private location:Location,
    private globalService:GlobalUserProService,
  ) {
    let
        isCompany = globalService.isCompanyActive(),
        snapshot = router.snapshot;

      this.profileId  = snapshot.params['id'] || globalService.getProfileId(),
      this.isCompany = snapshot.queryParams['isCompany'] ? JSON.parse(snapshot.queryParams['isCompany']) : isCompany;
      
   }

  ngOnInit() {
    let query = this.isCompany ?
                this.utilService
                    .getCompanyProfileById(this.profileId) : /// Company
                this.utilService
                    .getProfileById(this.profileId); /// User

      /// Init 
      this.newsFeedService.profileQuery = query;
      this.newsFeedService.profile = {
          id:this.profileId,
          isCompany:this.isCompany
      }

    /// Get new posts
    this.getNewPosts();
   
    /// Init scroll
   this.scroll();
  }

  getNewPosts(){
    this.newsFeedService
        .AddedPost(this.profileId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.newPosts.push(data['id']);

            if(window.pageYOffset <= 300) {
              this.hasNewPost = false; 
              this.loadNewPosts();
           }

          }
        )
  }

  loadNewPosts(){
    /// Emit new posts 
    this.newsFeedService
        .newPosts
        .next(this.newPosts)

    this.hasNewPost = false;
    this.newPosts = [];

  }

  scroll(){
    fromEvent(window , "scroll")
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (e:any) => {
        let position = window.pageYOffset;

        if(this.newPosts.length > 0){
            if(position <= 300) { this.hasNewPost = false; }
            else{ this.hasNewPost = true; }
        }
      }
    )

    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

  }



}
