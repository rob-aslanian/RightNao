import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupsProfileComponent } from './groups-profile/groups-profile.component';
import { GroupsService } from './shared/services/groups.service';
import { SharedModule } from '../_shared/shared.module';
import { GroupsHeaderComponent } from './groups-profile/groups-header/groups-header.component';
import { DescriptionModalComponent } from './groups-profile/groups-header/description-modal/description-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AboutGroupComponent } from './groups-profile/groups-header/about-group/about-group.component';
import { PostsComponent } from './groups-profile/groups-header/posts/posts.component';
import { GroupMembersComponent } from './groups-profile/groups-header/group-members/group-members.component';
import { ManageGroupComponent } from './groups-profile/manage-group/manage-group.component';
import { ManageNavigationComponent } from './groups-profile/manage-group/manage-navigation/manage-navigation.component';
import { GeneralSettingsComponent } from './groups-profile/manage-group/manage-navigation/general-settings/general-settings.component';
import { AdminActivityComponent } from './groups-profile/manage-group/manage-navigation/admin-activity/admin-activity.component';
import { MemberRequestsComponent } from './groups-profile/manage-group/manage-navigation/member-requests/member-requests.component';
import { PendingPostsComponent } from './groups-profile/manage-group/manage-navigation/pending-posts/pending-posts.component';
import { MemberReportedComponent } from './groups-profile/manage-group/manage-navigation/member-reported/member-reported.component';
import { GeneralSettingsInputComponent } from './groups-profile/manage-group/manage-navigation/general-settings/general-settings-input/general-settings-input.component';
import { RouterLinkActive } from '@angular/router';
 

 

const components = [
    GroupsComponent, 
    GroupsProfileComponent
];

@NgModule({
  declarations: [
    ...components,
    GroupsHeaderComponent,
    DescriptionModalComponent,
    AboutGroupComponent,
    PostsComponent,
    GroupMembersComponent,
    ManageGroupComponent,
    GeneralSettingsComponent,
    ManageNavigationComponent,
    AdminActivityComponent,
    MemberRequestsComponent,
    PendingPostsComponent,
    MemberReportedComponent,
    GeneralSettingsInputComponent,
 
 
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ...components
  ],
  providers: [
    GroupsService
  ]
})
export class GroupsModule { }
