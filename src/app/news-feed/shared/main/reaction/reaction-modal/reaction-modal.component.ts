import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';

@Component({
  selector: 'app-reaction-modal',
  templateUrl: './reaction-modal.component.html',
  styleUrls: ['./reaction-modal.component.scss']
})
export class ReactionModalComponent implements OnInit {

  reactionCount:number = 0;
  reactions:any;

  constructor(
    private newsFeedService:NewsFeedService
  ) { }

  ngOnInit() {
    this.reactionCount = this.newsFeedService.likesAmount;
    this.reactions = this.newsFeedService.allReactions;

    
  }



}
