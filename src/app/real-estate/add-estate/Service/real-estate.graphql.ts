import gql from 'graphql-tag';


const PROPERTIES = ` 
        id
        user_id
        company_id
        rental_info {
            deal_type
            property_type
            alerts 
            offers 
            is_me 
            has_liked 
            has_subscribed 
            has_offered 
            disabled_alerts 
            disabled_offers 
            post_status
            location {
                city
                country
                street
                address
            }
            expired_days
            post_currency
            created_at
            is_me
            has_liked
        }
        files {
            id
            name
            address
            mime_type 
        }  
        has_repossessed
        alerts
        offers
        likes
        has_repossessed
        rental_details {
            title 
            house_rules 
            description  
        }
`;


  const PRICE = `
        price {
            price_type
            min_price
            max_price
            fix_price
            currency
        }
  `;

  const INTERIOR = `
        min_price 
        max_price 
        fix_price 
        currency `;

  
 


export default class RealEstateGraphql{

    public static addRealEstate = gql`
        mutation addRealEstate( $input: AddRealEstateInput! ) {
            AddRealEstate( input: $input ) {
            id
            success
           }
        }
    `;

    public static GetRealEstates = gql`
        query GetRealEstates($deal_type: DealTypeEnum! $pagination: PaginationInput! $property_type: PropertyTypeEnum! ) {
            GetRealEstates(  deal_type: $deal_type  pagination: $pagination property_type: $property_type ){
                amount
                estates {
                ... on Appartment {
                      ${PROPERTIES}
                      ${PRICE}
                      metrict_type
                        phones {
                            country_code_id
                            number
                        }  
                        badrooms
                        bathrooms
                        total_area
                        floor
                        floors 
                        car_spaces 
                        status
                        outdoor_features 
                        indoor_features 
                        climat_control 
                        who_live 
                        is_agent 
                        is_urgent 
                        availability_from 
                        availability_to 
                     }
                
                ... on CommericalProperties {
                    ${PROPERTIES} 
                    phones {
                        country_code_id
                        number
                    }     
                    alerts
                    offers
                    likes
                    metrict_type
                    ${PRICE}                    
                    status
                    total_area
                    is_agent
                    is_urgent
                    commercial_properties
                    commercial_locations
                    additional_filters
                    availability_from
                    availability_to     
                }
                
                ... on Office {
                    ${PROPERTIES}  
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    }    
                    ${PRICE}
                    status 
                    total_area 
                    is_agent 
                    is_urgent 
                    layout 
                    building_use 
                    availability_from 
                    availability_to                

                }
                ... on StorageRoom {
                    ${PROPERTIES}                   
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    }  
                    ${PRICE}
                    status 
                    total_area 
                    is_agent 
                    is_urgent 
                    availability_from 
                    availability_to 
                  }

                ... on RealEstateBuild {  
                     ${PROPERTIES}
                     metrict_type 
                     is_agent 
                     is_urgent 
                     phones {
                        country_code_id
                        number
                     } 
                     ${PRICE}
                     timing 
                     availability_from
                     availability_to

                }

                ... on RealEstateBuilding {
                    ${PROPERTIES}
                    metrict_type
                    is_agent
                    is_urgent
                    phones {
                        country_code_id
                        number
                    } 
                    ${PRICE}
                    total_area
                    status
                    availability_from
                    availability_to

                }

                ... on RealEstateGarage {
                    ${PROPERTIES}
                    metrict_type 
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    }
                    ${PRICE} 
                    total_area 
                    additional_filters 
                    status 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateHotelRooms {
                    ${PROPERTIES}
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    }
                    ${PRICE} 
                    status 
                    rooms 
                    total_area 
                    floor 
                    floors 
                    is_agent 
                    is_urgent 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateLand {
                    ${PROPERTIES}
                    metrict_type 
                    is_agent 
                    is_urgent 
                    additional_filters 
                    phones {
                        country_code_id
                        number
                    } 
                    ${PRICE}
                    total_area 
                    types_of_land 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateMaterials {
                    ${PROPERTIES}
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    }
                    materials 
                }

                ... on RealEstateMove {
                    ${PROPERTIES}
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    }
                    location_type 
                    country_ids 
                    city_ids 
                    services 
                }

                ... on RealEstateRenovate {
                    ${PROPERTIES}
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    } 
                    extetior {
                        price_type 
                        min_price 
                        max_price 
                        fix_price 
                        currency 
                    }
                    interior {
                        price_type 
                        min_price 
                        max_price 
                        fix_price 
                        currency 
                    }
                    extetior_interior {
                        price_type 
                        min_price 
                        max_price 
                        fix_price 
                        currency 
                    }
                    timing 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateRuralFarm {
                    ${PROPERTIES}
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    } 
                    ${PRICE} 
                    status 
                    total_area 
                    is_agent 
                    is_urgent 
                    properties 
                    additional
                    availability_from 
                    availability_to 
                  }
                }
            }
        }
    `;


        public static GetRealEstatesByProfileID = gql`

          query GetRealEstatesByProfileID( $profile_id: ID
                                           $is_company: Boolean!
                                           $status: RentalPostStatusEnum!
                                           $deal_type: DealTypeEnum!
                                           $property_type: PropertyTypeEnum!
                                           $pagination: PaginationInput! ) {
            GetRealEstatesByProfileID(     profile_id: $profile_id
                                           is_company: $is_company
                                           status:     $status
                                           deal_type:  $deal_type
                                           property_type: $property_type
                                           pagination: $pagination
                                    ){
                amount
                estates {
                ... on Appartment {
                    ${PROPERTIES}
                    ${PRICE}
                    metrict_type
                        phones {
                            country_code_id
                            number
                        }  
                        badrooms
                        bathrooms
                        total_area
                        floor
                        floors 
                        car_spaces 
                        status
                        outdoor_features 
                        indoor_features 
                        climat_control 
                        who_live 
                        is_agent 
                        is_urgent 
                        availability_from 
                        availability_to 
                    }
                
                ... on CommericalProperties {
                    ${PROPERTIES} 
                    phones {
                        country_code_id
                        number
                    }     
                    alerts
                    offers
                    likes
                    metrict_type
                    ${PRICE}                    
                    status
                    total_area
                    is_agent
                    is_urgent
                    commercial_properties
                    commercial_locations
                    additional_filters
                    availability_from
                    availability_to     

                }
                
                ... on Office {
                    ${PROPERTIES}  
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    }    
                    ${PRICE}
                    status 
                    total_area 
                    is_agent 
                    is_urgent 
                    layout 
                    building_use 
                    availability_from 
                    availability_to                

                }
                ... on StorageRoom {
                    ${PROPERTIES}                   
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    }  
                    ${PRICE}
                    status 
                    total_area 
                    is_agent 
                    is_urgent 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateBuild {  
                    ${PROPERTIES}
                    metrict_type 
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    } 
                    ${PRICE}
                    timing 
                    availability_from
                    availability_to

                }

                ... on RealEstateBuilding {
                    ${PROPERTIES}
                    metrict_type
                    is_agent
                    is_urgent
                    phones {
                        country_code_id
                        number
                    } 
                    ${PRICE}
                    total_area 
                    status
                    availability_from
                    availability_to

                }

                ... on RealEstateGarage {
                    ${PROPERTIES}
                    metrict_type 
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    }
                    ${PRICE} 
                    total_area 
                    additional_filters 
                    status 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateHotelRooms {
                    ${PROPERTIES}
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    }
                    ${PRICE} 
                    status 
                    rooms 
                    total_area 
                    floor 
                    floors 
                    is_agent 
                    is_urgent 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateLand {
                    ${PROPERTIES}
                    metrict_type 
                    is_agent 
                    is_urgent 
                    additional_filters 
                    phones {
                        country_code_id
                        number
                    } 
                    ${PRICE}
                    total_area 
                    types_of_land 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateMaterials {
                    ${PROPERTIES}
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    }
                    materials 
                }

                ... on RealEstateMove {
                    ${PROPERTIES}
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    }
                    location_type 
                    country_ids 
                    city_ids 
                    services 
                }

                ... on RealEstateRenovate {
                    ${PROPERTIES}
                    is_agent 
                    is_urgent 
                    phones {
                        country_code_id
                        number
                    } 
                    extetior {
                        price_type 
                        min_price 
                        max_price 
                        fix_price 
                        currency 
                    }
                    interior {
                        price_type 
                        min_price 
                        max_price 
                        fix_price 
                        currency 
                    }
                    extetior_interior {
                        price_type 
                        min_price 
                        max_price 
                        fix_price 
                        currency 
                    }
                    timing 
                    availability_from 
                    availability_to 
                }

                ... on RealEstateRuralFarm {
                    ${PROPERTIES}
                    metrict_type 
                    phones {
                        country_code_id
                        number
                    } 
                    ${PRICE} 
                    status 
                    total_area 
                    is_agent 
                    is_urgent 
                    properties 
                    additional
                    availability_from 
                    availability_to 
                }
                }
            }
        }
        `;

  public static getRealEstateById = gql`
       query GetRealEstateByID( $company_id: ID $estate_id: ID!) {
            GetRealEstateByID(  company_id: $company_id  estate_id: $estate_id ) {
                ${PROPERTIES}
                is_urgent 
                phones  {
                    country_code_id 
                    number 
                }
                price {
                    price_type 
                    min_price 
                    max_price 
                    fix_price 
                    currency 
                }
                who_live 
                status 
                badrooms 
                bathrooms 
                total_area 
                floor 
                floors 
                car_spaces 
                rooms 
                property_types 
                type_of_land 
                outdoor_features 
                indoor_features 
                climat_control 
                commercial_properties 
                commercial_locations 
                additional_filters 
                type_of_property 
                location_type 
                country_ids 
                city_ids 
                services 
                materials 
                layout 
                building_use 
                availability_from 
                availability_to 
                purchase  {
                    ${INTERIOR}                    
                }
                exterior  {
                    price_type
                    ${INTERIOR}
                }
                interior { 
                    price_type
                    ${INTERIOR}
                }
                interior_and_exterior  {
                    price_type
                    ${INTERIOR}
                }
                city_ids
                country_ids
                timing 
                is_agent 
                metrict_type 
            }
       }`; 





  public static removeEstate = gql`
      mutation RemoveRealEstate( $company_id: ID $estate_id: ID!) {
           RemoveRealEstate( company_id: $company_id estate_id: $estate_id ) {
            id
            success
           }
      }
  
  `;

  public static likeRealEstate = gql`
    mutation LikeRealEstate($company_id: ID $estate_id: ID!) {
        LikeRealEstate( company_id: $company_id estate_id: $estate_id ) {
            id
            success
        }
   }`;

    public static UnLikeRealEstate = gql`
        mutation UnLikeRealEstate($company_id: ID $estate_id: ID!) {
            UnLikeRealEstate( company_id: $company_id estate_id: $estate_id ) {
                id
                success
            }
    }`;

    public static changeRentalStatus = gql`
       mutation ChangeRealEstateStatus( $company_id: ID $estate_id: ID! $status: RentalPostStatusEnum!) {
            ChangeRealEstateStatus( company_id: $company_id estate_id: $estate_id status: $status   ) {
                id 
                success
            }
       }
    `;
    
    public static MakeOfferToRealEstate = gql`
        mutation MakeOfferToRealEstate( $company_id: ID $input: RealEstateOfferInput!) {
            MakeOfferToRealEstate( company_id: $company_id input: $input   ) {
                id 
                success
            }
        }
 `;
  
   public static SubscribeToRealEstate = gql`
       mutation  SubscribeToRealEstate( $estate_id: ID! $owner_id: ID! $company_id: ID ) {
           SubscribeToRealEstate( estate_id: $estate_id owner_id: $owner_id  company_id: $company_id   ) {
            id
            success  
           }
       }
   `;

    public static UnSubscribeRealEstate = gql`
        mutation  UnSubscribeRealEstate( $estate_id: ID!  $company_id: ID ) {
            UnSubscribeRealEstate( estate_id: $estate_id   company_id: $company_id   ) {
                id
                success  
            }
    }
`;

public static getRealEstateSlides = gql`

query GetRealEstatesByProfileID( $profile_id: ID
                                           $is_company: Boolean!
                                           $status: RentalPostStatusEnum!
                                           $deal_type: DealTypeEnum!
                                           $property_type: PropertyTypeEnum!
                                           $pagination: PaginationInput! ) {
            GetRealEstatesByProfileID(     profile_id: $profile_id
                                           is_company: $is_company
                                           status:     $status
                                           deal_type:  $deal_type
                                           property_type: $property_type
                                           pagination: $pagination
                                    ){
                amount
                estates {
                ... on Appartment {
                    ${PROPERTIES}
                    ${PRICE}
                    }
                
                ... on CommericalProperties {
                    ${PROPERTIES}    
                    ${PRICE}
                }
                
                ... on Office {
                    ${PRICE}
                    ${PROPERTIES}            

                }
                ... on StorageRoom {
                    ${PRICE}
                    ${PROPERTIES}                   
                }

                ... on RealEstateBuild {  
                    ${PRICE}
                    ${PROPERTIES}
                }

                ... on RealEstateBuilding {
                        ${PRICE}
                        ${PROPERTIES}
                }

                ... on RealEstateGarage {
                        ${PRICE}
                        ${PROPERTIES}
                }

                ... on RealEstateHotelRooms {
                        ${PROPERTIES}
                        ${PRICE}
                }

                ... on RealEstateLand {
                        ${PRICE}
                        ${PROPERTIES}
                }

                ... on RealEstateMaterials {
                       ${PROPERTIES}
                }

                ... on RealEstateMove {
                        ${PROPERTIES}
                }

                ... on RealEstateRenovate {
                        ${PROPERTIES}
                }

                ... on RealEstateRuralFarm {
                        ${PRICE}
                        ${PROPERTIES}
                    }
                }
            }
        }
`;

public static MakeRealEstateUrgent = gql`
    mutation MakeRealEstateUrgent( $estate_id: ID!, $company_id: ID ) {
        MakeRealEstateUrgent(estate_id: $estate_id, company_id: $company_id ){
            success
        }
}`;

public static GetSavedRealEstates = gql`
query GetSavedRealEstates( $company_id: ID $pagination: PaginationInput!  ) {
     GetSavedRealEstates(  company_id: $company_id pagination: $pagination ){
      amount
      estates {
      ... on Appartment {
          ${PROPERTIES}
          ${PRICE}
          metrict_type
              phones {
                  country_code_id
                  number
              }  
              badrooms
              bathrooms
              total_area
              floor
              floors 
              car_spaces 
              status
              outdoor_features 
              indoor_features 
              climat_control 
              who_live 
              is_agent 
              is_urgent 
              availability_from 
              availability_to 
          }
      
      ... on CommericalProperties {
          ${PROPERTIES} 
          phones {
              country_code_id
              number
          }     
          alerts
          offers
          likes
          metrict_type
          ${PRICE}                    
          status
          total_area
          is_agent
          is_urgent
          commercial_properties
          commercial_locations
          additional_filters
          availability_from
          availability_to     

      }
      
      ... on Office {
          ${PROPERTIES}  
          metrict_type 
          phones {
              country_code_id
              number
          }    
          ${PRICE}
          status 
          total_area 
          is_agent 
          is_urgent 
          layout 
          building_use 
          availability_from 
          availability_to                

      }
      ... on StorageRoom {
          ${PROPERTIES}                   
          metrict_type 
          phones {
              country_code_id
              number
          }  
          ${PRICE}
          status 
          total_area 
          is_agent 
          is_urgent 
          availability_from 
          availability_to 
      }

      ... on RealEstateBuild {  
          ${PROPERTIES}
          metrict_type 
          is_agent 
          is_urgent 
          phones {
              country_code_id
              number
          } 
          ${PRICE}
          timing 
          availability_from
          availability_to

      }

      ... on RealEstateBuilding {
          ${PROPERTIES}
          metrict_type
          is_agent
          is_urgent
          phones {
              country_code_id
              number
          } 
          ${PRICE}
          total_area
          status
          availability_from
          availability_to

      }

      ... on RealEstateGarage {
          ${PROPERTIES}
          metrict_type 
          is_agent 
          is_urgent 
          phones {
              country_code_id
              number
          }
          ${PRICE} 
          total_area 
          additional_filters 
          status 
          availability_from 
          availability_to 
      }

      ... on RealEstateHotelRooms {
          ${PROPERTIES}
          metrict_type 
          phones {
              country_code_id
              number
          }
          ${PRICE} 
          status 
          rooms 
          total_area 
          floor 
          floors 
          is_agent 
          is_urgent 
          availability_from 
          availability_to 
      }

      ... on RealEstateLand {
          ${PROPERTIES}
          metrict_type 
          is_agent 
          is_urgent 
          additional_filters 
          phones {
              country_code_id
              number
          } 
          ${PRICE}
          total_area 
          types_of_land 
          availability_from 
          availability_to 
      }

      ... on RealEstateMaterials {
          ${PROPERTIES}
          is_agent 
          is_urgent 
          phones {
              country_code_id
              number
          }
          materials 
      }

      ... on RealEstateMove {
          ${PROPERTIES}
          is_agent 
          is_urgent 
          phones {
              country_code_id
              number
          }
          location_type 
          country_ids 
          city_ids 
          services 
      }

      ... on RealEstateRenovate {
          ${PROPERTIES}
          is_agent 
          is_urgent 
          phones {
              country_code_id
              number
          } 
          extetior {
              price_type 
              min_price 
              max_price 
              fix_price 
              currency 
          }
          interior {
              price_type 
              min_price 
              max_price 
              fix_price 
              currency 
          }
          extetior_interior {
              price_type 
              min_price 
              max_price 
              fix_price 
              currency 
          }
          timing 
          availability_from 
          availability_to 
      }

      ... on RealEstateRuralFarm {
          ${PROPERTIES}
          metrict_type 
          phones {
              country_code_id
              number
          } 
          ${PRICE} 
          status 
          total_area 
          is_agent 
          is_urgent 
          properties 
          additional
          availability_from 
          availability_to 
      }
    }
  }
}`;

public static GetRealEstateAlertsByID = gql`
    query GetRealEstateAlertsByID( $estate_id: ID! $pagination: PaginationInput!) {
        GetRealEstateAlertsByID( estate_id: $estate_id pagination: $pagination ) {
            amount
            alerts {
            user_profile {
                id
                firstname
                lastname
                avatar
                url
            }
            company_profile {
                id
                avatar
                url
                name
            }
            created_at
            }
        }
}`;

public static GetRealEstateOffersByID = gql`
    query GetRealEstateOffersByID( $estate_id: ID! $pagination: PaginationInput!) {
        GetRealEstateOffersByID( estate_id: $estate_id pagination: $pagination ) {
            amount
            offers {
            user_profile {
                id
                firstname
                lastname
                avatar
                url
            }
            company_profile {
                id
                avatar
                url
                name
            }
                created_at
                max_price
                min_price
                fix_price
            }
        }
}`;

public static ToggleRealEstateOffers = gql`
    mutation ToggleRealEstateOffers( $company_id: ID $estate_id: ID! $is_active: Boolean!   ) {
        ToggleRealEstateOffers( company_id: $company_id estate_id: $estate_id is_active: $is_active ) {
            id
            success
    }
}`;

public static ToggleRealEstateAlert = gql`
     mutation ToggleRealEstateAlert( $company_id: ID $estate_id: ID! $is_active: Boolean!) {
        ToggleRealEstateAlert( company_id: $company_id estate_id: $estate_id is_active: $is_active ) {
            id
            success
    }
}`;
};



