import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';

@Component({
  selector: 'app-comments-modal-landing',
  templateUrl: './comments-modal-landing.component.html',
  styleUrls: ['./comments-modal-landing.component.scss']
})
export class CommentsModalLandingComponent implements OnInit {

  @Input() post: any; 
  @Output() onCloseModal : EventEmitter<boolean> = new EventEmitter(); 

  @ViewChild(AppModalComponent, { static: true }) modal: AppModalComponent;

  files: string[] = [];

  showComment: boolean = false;
  isLikeModalOn: boolean = false; 
  likesCount: number = 0;


  constructor(
    private newsFeedService: NewsFeedService
  ) { }

  ngOnInit() {
       if( this.post.files ) {
           this.files = this.post.files.map( file => file['address'] );
       }; 
       console.log(this.post);
       
  }


  dataForLikes() {
    if(this.post) {
       let reactions = this.post.likes_amount,
           reactionsKey = Object.keys(reactions);
           
       reactionsKey.map(key => {
         if(reactions[key]){
           if(reactions[key] > 0){
             this.likesCount += reactions[key];
           }
         }
       }); 
       
       this.newsFeedService.likesAmount = this.likesCount;
       this.newsFeedService.allReactions = reactions;
       
    }
 }; 

  openLikes(id: string) {
    this.dataForLikes();
    this.modal.open();
    this.modal.title = 'Likes'; 
    this.isLikeModalOn = true;
    this.newsFeedService.postId = id;
  }; 

  
  closeModal() {
      this.onCloseModal.emit(true);        
  }; 









  }; 


 
  

 




