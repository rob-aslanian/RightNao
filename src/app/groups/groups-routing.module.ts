import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsProfileComponent } from './groups-profile/groups-profile.component';
import { AboutGroupComponent } from './groups-profile/groups-header/about-group/about-group.component';
import { PostsComponent } from './groups-profile/groups-header/posts/posts.component';
import { GroupMembersComponent } from './groups-profile/groups-header/group-members/group-members.component';
import { ManageGroupComponent } from './groups-profile/manage-group/manage-group.component';
import { GeneralSettingsComponent } from './groups-profile/manage-group/manage-navigation/general-settings/general-settings.component';
import { ManageNavigationComponent } from './groups-profile/manage-group/manage-navigation/manage-navigation.component';
import { AdminActivityComponent } from './groups-profile/manage-group/manage-navigation/admin-activity/admin-activity.component';
import { MemberRequestsComponent } from './groups-profile/manage-group/manage-navigation/member-requests/member-requests.component';
import { PendingPostsComponent } from './groups-profile/manage-group/manage-navigation/pending-posts/pending-posts.component';
import { MemberReportedComponent } from './groups-profile/manage-group/manage-navigation/member-reported/member-reported.component';

 
 

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'profile' },
  { path:'profile/:url', component: GroupsProfileComponent,
      children: [
          { path: '', pathMatch: 'full', redirectTo: 'about' },
          { path: 'about',    component: AboutGroupComponent },
          { path: 'post',     component: PostsComponent },
          { path: 'members',  component: GroupMembersComponent },
          { path: 'manage',   component: ManageGroupComponent, 
            children: [
               { path: '', pathMatch: 'full', redirectTo: 'settings' },
               { path: 'settings', component: ManageNavigationComponent,
                 children: [
                   { path:'', pathMatch: 'full', redirectTo: 'general-settings' },
                   { path: 'general-settings', component: GeneralSettingsComponent  },
                   { path: 'admin-activity',   component: AdminActivityComponent },
                   { path: 'member-requests',   component: MemberRequestsComponent },
                   { path: 'pending-posts',   component:   PendingPostsComponent },
                   { path: 'member-reported',   component: MemberReportedComponent },
                 ]
              }
            ]
        }
      ]
 },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
