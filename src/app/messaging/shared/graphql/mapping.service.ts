import { Injectable } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

import * as queries from './queries';
import * as mutations from './mutations';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  constructor(
    private globalUserProService: GlobalUserProService,
    private apollo:Apollo
  ) { }

  // QUERIES

  get isCompany() {
    return this.globalUserProService.isCompanyActive()
    // return true;
  }

  get companyId() {
    return this.globalUserProService.getCompanyProfile().id;
  }

  get getConversationList() {
    return (this.isCompany ? queries.getConversationListForCompany : queries.getConversationList)
  }

  get getAllMessages() {
    return (this.isCompany ? queries.getAllMessagesForCompany : queries.getAllMessages)
  }

  get GetConversation() {
    return (this.isCompany ? queries.GetConversationForCompany : queries.GetConversation)
  }

  get getProfile() {
    return (this.isCompany ? queries.getProfile : queries.GetCompanyProfile)
  }

  get isOnline() {
    return (this.isCompany ? queries.isCompanyOnline : queries.isUserOnline)
  }

  get getUserProfile() {
    return queries.getProfile
  }

  get getCompanyProfile() {
    return queries.GetCompanyProfile
  }

  get SearchInConversation() {
    return (this.isCompany ? queries.SearchInConversationForCompany : queries.SearchInConversation)
  }

  get GetMyReplies() {
    return (this.isCompany ? queries.GetMyRepliesForCompany : queries.GetMyReplies)
  }

  get GetAllLabels() {
    return (this.isCompany ? queries.GetAllLabelsForCompany : queries.GetAllLabels)
  }

  get getFriendships() {
    return (this.isCompany ? queries.getFriendships : queries.getFriendships);
  }

  get getFollowingCompanies() {
    return (this.isCompany ? queries.getFollowingCompaniesForCompany : queries.getFollowingCompanies);
  }
  
  get getBlockedUsersOrCompanies() {
    return (this.isCompany ? queries.getBlockedUsersForCompany : queries.getBlockedUsersOrCompanies);
  }

  get GetActiveConnections() {
    return queries.GetActiveConnections
  }

  // MUTATIONS
  get muteChat() {
    return (this.isCompany ? mutations.muteChatForCompany : mutations.muteChat);
  }

  get setReadUnread() {
    return (this.isCompany ? mutations.setReadUnreadForCompany : mutations.setReadUnread);
  }

  get archiveConversation() {
    return (this.isCompany ? mutations.archiveConversationForCompany : mutations.archiveConversation);
  }

  get deleteConversation() {
    return (this.isCompany ? mutations.deleteConversationForCompany : mutations.deleteConversation);
  }

  get CreateConversation() {
    return (this.isCompany ? mutations.CreateConversationForCompany : mutations.CreateConversation);
  }

  get CreateReply() {
    return (this.isCompany ? mutations.CreateReplyForCompany : mutations.CreateReply);
  }

  get DeleteReply() {
    return (this.isCompany ? mutations.DeleteReplyForCompany : mutations.DeleteReply);
  }
  get CreateLabel() {
    return (this.isCompany ? mutations.CreateLabelForCompany : mutations.CreateLabel);
  }

  get DeleteLabel() {
    return (this.isCompany ? mutations.DeleteLabelForCompany : mutations.DeleteLabel);
  }
  get AddLabelToConversation() {
    return (this.isCompany ? mutations.AddLabelToConversationForCompany : mutations.AddLabelToConversation);
  }

  get RemoveLabelFromConversation() {
    return (this.isCompany ? mutations.RemoveLabelFromConversationForCompany : mutations.RemoveLabelFromConversation);
  }

  get BlockUser() {
    return (this.isCompany ? mutations.BlockUserForCompany : mutations.BlockUser);
  }

  get BlockCompanyOnly() {
    return mutations.BlockCompany
  }

  get BlockUserOnly() {
    return mutations.BlockUser
  }

  get UnblockUser() {
    return (this.isCompany ? mutations.UnblockUserForCompany : mutations.UnblockUser);
  }

  get ReportConversation() {
    return (this.isCompany ? mutations.ReportConversationForCompany : mutations.ReportConversation);
  }

  get LeaveConversation() {
    return (this.isCompany ? mutations.LeaveConversationForCompany : mutations.LeaveConversation);
  }

  get RenameConversation() {
    return (this.isCompany ? mutations.RenameConversationForCompany : mutations.RenameConversation);
  }

  get AddParticipants() {
    return (this.isCompany ? mutations.AddParticipantsForCompany : mutations.AddParticipants);
  }

  get SetOffline() {
    return (this.isCompany ? mutations.SetOfflineForCompany : mutations.SetOffline);
  }

  get ChangeConversationAvatar() {
    return (this.isCompany ? mutations.ChangeConversationAvatarForCompany : mutations.ChangeConversationAvatar);
  }

  get UpdateReply() {
    return (this.isCompany ? mutations.UpdateReplyForCompany : mutations.UpdateReply);
  }

  get BlockConversation() {
    return (this.isCompany ? mutations.BlockConversationForCompany : mutations.BlockConversation);
  }

  get UpdateLabel() {
    return (this.isCompany ? mutations.UpdateLabelForCompany : mutations.UpdateLabel);
  }


  /**
   * Unblock user 
   * 
   * @param userId 
   */
  unBlockUser(userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:mutations.UnblockUser,
      variables:{userId}
    })
  }

  unBlockCompany(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:mutations.UnblockCompany,
      variables:{companyId}
    })
  }

  
}
