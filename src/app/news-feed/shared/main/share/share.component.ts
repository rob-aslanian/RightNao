import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { AppComponent } from 'src/app/app.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';



@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss' , '../../scss/shared.scss']
})
export class ShareComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Input() post;

  modalType:string = null;

  constructor(
    private appComponent:AppComponent,
    private newsFeedService:NewsFeedService
  ) { }

  ngOnInit() {
   
  }

  open(type:string){
    this.modalType = type;
    this.modal.open();
    
    this.newsFeedService.sharedPost = this.post; 

    switch (type) {
      case 'view':{
        this.modal.title = 'Shares';
        break;
      }
      case 'your_newsfeed':{
        this.modal.title = 'Share on your newsfeed';
        break;
      }
      case 'connection_newsfeed':{
        this.modal.title = 'Share on your connections newsfeed';
        break;
      } 
      default: break;
    }
    
  }

  shareInMessage(){
    let isCompany = this.post['user_profile'] === null,
        profile = this.post['company_profile'] || this.post['user_profile'];

    let link = `${utilities.getLocationLink}/${isCompany ? 'company' : 'user'}/profile/${profile.url}/news-feed/${profile.id}?isCompany=${isCompany}#post_${this.post['id']}`;

    

    this.appComponent.addChatBox('NEW');

    setTimeout(() =>   this.appComponent.prePopulateNewChatBoxText(link) , 200);
  }

}
