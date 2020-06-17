import { Component, OnInit } from '@angular/core';
import { NewsFeedService } from './services/news-feed.service';
import { UtilsService } from '../_shared/services/shared/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})

export class NewsFeedComponent implements OnInit {


  constructor(
  ) { 
    
  }

  ngOnInit() {
  }

}
