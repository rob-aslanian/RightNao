import gql from 'graphql-tag';
const response = `
id
user_profile{
  id
  url
  avatar
  firstname
  lastname
  phone
  me
}
company_profile{
  id
  avatar
  url
  name
}
location{
  city
  country
}
detail{
  title
  description
}
phones{
  country_code_id
  number
}
service
category
sub_category
files{
  id
  name
  address
  mime_type
}
price{
  price_type
  min_price
  max_price
  fix_price
  currency
}
expired_days
post_currency
post_status
created_at
is_me
is_urgent
is_agent
has_liked
`

export class  graphqlAdsServices {
    
    public static AddAdService = gql`
    mutation AddAdService($company_id: ID $input: AddAdServiceInput!){
        AddAdService(company_id:$company_id input:$input){
          id
          success
        }
    }`;

    public static EditAdService = gql`
    mutation EditAdService($input: EditAdServiceInput!){
        EditAdService(input:$input){
          id
          success
        }
    }`;

    public static GetAdServiceByID = gql`
    query GetAdServiceByID($company_id: ID $service_id: ID!){
        GetAdServiceByID(company_id: $company_id service_id: $service_id){
            ${response}
        }
      }`;
    
    public static GetAdServiceForEdit = gql`
    query GetAdServiceByID($company_id: ID $service_id: ID!){
        GetAdServiceByID(company_id: $company_id service_id: $service_id){
          location{
            city
            country
          }
          detail{
            title
            description
          }
          phones{
            country_code_id
            number
          }
          service
          sub_category
          files{
            id
            name
            address
            mime_type
          }
          price{
            price_type
            min_price
            max_price
            fix_price
            currency
          }
                      
                  }
      }`;

    public static GetSavedAdService = gql`
    query GetSavedAdService($company_id: ID $pagination: PaginationInput!){
        GetSavedAdService(company_id:$company_id pagination:$pagination){
        amount_of_results
        services{
            ${response}
        }
        }
    }`; 

    public static LikeAdService = gql`
    mutation LikeAdService( $service_id: ID!){
        LikeAdService( service_id:$service_id){
          id
          success
          
        }
    }`;

    public static UnLikeAdService = gql`
    mutation UnLikeAdService($service_id: ID!){
        UnLikeAdService( service_id:$service_id){
          id
          success
          
        }
    }`;
    public static searchAdService = gql`
    query searchAdService($company_id: ID $input: SearchAdServiceQuery! $pagination: PaginationInput!){
      searchAdService(company_id:$company_id input:$input pagination:$pagination){
        amount_of_results
        services{
          ${response}
        }
      }
    }`;

    public static MakeAdServiceUrgent = gql`
    mutation MakeAdServiceUrgent( $company_id: ID $service_id: ID!) {
      MakeAdServiceUrgent( company_id: $company_id service_id: $service_id) {
        success
      }
    }
    `;

    public static ChangeAdServiceStatus = gql`
    mutation ChangeAdServiceStatus($company_id: ID $service_id: ID! $status: AdServiceStatusEnum!){
        ChangeAdServiceStatus(company_id:$company_id service_id:$service_id status:$status){
          id
          success
          
        }
    }`;

    public static RemoveAdService = gql`
    mutation RemoveAdService($company_id: ID $service_id: ID!){
        RemoveAdService(company_id:$company_id service_id:$service_id){
          id
          success
          
        }
    }`;

    public static RemoveAdServiceFile = gql`
    mutation RemoveAdServiceFile($company_id: ID $service_id: ID! $file_id: ID!){
        RemoveAdServiceFile(company_id:$ompany_id service_id:$service_id file_id:$file_id){
          id
          success
          
        }
    }`;
 
    public static searchServices = gql`
      query searchAdService($input: SearchAdServiceQuery! $pagination: PaginationInput!){
        searchAdService( input: $input pagination: $pagination  ){
            services{
              id 
        user_profile {
            id 
            url 
            avatar 
            firstname 
            lastname 
        }
        company_profile {
            id 
            avatar 
            url 
            name 
        }
        location {
            city 
            country
        }
        detail {
            title 
            description
        }
        phones {
            country_code_id 
            number
        }
        category
        sub_category
        files {
            id 
            name 
            address 
            mime_type 
        }
        price {
            price_type
            min_price 
            max_price 
            fix_price 
            currency 
        }
        expired_days
        post_currency
        post_status
        created_at 
        is_me 
        is_urgent 
        is_agent 
        has_liked
            }
          }
        }   
    `;

  
}