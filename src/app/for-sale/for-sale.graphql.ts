import gql from "graphql-tag";

const FORSALERESPONSE = `
        id 
        user_profile {
            id 
            url 
            avatar 
            firstname 
            lastname 
            phone
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
        product
        condition 
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
        pick_up 
        delivery
`;

export class ForSaleGraphQl {

  public static GetSavedForSale = gql`
    query GetSavedForSale( $company_id: ID $pagination: PaginationInput!) {
      GetSavedForSale(company_id: $company_id pagination: $pagination) {
        amount_of_results
        sales {
          ${FORSALERESPONSE}
        }
      }
    }
  `;
  
  public static searchForSale = gql`
    query searchForSale($company_id: ID $input: SearchForSaleQuery! $pagination: PaginationInput!) {
      searchForSale( company_id: $company_id input: $input pagination: $pagination ){
        amount_of_results
        sales {
          ${FORSALERESPONSE}         
        }
      }
    }
  `;

  public static GetForSaleByID = gql`
    query GetForSaleByID( $company_id: ID $sale_id: ID! ) {
      GetForSaleByID(company_id: $company_id sale_id: $sale_id ) {
         ${FORSALERESPONSE}        
      }
    }
  `;

  public static AddForSale = gql`
    mutation AddForSale( $company_id: ID $input: AddForSaleInput!) {
      AddForSale( company_id: $company_id input: $input )  {
        id
      }
    }
  `;

  public static EditForSale = gql`
    mutation EditForSale($input: EditForSaleInput!) {
      EditForSale( input: $input ){
        id
      }
    }
  `;

  public static LikeForSale = gql`
    mutation LikeForSale( $company_id: ID $sale_id: ID!) {
      LikeForSale(company_id: $company_id sale_id: $sale_id) {
        success
      }
    }
  `;

  

  public static UnLikeForSale = gql`
    mutation UnLikeForSale($company_id: ID $sale_id: ID!) {
      UnLikeForSale( company_id: $company_id sale_id: $sale_id ) {
        success
      }
    }
  `;

  public static MakeForSaleUrgent = gql`
    mutation MakeForSaleUrgent( $company_id: ID $sale_id: ID!) {
      MakeForSaleUrgent( company_id: $company_id sale_id: $sale_id) {
        success
      }
    }
  `;

  public static ChangeForSaleStatus = gql`
    mutation ChangeForSaleStatus($company_id: ID $sale_id: ID! $status: AdServiceStatusEnum!) {
      ChangeForSaleStatus( company_id: $company_id sale_id: $sale_id status: $status) {
        success
      }
    }
  `;

  public static RemoveForSale = gql`
    mutation RemoveForSale($sale_id: ID! $company_id: ID) {
      RemoveForSale(sale_id: $sale_id company_id: $company_id) {
        success
      }
    }
  `;

  public static RemoveForSaleFile = gql`
    mutation RemoveForSaleFile($sale_id: ID! $company_id: ID $file_id: ID!) {
      RemoveForSaleFile(sale_id: $sale_id company_id: $company_id file_id: $file_id) {
        success
      }
    }
  `;
}
