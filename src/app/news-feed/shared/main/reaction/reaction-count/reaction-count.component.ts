import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NEWS_FEED_REACTION } from 'src/app/_shared/models/news-feed/news-feed.model';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reaction-count',
  templateUrl: './reaction-count.component.html',
  styleUrls: ['./reaction-count.component.scss']
})
export class ReactionCountComponent implements OnInit {


  destroy$:Subject<any> = new Subject<any>();

  @Input() reactions;
  @Input() postId:string;

  allReactions:any[] = NEWS_FEED_REACTION['_enum'];
  reactsInfo = NEWS_FEED_REACTION;
  reactionsCount:number = 0;
  hasAdded:boolean = false;
  observer:IntersectionObserver;
  hasAlreadyLike: {
    [id:string]:boolean
  } = {};

  constructor(
    private newsFeedService:NewsFeedService,
    private host:ElementRef
  ) { }

  ngOnInit() {
  
    this.getReactionsCount();
    this.newReaction();

    this.observer = new IntersectionObserver(([e]) => {
      e.isIntersecting ? this.newLike() : this.unsubscribe();
    } , {
      root:null,
      threshold:0
    });

    this.observer.observe(this.host.nativeElement);
  }

  newLike(){
     this.newsFeedService
         .AddedLike(this.postId)
         .pipe(takeUntil(this.destroy$))
         .subscribe(
           (data) => {
              let { emoji , id } = data;
              if(!this.hasAlreadyLike[id]){
                this.reactionsCount += 1;
                this.hasAlreadyLike[id] = true;
              }
              this.reactions[emoji] += 1;
           }
         )
  }

  unsubscribe(){
    this.destroy$.next();
    this.destroy$.complete();

  }

  getReactionsCount(){
     let reactionsKeys = Object.keys(this.reactions);

     reactionsKeys.map(key => {
        if(this.reactions[key]){
          if(this.reactions[key] > 0){
            this.reactionsCount += this.reactions[key];
          }
        }
     })
  }

  newReaction(){
    this.newsFeedService
        .reactions
        .pipe(
          filter(reaction => reaction.postId === this.postId && !reaction._isComment),
        )
        .subscribe(
          (reaction) => {
            let {type , _prevType , isLiked , hasLiked } = reaction;

            if(type !== _prevType ){
                if(isLiked){
                  // if(!hasLiked){
                  //   this.reactionsCount += 1;
                  // }
                  if(type !== "no_reaction"){
                    // this.reactions[type] += 1;
                    this.reactions[_prevType] -= 1;
                  }    
                }else{
                  this.reactionsCount -= 1;
                  this.reactions[_prevType] -= 1;
                }
            }

          }
        )
  }


}
