import gql from 'graphql-tag';



export class PetsGraphql {

  public static AddPetsPlants = gql`
     mutation AddPetsPlants( $company_id: ID $input: AddPetPlantsInput!) {
        AddPetsPlants( company_id: $company_id input: $input ) {
            id 
            success 
        }
     }
   `;

   public static EditPetsPlants = gql`
      mutation EditPetsPlants( $input: EditPetPlantsInput! ) {
         EditPetsPlants( input: $input  ) {
            id 
            success 
         }
   }
   `;


   public static GetPetByID = gql`
      query GetPetByID( $company_id: ID $pet_id: ID!) {
         GetPetByID( company_id: $company_id  pet_id: $pet_id) {
            id
            common{
              files{
                id
                name
                address
                mime_type
              }
               deal_type
               files {
                  id 
                  name 
                  address 
                  mime_type 
               }
               location{
                  city
                  country
               }
                category
               price{
                  fix_price
                  currency
               }
               expired_days
               post_currency
               post_status
               created_at
               is_me
               has_liked
               has_offered
               has_subscribed
               offers
            }
            info{
               detail{
               title
               description
               }
               phones{
               country_code_id
               number
               }
            }
            food{
               food_category
               food_sub_category
               animal
               animal_food
               garden_supplies
               organic
               is_organic
            }
            seed{
               seeds_category
               planting_times
            }
            animal{
               breed
               gender
               pet_service
               size
               animal_category
               age
               can_tranported
               color
               age_type
            }
            plant{
               plant_type
               light_need
               water_need
               landscape_used
               season
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
   `;
   
   public static GetPetsPlantsAlertsByID = gql`
   query GetPetsPlantsAlertsByID($pet_id: ID! $pagination: PaginationInput!){
      GetPetsPlantsAlertsByID(pet_id:$pet_id pagination:$pagination){
        amount
        alerts{
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
          created_at
        }
        
      }
    }`;
   public static GetPetsPlantsOffersByID = gql`
   query GetPetsPlantsOffersByID($pet_id: ID! $pagination: PaginationInput!){
      GetPetsPlantsOffersByID(pet_id:$pet_id pagination:$pagination){
        amount
        offers{
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
          created_at
          fix_price
          min_price
          max_price
        }
        
      }
    }`;
    public static GetSavedPetPlants = gql`
    query GetSavedPetPlants($company_id: ID $pagination: PaginationInput!){
      GetSavedPetPlants(company_id:$company_id pagination:$pagination){
        amount_of_results
        pet_plants{
          id
          info{
            detail{
              title
              description
            }
          }
          common{
            location{
              city
              country
            }
            files{
              id
              name
              address
              mime_type
            }
            price{
              min_price
              max_price
              fix_price
              currency
            }
            expired_days
            post_status
            created_at
            is_me
            is_urgent
            has_liked
            
          }
        }
      
    }
    }`;
   public static MakePetsPlantsUrgent = gql`
   mutation MakePetsPlantsUrgent($company_id:ID $pet_id: ID!){
      MakePetsPlantsUrgent(company_id:$company_id pet_id:$pet_id){
        id
        success
      }
      
    }`;
   public static MakeOfferToPetsPlants = gql`
   mutation MakeOfferToPetsPlants($company_id: ID $input: PetsOfferInput!){
      MakeOfferToPetsPlants(company_id:$company_id input:$input){
        id
        success
        
      }
    }`;
   public static SubscribeToPetsPlants = gql`
   mutation SubscribeToPetsPlants($pet_id: ID! $owner_id: ID! $company_id: ID){
      SubscribeToPetsPlants(pet_id:$pet_id owner_id:$owner_id company_id:$company_id){
        id
        success
      }
    }`;
   public static UnSubscribePetsPlants = gql`
   mutation UnSubscribePetsPlants($pet_id: ID! $company_id: ID){
      UnSubscribePetsPlants(pet_id:$pet_id company_id:$company_id ){
         id
         success
      }
    }`;
   public static RemovePetsPlants = gql`
   mutation RemovePetsPlants($pet_id: ID! $company_id: ID){
      RemovePetsPlants(pet_id:$pet_id company_id:$company_id ){
        id
        success
      }
    }`;
   public static LikePetPlant = gql`
   mutation LikePetPlant( $company_id: ID $pet_id: ID!){
      LikePetPlant( company_id:$company_id pet_id:$pet_id ){
         id
         success
      }
    }`;
   public static UnLikePetPlant = gql`
   mutation UnLikePetPlant( $company_id: ID $pet_id: ID!){
      UnLikePetPlant( company_id:$company_id pet_id:$pet_id ){
         id
         success
      }
    }`;
   public static TogglePetsPlantsAlert = gql`
   mutation TogglePetsPlantsAlert($company_id: ID $pet_id: ID! $is_active: Boolean!){
      TogglePetsPlantsAlert(company_id:$company_id pet_id:$pet_id is_active:$is_active){
        id
        success
      }
    }`;
   public static TogglePetsPlantsOffers = gql`
   mutation TogglePetsPlantsOffers($company_id: ID $pet_id: ID! $is_active: Boolean!){
      TogglePetsPlantsOffers(company_id:$company_id pet_id:$pet_id is_active:$is_active){
         id
         success
      }
    }`;
    public static ChangePetsPlantsStatus = gql`
    mutation ChangePetsPlantsStatus($company_id: ID $pet_id: ID! $status: PetsPostStatusEnum!){
      ChangePetsPlantsStatus(company_id:$company_id pet_id:$pet_id status:$status){
        id
        success
      }
    }`;
   public static getPetByType = gql`
      query GetPetByID( $company_id: ID $pet_id: ID!) {
               GetPetByID( company_id: $company_id  pet_id: $pet_id) {  
               common{
                  deal_type
                  category
               }
               food{
                  food_sub_category
               }                        
            
         }
      } 
   `;

   public static RemovePetFile = gql`
      mutation RemovePetFile( $company_id: ID $pet_id: ID! $file_id: ID!) {
         RemovePetFile( company_id: $company_id, pet_id: $pet_id, file_id: $file_id ){
            id 
            success 
         }
      }
   `;
};