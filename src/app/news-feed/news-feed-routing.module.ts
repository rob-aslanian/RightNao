import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedComponent } from './news-feed.component';
import { CheckAuthorizeGuard } from '../_shared/guards/check-authorize.guard';

const routes: Routes = [
  { path:'' , component:NewsFeedComponent , canActivate:[CheckAuthorizeGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsFeedRoutingModule { }
