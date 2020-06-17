import gql from 'graphql-tag';

// FOR USER
export const muteChat = gql`
mutation MuteConversation( $conversationId: ID!, $mute:Boolean!){
    MuteConversation( conversationId: $conversationId,mute: $mute)
}`;

export const setReadUnread = gql`
mutation SetConversationUnreadFlag( $conversationId: ID!, $flag:Boolean!){
    SetConversationUnreadFlag( conversationId: $conversationId,flag: $flag)
}`;

export const archiveConversation = gql`
mutation ArchiveConversation( $conversationId: ID!, $archive:Boolean!){
    ArchiveConversation( conversationId: $conversationId,archive: $archive)
}`;

export const deleteConversation = gql`
mutation DeleteConversation( $conversationId: ID!){
    DeleteConversation( conversationId: $conversationId)
}`;

export const CreateConversation = gql`
mutation CreateConversation( $name: String!, $avatar:String!, $participants:[ParticipantInput!]!){
    CreateConversation(name: $name,avatar: $avatar, participants: $participants ){
        id
    }
}`;

export const CreateReply = gql`
mutation CreateReply( $title: String!, $text:String!,  $files:[ChatReplyFileInput!]){
    CreateReply( title: $title, text:$text, files:$files){
        id
    }
}
`;

export const DeleteReply = gql`
mutation DeleteReply( $id: ID!){
    DeleteReply( id: $id)
}
`;

export const CreateLabel = gql`
mutation CreateLabel( $name: String!, $color:String!){
    CreateLabel( name: $name, color:$color){
        id
        name
        color
        count
    }
}
`;

export const DeleteLabel = gql`
mutation DeleteLabel( $id: ID!){
    DeleteLabel( id: $id)
}
`;

export const AddLabelToConversation = gql`
mutation AddLabelToConversation( $conversationId: ID!, $labelId: ID!){
    AddLabelToConversation( conversationId: $conversationId,  labelId: $labelId)
}
`;

export const RemoveLabelFromConversation = gql`
mutation RemoveLabelFromConversation( $conversationId: ID!, $labelId: ID!){
    RemoveLabelFromConversation( conversationId: $conversationId,  labelId: $labelId)
}
`;

export const BlockUser = gql`
mutation BlockUser( $userId: String!){
    BlockUser( userId: $userId)
}
`;

export const UnblockUser = gql`
mutation UnblockUser( $userId: String!){
    UnblockUser( userId: $userId)
}
`;

export const ReportConversation = gql`
mutation ReportConversation( $conversationId: ID!, $text: String!){
    ReportConversation( conversationId: $conversationId,  text: $text)
}
`;

export const LeaveConversation = gql`
mutation LeaveConversation( $conversationId: ID!){
    LeaveConversation( conversationId: $conversationId)
}
`;

export const RenameConversation = gql`
mutation RenameConversation( $conversationId: ID!, $name: String!){
    RenameConversation( conversationId: $conversationId, name: $name )
}
`;

export const AddParticipants = gql`
mutation AddParticipants($conversationId: ID!, $participants:[ParticipantInput!]!){
    AddParticipants(conversationId: $conversationId, participants: $participants ){
        id,
        name,
        avatar,
        is_group,
        unread,
        muted,
        blocked,
        archived,
        has_left,
        labels,
        last_message{
            id,
            conversation_id,
            sender_id,
            text,
            files{
                file,
                file_name,
                file_size
            },
            timestamp
        },
        participants{
            id,
            name,
            url,
            avatar,
            is_company,
            is_admin
        },
    }
}`;

export const SetOffline = gql`
mutation SetOffline( $offline: Boolean!){
    SetOffline( offline: $offline )
}
`;


export const ChangeConversationAvatar = gql`
mutation ChangeConversationAvatar( $conversationId: ID!, $avatar: String!){
    ChangeConversationAvatar( conversationId: $conversationId,  avatar: $avatar  )
}
`;

export const UpdateReply = gql`
mutation UpdateReply($id: ID!, $title: String!, $text:String!,  $files:[ChatReplyFileInput!]){
    UpdateReply(id: $id, title: $title, text:$text, files:$files){
        id
    }
}
`;

export const BlockConversation = gql`
mutation BlockConversation( $conversationId: ID!, $block:Boolean!){
    BlockConversation( conversationId: $conversationId,block: $block)
}
`;


export const UpdateLabel = gql`
mutation UpdateLabel(  $id: ID!, $name: String!, $color:String!){
    UpdateLabel( id: $id name: $name, color:$color)
}
`;



//FOR COMPANY
export const muteChatForCompany = gql`
mutation MuteConversationForCompany($companyId: String!, $conversationId: ID!, $mute:Boolean!){
    MuteConversationForCompany(companyId: $companyId,   conversationId: $conversationId,mute: $mute)
}`;

export const setReadUnreadForCompany = gql`
mutation SetConversationUnreadFlagForCompany($companyId: String!,  $conversationId: ID!, $flag:Boolean!){
    SetConversationUnreadFlagForCompany(companyId: $companyId,   conversationId: $conversationId,flag: $flag)
}`;

export const archiveConversationForCompany = gql`
mutation ArchiveConversationForCompany($companyId: String!, $conversationId: ID!, $archive:Boolean!){
    ArchiveConversationForCompany( companyId: $companyId,  conversationId: $conversationId,archive: $archive)
}`;

export const deleteConversationForCompany = gql`
mutation DeleteConversationForCompany($companyId: String!, $conversationId: ID!){
    DeleteConversationForCompany(companyId: $companyId,  conversationId: $conversationId)
}`;

export const CreateConversationForCompany = gql`
mutation CreateConversationForCompany( $companyId: String!, $name: String!, $avatar:String!, $participants:[ParticipantInput!]!){
    CreateConversationForCompany(companyId: $companyId,  name: $name,avatar: $avatar, participants: $participants ){
        id
    }
}`;

export const CreateReplyForCompany = gql`
mutation CreateReplyForCompany($companyId: String!,  $title: String!, $text:String!,  $files:[ChatReplyFileInput!]){
    CreateReplyForCompany(companyId: $companyId, title: $title, text:$text, files:$files){
        id
    }
}
`;

export const DeleteReplyForCompany = gql`
mutation DeleteReplyForCompany($companyId: String!,  $id: ID!){
    DeleteReplyForCompany( companyId: $companyId, id: $id)
}
`;

export const CreateLabelForCompany = gql`
mutation CreateLabelForCompany( $companyId: String!, $name: String!, $color:String!){
    CreateLabelForCompany(companyId: $companyId, name: $name, color:$color){
        id
        name
        color
        count
    }
}
`;

export const DeleteLabelForCompany = gql`
mutation DeleteLabelForCompany($companyId: String!, $id: ID!){
    DeleteLabelForCompany( companyId: $companyId, id: $id)
}
`;

export const AddLabelToConversationForCompany = gql`
mutation AddLabelToConversationForCompany($companyId: String!,  $conversationId: ID!, $labelId: ID!){
    AddLabelToConversationForCompany(  companyId: $companyId,  conversationId: $conversationId,  labelId: $labelId)
}
`;

export const RemoveLabelFromConversationForCompany = gql`
mutation RemoveLabelFromConversationForCompany($companyId: String!, $conversationId: ID!, $labelId: ID!){
    RemoveLabelFromConversationForCompany( companyId: $companyId,conversationId: $conversationId,  labelId: $labelId)
}
`;

export const BlockUserForCompany = gql`
mutation BlockUserForCompany($companyId: String!, $userId: String!){
    BlockUserForCompany(companyId: $companyId, userId: $userId)
}
`;

export const UnblockUserForCompany = gql`
mutation UnblockUserForCompany($company_id: ID!,  $user_id: ID!){
    UnblockUserForCompany( company_id: $company_id,user_id: $userId)
}
`;

export const ReportConversationForCompany = gql`
mutation ReportConversationForCompany($companyId: String!, $conversationId: ID!, $text: String!){
    ReportConversationForCompany( companyId: $companyId,conversationId: $conversationId,  text: $text)
}
`;

export const LeaveConversationForCompany = gql`
mutation LeaveConversationForCompany($companyId: String!, $conversationId: ID!){
    LeaveConversationForCompany(companyId: $companyId, conversationId: $conversationId)
}
`;

export const RenameConversationForCompany = gql`
mutation RenameConversationForCompany($companyId: String!, $conversationId: ID!, $name: String!){
    RenameConversationForCompany(companyId: $companyId, conversationId: $conversationId, name: $name )
}
`;

export const AddParticipantsForCompany = gql`
mutation AddParticipantsForCompany($companyId: String!, $conversationId: ID!, $participants:[ParticipantInput!]!){
    AddParticipantsForCompany(companyId: $companyId,conversationId: $conversationId, participants: $participants ){
        id,
        name,
        avatar,
        is_group,
        unread,
        muted,
        blocked,
        archived,
        has_left,
        labels,
        last_message{
            id,
            conversation_id,
            sender_id,
            text,
            files{
                file,
                file_name,
                file_size
            },
            timestamp
        },
        participants{
            id,
            name,
            url,
            avatar,
            is_company,
            is_admin
        },
    }
}`;

export const SetOfflineForCompany = gql`
mutation SetOfflineForCompany($companyId: ID! $offline: Boolean!){
    SetOfflineForCompany(companyId: $companyId, offline: $offline )
}
`;


export const ChangeConversationAvatarForCompany= gql`
mutation ChangeConversationAvatarForCompany( $companyId: String!, $conversationId: ID!, $avatar: String!){
    ChangeConversationAvatarForCompany(companyId: $companyId, conversationId: $conversationId,  avatar: $avatar  )
}
`;

export const UpdateReplyForCompany = gql`
mutation UpdateReplyForCompany($companyId: String!, $replyId: ID!, $title: String!, $text:String!,  $files:[ChatReplyFileInput!]){
    UpdateReplyForCompany(companyId: $companyId, replyId: $replyId, title: $title, text:$text, files:$files){
        id
    }
}
`;

export const BlockCompany = gql`
mutation BlockCompany( $companyId: String!){
    BlockCompany( companyId: $companyId)
}
`;

export const UnblockCompany = gql`
mutation UnblockCompany( $companyId: String!){
    UnblockCompany( companyId: $companyId)
}
`;

export const BlockConversationForCompany = gql`
mutation BlockConversationForCompany( $companyId: String!, $conversationId: ID!, $block:Boolean!){
    BlockConversationForCompany( companyId: $companyId, conversationId: $conversationId,block: $block)
}
`;

export const UpdateLabelForCompany = gql`
mutation UpdateLabelForCompany(  $companyId: String!,$id: ID!, $name: String!, $color:String!){
    UpdateLabelForCompany(companyId: $companyId, id: $id name: $name, color:$color)
}
`;