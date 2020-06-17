import { Component, OnInit, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { BehaviorSubject, Observable, merge, Subject } from 'rxjs';
import { switchMap, tap, map, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CommentsComponent implements OnInit  , OnDestroy{

  @Input() postId:string;
  @Input() commentAmount;
 

  destroy$:Subject<any> = new Subject<any>();
  commentQuery:Observable<any>;
  comments:any[] = [];
  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  sort:BehaviorSubject<string> = new BehaviorSubject<string>('time_creation')
  first:number = 0;
  isLoading:boolean = true;

  constructor(
    private newsFeedService:NewsFeedService
  ) { }

  ngOnInit() {

    /// New comments 
    this.newComments();

    this.newsFeedService.postId = this.postId;
  
      merge(this.after , this.sort)
          .pipe(
            switchMap(() => {
              return this.newsFeedService
                        .getComments(this.postId , '5' , this.after.value , this.sort.value)
                        .pipe(
                          map((comment) => {
                            !!comment && this.commentAmount > this.comments.length ?  
                                         this.comments.push(...comment['comments']) : null;
                                         
                            this.isLoading = false;
                            return comment;
                        }));
            }))
            .subscribe()
    
    
  }

  newComments() {
    this.newsFeedService
        .AddedComment(this.postId)
        .pipe(
          takeUntil(this.destroy$),
          filter(cmt => !cmt.parent_id)
        )
        .subscribe(
          (data) => {
            this.comments.unshift({
              ...data,
              isNew:true
            });
          }
        )
  }

  loadMore(){

      if(this.first + 5 > this.commentAmount){
        this.first = this.commentAmount;
        this.isLoading = true;
        this.after.next(String(this.commentAmount - 1));
      }
    
      if(this.first <= this.commentAmount && this.first + 5 < this.commentAmount){
        let next = this.first += 5;
        this.isLoading = true;
        this.after.next(String(next));
      }  

   }

   sortBy(type:string){
     this.sort.next(type);
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
