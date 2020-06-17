import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil, map, take } from 'rxjs/operators';
import { NEWS_FEED_REACTION } from 'src/app/_shared/models/news-feed/news-feed.model';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-reactions-content',
  templateUrl: './reactions-content.component.html',
  styleUrls: ['./reactions-content.component.scss']
})
export class ReactionsContentComponent implements OnInit , OnDestroy{

  $destroy:Subject<any> = new Subject<any>();

  @Input() type:string;
  @Input() reactionsAmount:number;

  postID:string;
  commentID:string;

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 0;
  isLoading:boolean = true;
  reactionsList = NEWS_FEED_REACTION;
  isCompany:boolean = false;

  reactions:any[] = [];

  constructor(
    private newsFeedService:NewsFeedService,
    private globalService:GlobalUserProService,
    private utilService:UtilsService
  ) { }

  ngOnInit() {
    this.postID = this.newsFeedService.postId;
    this.isCompany = this.globalService.isCompanyActive();

    this.getReaction();
  }


  getReaction(){
    
    if((this.postID || this.commentID) && this.type){
       let emoji = this.type !== 'all' ? this.type : undefined;

        this.after
            .pipe(
              takeUntil(this.$destroy),
              switchMap(() => {
                return this.newsFeedService
                          .getLikesList(this.postID , emoji , '10' , this.after.value)
                          .pipe(
                            takeUntil(this.$destroy),
                            map((reaction) => {
                              
                                this.isLoading = false;
                                return this.reactionsAmount > this.reactions.length ?
                                      this.reactions.push(...reaction) : null;
                        }));
          })
        )
        .subscribe()
    }
  }

  toggleConnect(profile){
    let { id , friend } = profile,
       mutation = friend ? this.utilService
                                   .disconnect(id) :
                               this.utilService
                                   .SendFriendRequest(id);

     friend = !friend;
     mutation.pipe(takeUntil(this.$destroy)) 
             .subscribe();
  }

  /** @TODO  */
  toggleFollow(profile){

  }

  scrolled(e){

    if(this.reactionsAmount < this.reactions.length){
 
     
     if(this.first + 10 > this.reactionsAmount){
       this.first = this.reactionsAmount;
       this.isLoading = true;
       this.after.next(String(this.reactionsAmount - 1));
     }
  
     if(this.first <= this.reactionsAmount && this.first + 10 < this.reactionsAmount){
       let next = this.first += 10;
       this.isLoading = true;
       this.after.next(String(next));
     }  
 
    }
     
   }

   ngOnDestroy(){
     this.$destroy.next();
     this.$destroy.complete();

   }

}
