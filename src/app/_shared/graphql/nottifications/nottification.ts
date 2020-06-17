import gql from 'graphql-tag';


export class graphqlNottification {

    public static getUserNottifications = gql`
    query getNotifications($pagination:PaginationInput!){
        getNotifications(pagination:$pagination){
                amount_not_seen
                notification_json
            }
        }
    `;

    public static getCompanyNotifications = gql`
        query getCompanyNotifications($company_id:ID! $pagination:PaginationInput!) {
            getCompanyNotifications(company_id:$company_id  pagination:$pagination){
                amount_not_seen
                notification_json
            }
        }
    
    `;

    public static MarkNotificationAsSeen = gql`
        mutation MarkNotificationAsSeen($ids:[ID!]!){
            MarkNotificationAsSeen(ids:$ids){
                id
                success
            }
        }
    `;

    public static  MarkNotificationAsSeenForCompany= gql`
        mutation MarkNotificationAsSeenForCompany($company_id:String! $ids:[ID!]!){
            MarkNotificationAsSeenForCompany(company_id:$company_id ids:$ids ){
                id
                success
            }
        }
    `


    public static RemoveNotification = gql`
        mutation RemoveNotification($ids:[ID!]!){
            RemoveNotification(ids:$ids){
                success
            }
        }
    `;

    public static ApproveFounderRequest = gql`
        mutation ApproveFounderRequest($company_id: ID! $request_id: ID!){
            ApproveFounderRequest(company_id:$company_id request_id:$request_id){
                id
                success
            }
        }
    
    `;

    public static RemoveFounderRequest = gql`
        mutation RemoveFounderRequest($company_id: ID! $request_id: ID!){
            RemoveFounderRequest(company_id:$company_id request_id:$request_id){
                id
                success
            }
        }
    
    `;
  


}