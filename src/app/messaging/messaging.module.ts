import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './shared/token.interceptor';

// Components
import { MessagingComponent } from './messaging.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { MessageInterfaceComponent } from './message-view/message-interface/message-interface.component';
import { MessageDetailsComponent } from './message-view/message-details/message-details.component';
import { MessageNewComponent } from './message-new/message-new.component';

// Modals
import { MuteChatComponent } from './modals/mute-chat/mute-chat.component';
import { DeleteChatConfirmComponent } from './modals/delete-chat-confirm/delete-chat-confirm.component';
import { ReportBlockComponent } from './modals/report-block/report-block.component';
import { ReportChatComponent } from './modals/report-chat/report-chat.component';
import { BlockUserComponent } from './modals/block-user/block-user.component';
import { LeaveGroupComponent } from './modals/leave-group/leave-group.component';
import { SavedRepliesComponent } from './modals/saved-replies/saved-replies.component';
import { CreateReplyComponent } from './modals/create-reply/create-reply.component';
import { ManageLabelsComponent } from './modals/manage-labels/manage-labels.component';
import { SharedPhotosComponent } from './modals/shared-photos/shared-photos.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Others
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { DefaultAvatarPipe } from './shared/pipes/default-avatar.pipe';
import { SmallChatBoxComponent } from './small-chat-box/small-chat-box.component';
import { SearchNSelectComponent } from './shared/components/search-n-select/search-n-select.component';
import { SmallConversationsComponent } from './small-conversations/small-conversations.component';
import { SearchConversationBoxComponent } from './shared/components/search-conversation-box/search-conversation-box.component';
import { SmallNewChatComponent } from './small-new-chat/small-new-chat.component';
import { SendMessageFormComponent } from './shared/components/send-message-form/send-message-form.component';
import { ConversationNamePipe } from './shared/pipes/conversation-name.pipe';
import { PersonalizePipe } from './shared/pipes/personalize.pipe';
import { ChatContainerComponent } from './shared/components/chat-container/chat-container.component';
import { MessageStatusPipe } from './shared/pipes/message-status.pipe';
import { GroupNotificationPipe } from './shared/pipes/group-notification.pipe';
import { FilepathPipe } from './shared/pipes/filepath.pipe';
import { FileIconPipe } from './shared/pipes/file-icon.pipe';
import { MessageDatePipe } from './shared/pipes/message-date.pipe';
import { GroupAvatarComponent } from './shared/components/group-avatar/group-avatar.component';
import { LinkMetaDataPipe } from './shared/pipes/link-meta-data.pipe';
import { GetMetaData } from './shared/pipes/link-meta-data.pipe';
import { ForwardOverlayComponent } from './shared/components/forward-overlay/forward-overlay.component';
import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { SharedModule } from '../_shared/shared.module';
import { ListenersService } from './shared/services/listeners.service';

const messagingRoutes: Routes = [
  {
    path: '',
    component: MessagingComponent,
    children: [
      { path: 'v/:conversationId', component: MessageViewComponent },
      { path: 'new', component: MessageNewComponent }
    ]
  },
];

@NgModule({
  declarations: [
    MessagingComponent,
    MessageListComponent,
    MessageViewComponent,
    MessageInterfaceComponent,
    MessageDetailsComponent,
    MessageNewComponent,

    MuteChatComponent,
    DeleteChatConfirmComponent,
    ReportBlockComponent,
    ReportChatComponent,
    BlockUserComponent,
    LeaveGroupComponent,
    SavedRepliesComponent,
    CreateReplyComponent,
    ManageLabelsComponent,
    SharedPhotosComponent,

    DateFormatPipe,
    DefaultAvatarPipe,
    SmallChatBoxComponent,
    SearchNSelectComponent,
    SmallConversationsComponent,
    SearchConversationBoxComponent,
    SmallNewChatComponent,
    SendMessageFormComponent,
    ConversationNamePipe,
    PersonalizePipe,
    ChatContainerComponent,
    MessageStatusPipe,
    GroupNotificationPipe,
    FilepathPipe,
    FileIconPipe,
    MessageDatePipe,
    GroupAvatarComponent,
    LinkMetaDataPipe,
    ForwardOverlayComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(messagingRoutes),
    ScrollingModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    GetMetaData
  ],
  exports: [

    MuteChatComponent,
    DeleteChatConfirmComponent,
    ReportBlockComponent,
    ReportChatComponent,
    BlockUserComponent,
    LeaveGroupComponent,
    SavedRepliesComponent,
    CreateReplyComponent,
    ManageLabelsComponent,
    SharedPhotosComponent,

    DateFormatPipe,
    DefaultAvatarPipe,
    SmallChatBoxComponent,
    SearchNSelectComponent,
    SmallConversationsComponent,
    SearchConversationBoxComponent,
    SmallNewChatComponent,
    SendMessageFormComponent,
    ConversationNamePipe,
    PersonalizePipe,
    ChatContainerComponent,
    MessageStatusPipe,
    GroupNotificationPipe,
    FilepathPipe,
    FileIconPipe,
    MessageDatePipe,
    GroupAvatarComponent,
    LinkMetaDataPipe,
    HighlightPipe,

    ScrollingModule
  ]
})
export class MessagingModule { }
