import gql from "graphql-tag";

export class graphqlOffice {
  
  public static createVOffice = gql`
    mutation CreateVOffice($company_id: ID, $input: CreateVOfficeInput!) {
      CreateVOffice(company_id: $company_id, input: $input) {
        id
        success
      }
    }
  `;

  public static getSkills = gql`
    query getProfileByID($user_id: String!) {
      getProfileByID(user_id: $user_id) {
        id
        skills(first: 999) {
          name
        }
      }
    }
  `;
  public static getTools = gql`
    query getProfileByID($user_id: String!) {
      getProfileByID(user_id: $user_id) {
        id
        toolsTechnologies(first: 999) {
          tool_Technology
          rank
        }
      }
    }
  `;
  public static getLanguages = gql`
    query getProfileByID($user_id: String!) {
      getProfileByID(user_id: $user_id) {
        id
        languages(first: 999) {
          language
          rate
        }
      }
    }
  `;
  public static getVOfficeById = gql`
      query GetVOfficeByID($company_id: ID $office_id: ID!) {
        GetVOfficeByID(company_id: $company_id  office_id: $office_id) {
          id
          userID
          companyID
          name
          isMe
          cover
          cover_origin
          location{
          city{
            id
            city
          }
          country{
            id
            country
          }
        }
        category
        description
        languages {
          id
          language
          rank
        }
        created_at
        isOut
        return_date
      }
    }
  `;

  public static getVOffice = gql`
      query GetVOfficeByID($company_id: ID $office_id: ID!) {
        GetVOfficeByID(  office_id: $office_id company_id: $company_id ) {
            id
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
        cover_origin
        name
        languages {
          id
          language
          rank
        }
        
      }
    }`;

  public static getVOfficeServiceById = gql`
      query GetVOfficeService($company_id: ID, $office_id: ID!, $service_id: ID!) {
        GetVOfficeService(company_id: $company_id, office_id: $office_id, service_id: $service_id) {
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
          currency
          fixed_price_amount
          min_price_amount
          max_price_amount
          additional_details {
            qualifications {
              skills {
                id
                skill
              }
              toolTechnology {
                id
                tool_Technology
                rank
              }
            }
            purpose
            service_includes
          }
          location_type
          has_liked
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
          files {
            id
            name
            address
            mime_type
          }
          is_Draft
          is_Remote
          is_Paused
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
 `;

  public static getVOfficeCategory = gql`
    query GetVOfficeByID($company_id: ID $office_id: ID!) {
      GetVOfficeByID(company_id: $company_id  office_id: $office_id) {
        id
        category
      }
    }
`;

  public static getVoffices = gql`
      query GetVOffice( $company_id: ID $user_id: ID ) {
        GetVOffice( company_id: $company_id user_id: $user_id ) {
        v_offices {
          id
          name
          isMe
          cover
          cover_origin
          category
          isOut
          userID 
          companyID 
        }
      }
    }
  `;

  public static addChangeDescription = gql`
    mutation AddChangeVOfficeDescription(
      $company_id: ID
      $office_id: ID!
      $description: String!
    ) {
      AddChangeVOfficeDescription(
        company_id: $company_id
        office_id: $office_id
        description: $description
      ) {
        id
        success
      }
    }
  `;
  public static getVOfficeIds = gql`
    query GetVOfficeServices( $company_id: ID $office_id: ID ) {
      GetVOfficeServices( company_id: $company_id office_id: $office_id ) {
        services{
            id
        }
      }
    }
  `;
 
 
 
 
  public static addVofficeService = gql`
    mutation AddVOfficeService(
      $company_id: ID
      $office_id: ID!
      $service: ServiceInput!
    ) {
      AddVOfficeService(
        company_id: $company_id
        office_id: $office_id
        service: $service
      ) {
        id
        success
      }
    }
  `;
  public static getVofficeService = gql`
  query GetVOfficeServices($company_id: ID $office_id: ID) {
    GetVOfficeServices(company_id: $company_id  office_id: $office_id) {
      services {
        id
        userID
        companyID
        officeID
        title
        is_Paused
        is_Remote
        is_Draft
        files{
          id
          name
          address
          mime_type
        }
         fixed_price_amount
         location_type
         description
         max_price_amount
         min_price_amount
         currency
         price
         delivery_time
         additional_details {
             qualifications {
                 skills {
                    id
                    skill
                 }
                 toolTechnology {
                    tool_Technology
                    rank
                 }
             }
         }
      }
    }
  }`;

  public static changeVOfficeStatus = gql`
      mutation ChangeVOfficeServiceStatus( $company_id: ID $office_id: ID! $service_id: ID! $status: ServiceStatusEnum! ) {
        ChangeVOfficeServiceStatus( company_id: $company_id office_id: $office_id service_id: $service_id status: $status ) {
          id
          success
       }
     }
  `;



  public static isOutOffice = gql`
    mutation IsOutOfOffice(
      $company_id: ID
      $office_id: ID!
      $is_Out: Boolean!
      $return_Date: String!
    ) {
      IsOutOfOffice(
        company_id: $company_id
        office_id: $office_id
        is_Out: $is_Out
        return_Date: $return_Date
      ) {
        id
        success
      }
    }
  `;
 public static getUserInfo = gql`
    query getProfileByID($user_id:String! ){
      getProfileByID( user_id:$user_id ){
        id
        avatar
        url
        lastname
        firstname
        email 
        phone 
      }
    }
 `;
 public static changeVofficeService = gql`
    mutation ChangeVOfficeService(  $company_id: ID $service_id: ID! $office_id:  ID! $service: ServiceInput! ) {
      ChangeVOfficeService( company_id: $company_id service_id: $service_id office_id:  $office_id service: $service ){
        id
        success
      }
    }`;

 public static addVOfficePortfolio = gql`
      mutation AddVOfficePortfolio(
        $company_id: ID
        $office_id:  ID!
        $portfolio:  VOfficePortfolioInput!
      ){
      AddVOfficePortfolio(
        company_id: $company_id
        office_id:  $office_id
        portfolio:  $portfolio
      ) {
        id
        success   
        links {
          id
          address
        }
      }
    } 
 `;
 public static removeVOfficePortfolio = gql`
    mutation RemoveVOfficePortfolio(
        $company_id:   ID
        $office_id:    ID!
        $portfolio_id: ID!
        
      ) {
        RemoveVOfficePortfolio(
          company_id:   $company_id
          office_id:    $office_id
          portfolio_id: $portfolio_id
        ){
          id
          success
        }
      }
 `;

 public static changeOfficePortoflio = gql`
    mutation ChangeVOfficePortfolio(
      $company_id:   ID
      $office_id:    ID!
      $portfolio_id: ID
      $portfolio:    VOfficePortfolioInput!
    ){
      ChangeVOfficePortfolio(
        company_id:   $company_id
        office_id:    $office_id
        portfolio_id: $portfolio_id
        portfolio:    $portfolio
      ){
          id
          success
      }
    }
 `;

 public static removeFilesInOfficePortfolio = gql`
    mutation RemoveFilesInVOfficePortfolio(
      $company_id:   ID
      $office_id:    ID!
      $portfolio_id: ID!
      $files_ids:   [ID!]!
    ){
      RemoveFilesInVOfficePortfolio(
      company_id:   $company_id
      office_id:    $office_id
      portfolio_id: $portfolio_id
      files_ids:    $files_ids
    ){
      id
      success
    }
    }
 `;

 public static getCompanyProfile = gql`
     query GetCompanyProfileByID($company_id: ID!) {
        GetCompanyProfileByID(company_id: $company_id){
              id
              url
              name
              avatar
              phone{
                 number
              }
              email
        }
     }
 
 `;
 public static removeFilesInVSerice = gql`
    mutation RemoveFilesInVOfficeService( $company_id: ID $service_id: ID! $files_ids: [ID!]! ) {
        RemoveFilesInVOfficeService( company_id: $company_id service_id: $service_id files_ids:  $files_ids ) {
          id
          success
        }
    }
 `;
 public static removeVofficeService = gql`
  mutation RemoveVOfficeService( $company_id: ID $service_id: ID! ) {
      RemoveVOfficeService(  company_id: $company_id  service_id: $service_id ) {
          id
          success
      }
  }
 `;

 
 public static removeVOffice = gql`
    mutation RemoveVOffice( $company_id: ID $office_id: String! ) {
      RemoveVOffice(  office_id: $office_id company_id: $company_id ) {
        id
        success
      }

    }
 `;

  public static addVOfficeLanguages = gql`
        mutation AddVOfficeLanguages(
          $company_id: ID,
          $office_id: ID!,
          $languages: [ChangeQualificationLanguageInput!]
      ) {
          AddVOfficeLanguages( company_id: $company_id , office_id:  $office_id ,languages: $languages) {
              ids
          }
      }
  `;

  public static removeVOfficeLanguages = gql`
      mutation RemoveVOfficeLanguages($company_id: ID $office_id: ID! $language_ids: [ID!]!) {
        RemoveVOfficeLanguages(company_id: $company_id office_id: $office_id language_ids:$language_ids) {
          id
          success
        }
      }
  `;

  public static changeVOfficeLanguages = gql`
      mutation ChangeVOfficeLanguage( $company_id: ID $office_id: ID! $languages: [ChangeQualificationLanguageInput!] ) {
        ChangeVOfficeLanguage( company_id: $company_id  office_id: $office_id languages: $languages) {
          id
          success
        }
      }
  `;
  public static changeVOffice = gql`
    mutation ChangeVOffice($company_id: ID $office_id: ID! $input: CreateVOfficeInput!) {
      ChangeVOffice( company_id: $company_id office_id: $office_id input: $input) {
          id
        success
      }
    }
  `;

  public static removeVOfficeCover = gql`
    mutation RemoveVofficeCover($office_id: ID! $company_id: ID) {
      RemoveVofficeCover(  office_id: $office_id company_id: $company_id) {
        id
        success
      }
    }
  `;
  public static isMe = gql`
    query isMe($company_id: ID, $office_id: ID!) {
      GetVOfficeByID(company_id: $company_id, office_id: $office_id) {
        isMe
        companyID
        userID
        id
      }
    }`;

    public static likeVOfficeService = gql`
        mutation SaveVOfficeService( $service_id: ID! $company_id: ID ) {
          SaveVOfficeService(service_id: $service_id company_id: $company_id ){
            success
          }
        }
    `;

    public static unlikeVOfficeService = gql`
      mutation UnSaveVOfficeService( $service_id: ID! $company_id: ID )  {
        UnSaveVOfficeService( service_id: $service_id company_id: $company_id ){
          success
        }
      }
`;
   public static orderVOfficeService = gql`
      mutation OrderService($input: OrderServiceInput!) {
        OrderService(input: $input) {
          id
          success
        }
      }
   `;
   public static getServiceOrders = gql`
      query GetServiceOrders($owner_id: ID! $office_id: ID $order_type: OrderType! $order_status: OrderStatusEnum! $pagination: PaginationInput!) {
        GetServiceOrders(  owner_id: $owner_id office_id: $office_id   order_type: $order_type order_status: $order_status pagination: $pagination) {
          order_amount
          orders{
            id
            user_profile{
              id
              url
              firstname
              avatar
              lastname
              location {
                city
                country
              }
            }
            company_profile{
              id
              avatar
              url
              name  
              addresses{
                city{
                  city
                  id
                }
                country_id
              }
            }
            files{
              id
              name
              address
              mime_type
            }
            description
            price_type
            price_amount
            currency
            delivery_time
            note
            custom_date
            status
            service{
              officeID              
              id
              title
            }
          }
        }
    } `;

  public static AcceptOrderService = gql`
    mutation AcceptOrderService($company_id: ID, $service_id: ID!, $order_id: ID!) {
      AcceptOrderService(company_id: $company_id, service_id: $service_id, order_id: $order_id) {
        id
        success
      }
    }  
  `;
  public static CancelServiceOrder = gql`
    mutation CancelServiceOrder($company_id: ID, $order_id: ID!) {
      CancelServiceOrder(company_id: $company_id, order_id: $order_id) {
        id
        success
      }
    }
  `;

  public static DeclineServiceOrder = gql`
    mutation DeclineServiceOrder($company_id: ID, $order_id: ID!) {
      DeclineServiceOrder(company_id: $company_id, order_id: $order_id) {
        id
        success
      }
    }
`;

  public static deliverServiceOrder = gql`
    mutation DeliverServiceOrder( $company_id: ID $order_id: ID! ) {
      DeliverServiceOrder( company_id: $company_id order_id: $order_id ) {
        id
        success
      }
    }
`;

public static AddNoteForOrderService = gql`
  mutation AddNoteForOrderService( $order_id: ID! $company_id: ID $text: String! ) {
    AddNoteForOrderService( order_id: $order_id company_id: $company_id text: $text ) {
      id
      success
    }
  }
`;

public static AcceptDeliverdServiceOrder = gql`
  mutation AcceptDeliverdServiceOrder( $order_id: ID! $company_id: ID  ) {
    AcceptDeliverdServiceOrder( order_id: $order_id company_id: $company_id   ) {
      id
      success
    }
  }
`;

public static WriteReviewForServiceRequest = gql`
  mutation WriteReviewForServiceRequest( $owner_id: ID! $is_owner_company: Boolean! $review_detail: ReviewDetailInput!  ) {
    WriteReviewForServiceRequest( owner_id: $owner_id is_owner_company: $is_owner_company  review_detail: $review_detail  ) {
      id
      success
    }
  }
`;

public static CancelDeliverdServiceOrder = gql`
  mutation CancelDeliverdServiceOrder( $order_id: ID! $company_id: ID   ) {
    CancelDeliverdServiceOrder( order_id: $order_id company_id: $company_id   ) {
      id
      success
    }
  }
`;

public static WriteReviewForService = gql`
  mutation WriteReviewForService(   $service_id: ID! $office_id: ID! $owner_id: ID! $review_detail: ReviewDetailInput! ) {
    WriteReviewForService( service_id: $service_id office_id: $office_id owner_id: $owner_id review_detail: $review_detail  ) {
      id
      success
    }
  }
`;

public static GetServicesReview = gql`
  query GetServicesReview( $company_id: ID $office_id: ID! $pagination: PaginationInput! ) {
    GetServicesReview(  company_id: $company_id  office_id: $office_id  pagination: $pagination ) {
          review_amount
          reviews_avg{
            clarity_avg
            communication_avg
            payment_avg
          }
          reviews{
            id
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
            description
            hire
            clarity
            communication
            payment
            review_avg
            review_at
            service {
              id 
              title
            }
      }
    }
  }
`;


public static GetSavedServicesRequest = gql`
  query GetSavedServicesRequest( $company_id: ID $pagination: PaginationInput) {
    GetSavedServicesRequest(  company_id: $company_id pagination: $pagination) {
      service_amount
      services{
      id
      userID
      companyID
      description
      delivery_time
      currency
      is_Remote
      min_price_amount
      price
      fixed_price_amount
      max_price_amount
      proposal_amount
      companyID
      has_liked
      userID
      location {
        city{
          id
          city
        }
        country{
          id
          country
        }
      }
      location_type
      custom_date
      proposal_amount
      created_at
    }
  }
}`;


 public static GetSendedProposals = gql`
  query GetSendedProposals( $pagination: PaginationInput!  ) {
    GetSendedProposals(  pagination: $pagination) {
        proposal_amount
        proposals{
          id
          user_profile{
            id
            firstname
            lastname
          }
          message
          price_type
          price_amount
          currency
          delivery_time
          expertaion_time
          custom_date
          min_price
          max_price
          status
          service {
            id
            fixed_price_amount,
            min_price_amount,
            max_price_amount,
            price
            description
            title
            currency
          }
     
        }
    }
  }`;

  public static UnSaveServiceRequest = gql`
      mutation UnSaveServiceRequest( $service_id: ID! $company_id: ID ) {
        UnSaveServiceRequest(  service_id: $service_id company_id: $company_id) {
          id
          success
        }
      }
  `;

  public static SaveServiceRequest = gql`
      mutation SaveServiceRequest( $service_id: ID! $company_id: ID ){
        SaveServiceRequest( service_id: $service_id company_id: $company_id){
          id
          success
        }
      }
  `;
  
  public static SendProposalForServiceRequest = gql`
    mutation SendProposalForServiceRequest( $input: ProposalInput! ) {
      SendProposalForServiceRequest(input: $input) {
        id
        success
      }
    }`;
    
    public static GetAllServices = gql`
      query GetAllServices( $company_id: ID ){
        GetAllServices( company_id: $company_id ){
          services{
            id
            title
            officeID
          }
        }
      }`;

}


