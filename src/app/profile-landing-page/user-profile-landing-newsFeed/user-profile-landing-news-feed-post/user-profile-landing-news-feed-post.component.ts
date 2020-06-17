import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';

@Component({
  selector: 'app-user-profile-landing-news-feed-post',
  templateUrl: './user-profile-landing-news-feed-post.component.html',
  styleUrls: ['./user-profile-landing-news-feed-post.component.scss']
})
export class UserProfileLandingNewsFeedPostComponent implements OnInit {
  @Input() post;
  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  modalType: string; 

  lettersAmount: number = 150;

  isOpenLikeModal:boolean = false;
  likesCount:number = 0;
  

  constructor(
    private newsFeedService: NewsFeedService
  ) { }

  ngOnInit() {
    if(this.post.files.length) {
      this.lettersAmount = 80;
    }
  }

  openCommentsModal() {
    this.modal.open(); 
    this.modalType = 'forLandingComments'; 
};
closeModalForLanding(e: boolean) {
  if(e) { 
    this.modalType = ';)'; 
    this.modal.close();
  }  
}; 



dataForLikes(){
  if(this.post){
     let reactions = this.post.likes_amount,
         reactionsKey = Object.keys(reactions);
         
     reactionsKey.map(key => {
       if(reactions[key]){
         if(reactions[key] > 0){
           this.likesCount += reactions[key];
         }
       }
     })
     
     this.newsFeedService.likesAmount = this.likesCount;
     this.newsFeedService.allReactions = reactions;
     
  }
}

openLikes(id:string) {
  this.dataForLikes();

  this.modal.open();
  this.modal.title = 'Likes';
  this.isOpenLikeModal = true;
  this.newsFeedService.postId = id;
}; 

closeLikes() {
  this.isOpenLikeModal = false;
  this.likesCount = 0;
  this.modalType = ':)';  

}; 

}
