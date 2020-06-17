import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment;
  @Input() isNew:boolean = false;

  @Output() deleteComment:EventEmitter<string> = new EventEmitter<string>();


  showReply:boolean = false;
  postId:string;
  ownerID:string;

  constructor(
    private newsFeedService:NewsFeedService,
    private globalService:GlobalUserProService
  ) {
      this.ownerID = globalService.getProfileId();
   }

  ngOnInit() {
    this.postId = this.newsFeedService.postId;
  }

  remove = (id:string) => this.deleteComment.emit(id);

  reply(){
    this.showReply = !this.showReply;
  }

}
