import { Component, OnInit, Input } from '@angular/core';
import { NEWS_FEED_REACTION, NewsFeedLikeType } from 'src/app/_shared/models/news-feed/news-feed.model';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { INewsFeedLike } from 'src/app/_shared/models/news-feed/news-feed.interface';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {

  @Input() postId:string;
  @Input() commentId:string;

  @Input() liked:string = null;

  @Input() commentLikes:number = 0;

  reactions = NEWS_FEED_REACTION;
  allReactions:any[] = this.reactions['_enum'];
  currentReaction = this.reactions['no_reaction'];

  profileId:string;
  profileType:NewsFeedLikeType = 'user';
  hasReaction:boolean = false;
  
  constructor(
    private newsFeedService:NewsFeedService,
    private globalService:GlobalUserProService
  ) { }

  ngOnInit() {
    this.profileId = this.globalService.getProfileId();
    this.profileType = this.globalService.isCompanyActive() ? 'company' : 'user';

    if(!!this.liked){
      this.hasReaction = true;
      this.currentReaction = this.reactions[this.liked];
    }
  }


  clickReaction(e:MouseEvent , type){
    e.preventDefault();
    e.stopPropagation();

    this.hasReaction = true;
    this.putReaction(type);
  }

  putReaction(type){
    let reaction =  this.reactions[type];

    if(!reaction) return;

    let reactionType:INewsFeedLike = {
      id:this.profileId,
      type:this.profileType,
      emoji:type
    },
    mutation = type === "no_reaction" ?  
              this.newsFeedService
                  .unLike(this.postId , this.profileId , this.commentId) : /// unLike
              this.newsFeedService
                  .likePost(this.postId , reactionType , this.commentId); /// like


      mutation.subscribe(
            () => {}, 
            () => {},
            () => {
               !this.commentId ? this.emitData(type) : this.commentLike(type);
               this.currentReaction = reaction;
            }
    )
   
    
  }

  commentLike(type:string){
    return type === 'like' ? this.commentLikes++ :
                             this.commentLikes--;
  }

  emitData(type:string){

    this.liked = this.currentReaction['type'] === "no_reaction" ? null : type;

    this.newsFeedService
        .reactions.next({
          id:`${this.postId}_${type}`,
          postId:this.postId,
          isLiked:this.hasReaction,
          hasLiked:!!this.liked,
          _prevType:this.currentReaction['type'],
          _isComment:!!this.commentId,
          type
        })
  }

  async likeUnLike(e:MouseEvent){
     e.preventDefault();
     e.stopPropagation();
     

    let type = this.hasReaction ? 'no_reaction' : 'like';

    this.hasReaction = !this.hasReaction;
    this.putReaction(type);

  }


  // addShit(){
  //   this.reactions['shit'].hidden = false;
  // }

}
