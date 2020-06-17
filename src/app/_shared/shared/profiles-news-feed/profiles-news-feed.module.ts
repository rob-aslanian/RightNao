import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeedMainComponent } from 'src/app/news-feed/news-feed-main/news-feed-main.component';
import { PostsComponent } from 'src/app/news-feed/shared/main/posts/posts.component';
import { CreatePostComponent } from 'src/app/news-feed/shared/main/create-post/create-post.component';
import { ShareComponent } from 'src/app/news-feed/shared/main/share/share.component';
import { PostComponent } from 'src/app/news-feed/shared/main/post/post.component';
import { SharedModule } from '../../shared.module';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { CommentsComponent } from 'src/app/news-feed/shared/main/comments/comments.component';
import { CommentComponent } from 'src/app/news-feed/shared/main/comments/comment/comment.component';
import { CommentFormComponent } from 'src/app/news-feed/shared/main/comments/comment-form/comment-form.component';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReplyCommentsComponent } from 'src/app/news-feed/shared/main/comments/reply-comments/reply-comments.component';
import { SharesModalComponent } from 'src/app/news-feed/shared/main/share/shares-modal/shares-modal.component';
import { ShareToModalComponent } from 'src/app/news-feed/shared/main/share/share-to-modal/share-to-modal.component';
import { ReactionComponent } from 'src/app/news-feed/shared/main/reaction/reaction.component';
import { ReactionCountComponent } from 'src/app/news-feed/shared/main/reaction/reaction-count/reaction-count.component';
import { ReactionModalComponent } from 'src/app/news-feed/shared/main/reaction/reaction-modal/reaction-modal.component';
import { ReactionsContentComponent } from 'src/app/news-feed/shared/main/reaction/reaction-modal/reactions-content/reactions-content.component';
import { RouterModule } from '@angular/router';
import { CommentsModalLandingComponent } from 'src/app/profile-landing-page/user-profile-landing-newsFeed/comments-modal-landing/comments-modal-landing.component';

const COMPONENTS = [
  NewsFeedMainComponent,
  PostsComponent,
  CreatePostComponent,
  ReactionComponent,
  ReactionCountComponent,
  ReactionModalComponent,
  ReactionsContentComponent,
  ShareComponent,
  PostComponent,
  CommentsComponent,
  CommentComponent,
  CommentFormComponent,
  ReplyCommentsComponent,
  SharesModalComponent,
  ShareToModalComponent,
  CommentsModalLandingComponent
]

@NgModule({
  declarations: COMPONENTS,
  providers:[
    { useClass:NewsFeedService , provide:NewsFeedService}
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    NgbTooltipModule,
    RouterModule,
    FormsModule,
  ],
  exports:COMPONENTS
})
export class ProfilesNewsFeedModule { }
