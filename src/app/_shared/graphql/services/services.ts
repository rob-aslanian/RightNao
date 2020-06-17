import gql from "graphql-tag";

export class graphqlServices {
    public static addServicesRequest = gql`
        mutation AddServicesRequest($company_id: ID, $request: ServiceRequestInput!){
            AddServicesRequest(company_id: $company_id, request: $request){
                success
                id
            }
        }
    `
    public static GetServicesRequest = gql`
        query GetServicesRequest($company_id: ID $owner_id: ID){
            GetServicesRequest(company_id: $company_id owner_id: $owner_id ){
                id
                userID
                companyID
                title
                description
                has_liked
                currency
                status
                category{
                main
                sub_Category
                }
                location{
                city{
                    id
                    city
                    subdivision
                    country
                }
                country {
                    id
                }
                }
                location_type
                price
                delivery_time
                fixed_price_amount
                min_price_amount
                max_price_amount
                files {
                   id
                }
                is_Draft
                is_Remote
                created_at
                project_type
                proposal_amount
            }
        }
    `

    public static GetAllServiceRequests = gql`
    query GetServicesRequest( $company_id: ID ){
        GetServicesRequest( company_id: $company_id ){
          id
          userID
          companyID
          title
          status
          description
          proposal_amount
          currency
          category{
             main	
          sub_Category
          }
          location {
            city {
              id
              city
              subdivision
              country
            }
            country {
              id
              country
            }
          }
          location_type
          price
          delivery_time
          fixed_price_amount
          min_price_amount
          max_price_amount
          files{
            id
            name
            address
              mime_type
          }
          additional_details{
            skills{
              id
              skill
            }
            toolTechnology{
              id
              tool_Technology
              rank
            }
            languages{
              id
              language
              rank
            }
            service_provider
          }
          is_Draft
          is_Remote
          is_Closed
          created_at
          project_type
        
        }
    }
      
    `

    public static GetReceivedProposals  = gql`
    query GetReceivedProposals($company_id: ID, $request_id: ID, $pagination:PaginationInput!) {
        GetReceivedProposals( company_id: $company_id, request_id:$request_id, pagination:$pagination)
        {
          proposal_amount
          proposals{
            id
            message
            price_type
            price_amount
            currency
            delivery_time
            expertaion_time
            custom_date  
            request {
              id
              title
            }
            service {
              id
              userID
              officeID
              companyID
              officeID
              title
              description
              files {
                id
                name
                address
                mime_type
              }
              category {
                main
                sub_Category
              }
              delivery_time
              price
              currency
              fixed_price_amount
              min_price_amount
              max_price_amount
    
            }

            user_profile{
              id
              url
              avatar
              firstname
              lastname
              middlename
              birthday
              phone
              location {
                city
                country
              }
            }

            service{
              id
              userID
              companyID
              officeID
              title
              description
              category {
                main
                sub_Category
              }
              delivery_time
              price
            }

          }
        }
      }

    `

    public static GetSendedProposals  = gql`
        query GetSendedProposals {
            GetSendedProposals(
        pagination:{
            first:10
            after:"0"
        }){
            proposal_amount
            proposals{
            id
            user_profile{
                url
                avatar
            }
            request{
                id
                title
            }
            service{
                id
                title
            }
            }
        }
      }    
    `

    public static RemoveServicesRequest = gql`
      mutation RemoveServicesRequest($request_id: ID!) {
        RemoveServicesRequest(request_id: $request_id ) {
          id
        }
      }
    
    `

    public static ChangeServicesRequestStatus = gql`
    mutation ChangeServicesRequestStatus($company_id: ID, $service_id: ID!, $status: ServiceStatusEnum!) {
      ChangeServicesRequestStatus(company_id: $company_id, service_id:$service_id, status:$status) {
        id
      }
    }
    `;

    public static getServiceRequest = gql`
        query GetServiceRequest($company_id: ID, $service_id: ID!) {
            GetServiceRequest(company_id: $company_id, service_id: $service_id) {
            id
            userID
            companyID
            title
            description
            currency
            proposal_amount
            has_liked
            category {
                main
                sub_Category
            }
            location {
                city {
                id
                city
                }
                country {
                id
                country
                }
            }
            location_type
            price
            custom_date
            project_type
            created_at
            is_Paued
            is_Remote
            is_Draft
            additional_details {
                skills {
                id
                skill
                }
                toolTechnology {
                id
                tool_Technology
                rank
                }
                languages {
                id
                language
                rank
                }
                service_provider
            }
            files {
                id
                name
                address
                mime_type
            }
            max_price_amount
            min_price_amount
            fixed_price_amount
            delivery_time
            }
        }`; 
    public static changeServiceRequest = gql`
        mutation ChangeServicesRequest($company_id: ID, $service_id: ID!, $request: ServiceRequestInput!) {
            ChangeServicesRequest(company_id: $company_id, service_id: $service_id, request: $request) {
            id
            success
            }
        }
    `;
    public static removeFilesInServiceRequest = gql`
        mutation RemoveFilesInServiceRequest($company_id: ID, $service_id: ID!, $files_ids: [ID!]!) {
            RemoveFilesInServiceRequest(company_id: $company_id, service_id: $service_id, files_ids: $files_ids) {
            id
            success
            }
        }
    `;

    public static GetServicesRequestReview = gql`
        query GetServicesRequestReview($company_id: ID, $pagination:PaginationInput! $owner_id: ID ) {
          GetServicesRequestReview(company_id: $company_id, pagination: $pagination owner_id: $owner_id ) {
            review_amount
            reviews_avg {
              clarity_avg
              communication_avg
              payment_avg
            }
            reviews {
            id
            description
            hire
            clarity
            communication
            payment
            review_avg
            review_at
            service {
              id
              userID
              title
              description
            }
              user_profile{
                id
                url
                avatar
                firstname
                lastname
              }
              company_profile{
                id
                avatar
                url
                name
              }
            }
          }
        }

    `; 

    public static GetSavedVOfficeServices = gql`
        query GetSavedVOfficeServices($company_id: ID, $pagination: PaginationInput) {
          GetSavedVOfficeServices(company_id:$company_id , pagination: $pagination ) {
            service_amount
            services {
              id
              userID
              companyID
              officeID
              title
              description
              category{
                main
                sub_Category
              }
              delivery_time
              price
              currency
              fixed_price_amount
              min_price_amount
              max_price_amount
              additional_details {
                qualifications{
                  skills{
                    id
                    skill
                  }
                  toolTechnology {
                    id
                    tool_Technology
                  }
                }
                purpose
                service_includes
              }
              location_type
              location {
                city{
                  id
                  city
                  subdivision
                  country
                }
                country{
                  id
                  country
                }
              }
              files {
                id
                name
                mime_type
                address
              }
              is_Draft
              is_Remote
              is_Paused
              has_liked
              wokring_hour {
                is_always_open
                working_date {
                  week_days
                  hour_from
                  hour_to
                }
              }
              
            }
          }
        }
    `

    public static IgnoreProposalForServiceRequest = gql`
    mutation IgnoreProposalForServiceRequest($company_id:ID, $proposal_id:ID! ) {
      IgnoreProposalForServiceRequest(company_id: $company_id, proposal_id: $proposal_id) {
        id
        success
      }
    }
    `; 
 
    public static GetServiceOrders = gql`
    query GetServiceOrders($owner_id: ID!, $office_id: ID,  $order_type: OrderType!, $order_status: OrderStatusEnum!, $pagination: PaginationInput) {
      GetServiceOrders(owner_id: $owner_id, office_id:$office_id, order_type: $order_type, order_status: $order_status, pagination: $pagination) {
        order_amount
        orders {
          id
          user_profile {
            id
            url
            firstname
          }
        }
      }
    }
    `

    public static OrderProposalForServiceRequest = gql`
      mutation OrderProposalForServiceRequest($company_id:ID, $proposal_id:ID! ) {
        OrderProposalForServiceRequest(company_id:$company_id, proposal_id:$proposal_id ) {
          id
          success
        }
      }
    `; 

    


}