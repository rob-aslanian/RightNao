import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { switchMap, map, filter, takeUntil } from 'rxjs/operators';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-reply-comments',
  templateUrl: './reply-comments.component.html',
  styleUrls: ['./reply-comments.component.scss']
})
export class ReplyCommentsComponent implements OnInit , OnDestroy{

  @Input() comment;
  @Input() amount:number;

  destroy$:Subject<any> = new Subject<any>();
  first:number = 0;
  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  comments:any[] = [];
  isLoading:boolean = true;
  commentQuery:Observable<any>;
  postId:string;

  constructor(
    private newsFeedService:NewsFeedService
  ) { }

  ngOnInit() {

    this.postId = this.newsFeedService.postId;

    /// New Comment 
    this.newComments();
    
    if(this.amount > 0){
   
        this.after
            .pipe(
              switchMap(() => {
                return this.newsFeedService
                          .getReplyComment(this.postId , this.comment.id , '2' , this.after.value )
                          .pipe(
                            takeUntil(this.destroy$),
                            map((comment) => {
                              this.amount > this.comments.length ?  this.comments.unshift(...comment['comments']) : null;
                              this.isLoading = false;
                              return comment;
                          }));
              }))
            .subscribe()
            
    }else {
      this.isLoading = false;
    }
    
  }

  newComments() {
    this.newsFeedService
        .AddedComment(this.postId)
        .pipe(
          // takeUntil(this.destroy$),
          filter(cmt => cmt.parent_id)
        )
        .subscribe(
          (data) => {
            console.log(data);
            
            this.comments.unshift({
              ...data,
              isNew:true
            });
          }
        )
  }

  loadMore(){

      if(this.first + 2 > this.amount){
        this.first = this.amount;
        this.isLoading = true;
        this.after.next(String(this.amount - 1));
      }
    
      if(this.first <= this.amount && this.first + 2 < this.amount){
        let next = this.first += 2;
        this.isLoading = true;
        this.after.next(String(next));
      }  

   }

   removeComment(id:string){
    let commentId = this.comments.findIndex(comment => comment.id === id);

    if(commentId < 0) return;

    this.newsFeedService
        .removeComment(this.postId , id)
        // .pipe(takeUntil(this.$destroy))
        .subscribe(
          () => {
            this.comments.splice(commentId, 1);
          }
        )
   }

   ngOnDestroy(){
     this.destroy$.next();
     this.destroy$.complete();

   }

}
