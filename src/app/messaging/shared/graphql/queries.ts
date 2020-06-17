import gql from 'graphql-tag';

//FOR USERS
export const getConversationList = gql`
    query GetMyConversations($category: ConversationCategory, $labelId:ID, $text:String){
        GetMyConversations(category: $category, labelId:$labelId, text:$text){
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
                type,
                timestamp
            },
            participants{
                id,
                name,
                url,
                avatar,
                is_company,
                is_admin,
                has_left
            },
        }
    }
`;

export const getAllMessages = gql`
query GetMessages( $conversationId: ID!){
    GetMessages(conversationId: $conversationId){
        id,
        type,
        conversation_id,
        sender_id,
        text,
        files{
            file,
            file_name,
            file_size
        },
        timestamp,
        received_by,
        seen_by
    }
}`;

export const GetConversation = gql`
query GetConversation( $id: ID!){
    GetConversation(id: $id){
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
                is_admin,
                has_left,
                is_active
            },
    }
}`;

export const getProfile = gql`
query getProfile($url: String!){
  getProfile(url: $url) {
    id,
    url,
    firstname,
    lastname,
    headline,
    avatar,
    email,
    phone,
    online,
    location{
        city,
        country
    },
    experiences(first: 20){
    id,
    title,
    company,
    start_date,finish_date,
    currently,description
    },
  }   
}
`;

export const isUserOnline = gql`
query getProfile($url: String!){
  getProfile(url: $url) {
    id,
    online
  }   
}
`;

export const SearchInConversation = gql`
query SearchInConversation($conversationId: ID!, $query:String!, $file:String!){
    SearchInConversation(conversationId: $conversationId, query:$query, file:$file) {
        id,
        type,
        conversation_id,
        sender_id,
        text,
        files{
            file,
            file_name,
            file_size
        },
        timestamp,
        received_by,
        seen_by
    },
  }   
`;

export const GetMyReplies = gql`
query GetMyReplies($query:String!){
    GetMyReplies(query: $query){
        id
        title
        text
        files{
            id
            name
        }
    },
  }   
`;

export const GetAllLabels = gql`
query GetAllLabels{
    GetAllLabels{
        id
        name
        color
        count
    },
  }   
`;

export const getFriendships = gql`
query getFriendships($query: String, $category:String, $letter:String, $sort_by: String, $companies:[String!]){
    getFriendships(query: $query, category:$category, letter:$letter, sort_by:$sort_by, companies:$companies) {
        friend{
            id,
            url,
            first_name,
            last_name,
            avatar
        }
    },
  }   
`;

export const getFollowingCompanies = gql`
query getFollowingCompanies($query: String, $category:String, $letter:String, $sort_by: String){
    getFollowingCompanies(query: $query, category:$category, letter:$letter, sort_by:$sort_by) {
        company{
            id,
            url,
            name,
            avatar
        }
    },
  }   
`;

export const getBlockedUsersOrCompanies = gql`
query getBlockedUsersOrCompanies{
    getBlockedUsersOrCompanies{
            id,
            url,
            name,
            avatar,
            is_company
    }
  }   
`;

export const GetActiveConnections = gql`
query GetActiveConnections{
    GetActiveConnections{
            id,
            url,
            firstname,
            lastname,
            avatar,
    }
  }   
`;

// FOR COMPANIES
export const getConversationListForCompany = gql`
    query GetMyConversationsForCompany($companyId: ID!,$category: ConversationCategory, $labelId:ID, $text:String){
        GetMyConversationsForCompany(companyId: $companyId, category: $category, labelId:$labelId, text:$text){
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
                type,
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
    }
`;



export const getAllMessagesForCompany = gql`
query GetMessagesForCompany( $companyId: ID!,$conversationId: ID!){
    GetMessagesForCompany(companyId: $companyId,conversationId: $conversationId){
        id,
        type,
        conversation_id,
        sender_id,
        text,
        files{
            file,
            file_name,
            file_size
        },
        timestamp,
        received_by,
        seen_by
    }
}`;

export const GetConversationForCompany = gql`
query GetConversationForCompany($companyId: ID!, $id: ID!){
    GetConversationForCompany(companyId: $companyId,id: $id){
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
                url,
                is_company,
                is_admin,
                has_left,
                is_active
            },
    }
}`;

export const GetCompanyProfile = gql`
query GetCompanyProfile($url: String!){
    GetCompanyProfile(url: $url) {
    id,
    url,
    name,
    avatar,
    description,
    industry { id },
    mission,
    email,
    addresses{
        city{
            id,
            city
        }
        country_id
        primary
    }
    phone{
        country_code,
        number
    },
    cover,
    
  }   
}
`;

export const isCompanyOnline = gql`
query GetCompanyProfile($url: String!){
    GetCompanyProfile(url: $url) {
    id
    online
  }   
}
`;

export const SearchInConversationForCompany = gql`
query SearchInConversationForCompany($companyId: ID!,$conversationId: ID!, $query:String!, $file:String!){
    SearchInConversationForCompany(companyId: $companyId,conversationId: $conversationId, query:$query, file:$file) {
        id,
        type,
        conversation_id,
        sender_id,
        text,
        files{
            file,
            file_name,
            file_size
        },
        timestamp,
        received_by,
        seen_by
    },
  }   
`;

export const GetMyRepliesForCompany = gql`
query GetMyRepliesForCompany($companyId: ID!,$query:String!){
    GetMyRepliesForCompany(companyId: $companyId,query: $query){
        id
        title
        text
        files{
            id
            name
        }
    },
  }   
`;

export const GetAllLabelsForCompany = gql`
query GetAllLabelsForCompany($companyId: ID!){
    GetAllLabelsForCompany(companyId: $companyId){
        id
        name
        color
        count
    },
  }   
`;

export const getFriendshipsForCompany = gql`
query getFriendshipsForCompany($companyId: ID!,$query: String, $category:String, $letter:String, $sort_by: String, $companies:[String!]){
    getFriendshipsForCompany(companyId: $companyId,query: $query, category:$category, letter:$letter, sort_by:$sort_by, companies:$companies) {
        friend{
            id,
            url,
            first_name,
            last_name,
            avatar
        }
    },
  }   
`;

export const getFollowingCompaniesForCompany = gql`
query getFollowingCompaniesForCompany($companyId: String!, $query: String, $category:String, $letter:String, $sort_by: String,){
    getFollowingCompaniesForCompany(companyId: $companyId,query: $query, category:$category, letter:$letter, sort_by:$sort_by) {
        company{
            id,
            url,
            name,
            avatar
        }
    },
  }   
`;

export const getBlockedUsersForCompany = gql`
query getBlockedUsersForCompany($company_id: ID!){
    getBlockedUsersForCompany(company_id: $company_id) {
        id,
        name,
        avatar,
        is_company
    }
  }   
`;

