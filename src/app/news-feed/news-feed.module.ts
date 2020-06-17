import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFeedRoutingModule } from './news-feed-routing.module';
import { NewsFeedComponent } from './news-feed.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { InfoContainerComponent } from './shared/left/info-container/info-container.component';
import { BusinessProfileComponent } from './shared/left/business-profile/business-profile.component';
import { GroupsComponent } from './shared/left/groups/groups.component';
import { SharedModule } from '../_shared/shared.module';
import { ProfilesNewsFeedModule } from '../_shared/shared/profiles-news-feed/profiles-news-feed.module';


@NgModule({
  declarations: [
    NewsFeedComponent, 
    LeftSideComponent, 
    InfoContainerComponent, 
    BusinessProfileComponent, 
    GroupsComponent, 
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsFeedRoutingModule,
    ProfilesNewsFeedModule,

  ],
})
export class NewsFeedModule { }
