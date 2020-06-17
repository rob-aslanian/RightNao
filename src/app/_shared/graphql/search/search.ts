import gql from 'graphql-tag';


const USER_PROFILE = `
        id
        url
        avatar
        firstname
        lastname
        friend
        follow
        me
        friend_request
        experiences{
          title
          company
        }
        network_info{
          mutual_connections_amount
        }
`;

const  COMAPNY_PROFILE = `
        id
        url
        name
        avatar
        avarage_rating
        industry{ id }
        addresses{
          id   
          country_id
          city{
              city
              subdivision
          }
          primary
        }
        network_info{  followers }
        amount_jobs
        follow
        career_center{
          title
          description
          cv_button_enabled
          custom_button_enabled
          custom_button_title
          custom_button_url
        }
`;

const QUALIFICATIONS = `
    experience
    languages{
    language
    rank
    }
    tools{
    tool
    rank
    }
    skills
    license
    education
    work
`;

const JOB = `
    title
    country
    location{
        id
        city
        subdivision
        country
    }
    additional_info{
        suitable_for
        travel_requirement
    }
    additional_compensation
    job_functions
    employment_types
    descriptions{
        language
        description
        why_us
    }
    files{
        id
        name
        address
        mime_type
    }
    salary_currency
    salary_min
    salary_max
    salary_interval
    benefits
    number_of_positions
    required { ${QUALIFICATIONS} }
    preterred{ ${QUALIFICATIONS} }
    publish_day
    publish_month
    publish_year
    deadline_day
    deadline_month
    deadline_year
    hiring_day
    hiring_month
    hiring_year
    cover_letter
    header_url

`;

const GET_CANDIDATE = `
    career_interests{
      jobs
      industry
      job_types
      company_size
      experience
      salary_min
      salary_max
      salary_currency
      salary_interval
      remote
      travel
      relocate
      suitable_for
      cities{
        id
        city
        subdivision
        country
      }
      is_invited
      is_saved
    }
    user{
      id
      avatar
      url
      firstname,
      lastname,
      nickname,
      middlename,
      headline,
      birthday,
      phone,
      story,
      location{
        city
        country
      }
      email
      skills(first:999){
        name
      }
      accomplishments(first:999) {
        id
        ... on Award{
          id
          title
          issuer
          date
          description
          file{
             id
             name
             address
             mime_type

          }
        }
        ... on Certification{
          id
          name
          certification_authority
          license_number
          start_date
          finish_date
          is_expire
          url
          file{
             id
             name
             address
             mime_type 
          }
        }
        ... on License{
          id
          name
          issuer
          license_number
          start_date
          finish_date
          is_expire
          file{
            id
            name
            address
            mime_type
          }
        }
        ... on Project{
          id
          name
          url
          start_date
          finish_date
          is_expire
          description
          file{
              id
              name
              address
              mime_type

          }
        }
        ... on Publication{
          id
          title
          publisher
          date
          url
          description
          file{
              id
              name
              address
              mime_type

          }
        }
        ... on Test{
          id
          title
          date
          description
          score
          file{
              id
              name
              address
              mime_type
          }
        }
      }
      experiences(first:999){
        title
        company
        start_date
        finish_date
        currently
        description
        location{
          city{
            id
            city
            country
          }
          country{
            id
            country
          }
        }
      }
      educations(first:999){
        school
        degree
        start_date
        finish_date
        currently_study
      }
      languages(first:999){
        language
        rate
      }
      interests(first:999){
        interest 
      }
      recieved_recommendation(first:999){
        id,
        text
        is_hidden
        recommendator{
          id
            avatar
          firstname
          lastname
          skills{
            id
            name
          }
          experiences{
            company
            title
          } 
        }
      }
      
    }

`;

const REAL_ESTATE_PROPERTTIES = ` 
        id
        user_id
        company_id
        rental_info {
            deal_type
            property_type
            location {
                city
                country
                street
                address
            }
            alerts
            offers
            expired_days
            post_currency
            post_status
            created_at
            is_me
            has_liked
            has_subscribed
            has_offered
            disabled_alerts
            disabled_offers
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

const INTERIOR = `
    min_price 
    max_price 
    fix_price 
    currency 
`;

export class graphqlSearch {

    ////////////////// QUERY /////////////////
    public static searchUsers = gql`
    query searchUsers(
        $input: SearchUserQuery!
          $pagination: PaginationInput!
      ) {
        searchUsers(
          input:$input
          pagination:$pagination
          
        ){
          profiles{
            ${USER_PROFILE}
          }
          amount_of_results
        }
      }`

      public static searchCompanies =  gql`
      query searchCompanies(
        $input: SearchCompaniesQuery!
          $pagination: PaginationInput!
      ) {
        searchCompanies(
          input:$input
          pagination:$pagination
          
        ){
          company{
            ${COMAPNY_PROFILE}
          }
          amount_of_results
          __typename
        }
      }`;

      public static searchJobs = gql`
      query searchJobs(
        $input: SearchJobQuery!
          $pagination: PaginationInput!
      ) {
        searchJobs(
          input:$input
          pagination:$pagination
          
        ){
          job_search_result{
            id
            job_details { ${JOB} }
            company{ ${COMAPNY_PROFILE}  }
            is_saved
            is_applied
          }
          amount_of_results
          __typename
        }
      }`;

      public static searchCandidate = gql`
      query searchCandidate(
          $company_id: ID
          $input: SearchCandidateQuery!
          $pagination: PaginationInput!
      ) {
        searchCandidate(
          company_id:$company_id
          input:$input
          pagination:$pagination
          
        ){
            candidate_search_result{
                ${GET_CANDIDATE}
            }
          amount_of_results
        }
      }`;

      public static searchServices = gql`
      query searchServices($input: SearchServiceQuery! $pagination: PaginationInput!){
        searchServices(input:$input pagination:$pagination){ 
          service_search_result{
            id
            userID
            companyID
            officeID
            title
            description
            delivery_time
            price
            currency
            location_type
            has_liked
            location{
              city {  id ,city country }
              country{ country }
            }
            files{
              id
              name
              address
              mime_type
            }
            fixed_price_amount
            min_price_amount
            max_price_amount
            additional_details{
              qualifications{
                skills { skill }
              }
            }
          }
          amount_of_results
        }
      }`;

      public static searchServiceRequests = gql`
      query searchServiceRequests($input: SearchServiceRequestQuery! $pagination: PaginationInput!){
        searchServiceRequests(input:$input pagination:$pagination){
          service_request_search_result{
            id
            userID
            companyID
            title
            description
            currency
            proposal_amount
            created_at
            delivery_time
            location_type
            has_liked
            location{
              city {  id ,city country }
              country{ country }
            }
            files{
              id
              name
              address
              mime_type
            }
            price
            currency
            fixed_price_amount
            min_price_amount
            max_price_amount
            
          }
          amount_of_results
        }
      }`;

      public static searchRealEstate = gql`
      query searchRealEstate($company_id: ID $input: SearchRealEstateQuery! $pagination: PaginationInput!) {
          searchRealEstate(company_id:$company_id , input:$input pagination:$pagination){
            estate{
               ${REAL_ESTATE_PROPERTTIES}
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
            amount_of_results
          }
        }`;

      public static searchPetPlant = gql`
      query searchPetPlant($company_id: ID $input: SearchPetsPlantsQuery! $pagination: PaginationInput!){
        searchPetPlant(company_id: $company_id input: $input pagination:$pagination) {
          amount_of_results
          pet_plants{
            id
            user_profile{
              id
            }
            company_profile{
              id
            }
            common{
              deal_type
              location{
                city
                country
              }
              category
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
              created_at
              alerts
              offers
              is_me
              is_urgent
              is_agent
              has_liked
              has_subscribed
              has_offered
              disabled_alerts
              disabled_offers
              post_status
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
            animal{
              animal_category
              pet_service
              gender
              age
              age_type
              can_tranported
              color
              breed
              size
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
            plant{
              plant_type
              light_need
              water_need
              landscape_used
              season
              
            }
            
          }
          
        }
      }`;

      public static getAllFilters = gql`
      query getAllFilters{  
       getAllFilters{
           id
           filter_name 
           ... on UserSearchFilterFragment {
                 id
                 filter_name
                 keywords
                 isMyConnection
                 conenctionsOf
                 country
                 city_id
                 school
                 degree
                 filedOfStudy
                 isStudent
                 currentCompany
                 pastCompany
                 industry
                 position
                 firstname
                 lastname
                 nickname
                 isMale
                 isFemale
                 minAge
                 maxAge
                 skill
                 language
                 interest
                 full_name
         }
       ... on SearchJobFilterFragment{
                 id
                 filter_name
                 keywords
                 date_posted
                 experience_level
                 degree
                 country
                 job_type
                 city_id
                 language
                 industry
                 subindustry
                 company_name
                 company_size
                 currency
                 period
                 min_salary
                 max_salary
                 skill
                 is_following
                 without_cover_letter
                 with_salary
       }
       ... on SearchCompanyFilterFragment {
                 id
                 filter_name
                 keywords
                 search_for_companies
                 search_for_organizations
                 with_jobs
                 name
                 city_id
                 country
                 industry
                 subindustry
                 size
                 type
                 rating
                 business_hours
                 founders_id
                 founders_name  
       }
       ...on SearchServiceFilterFragment{
              id
              filter_name
              keywords
              delivery_time
              price
              #currency
              fixed_price_amount
              min_price_amount
              max_price_amount
              location_type
              country
              city
              skill
              is_always_open
              week_days
              hour_from
              hour_to
              services_ownwer
        }

        ...on SearchServiceRequestFilterFragment{
              id
              filter_name
              keywords
              delivery_time
              price
              #currency
              fixed_price_amount
              min_price_amount
              max_price_amount
              location_type
              country
              project_type
              city
              skill
              tool
              language
              services_ownwer
        }
    
        }
      }
      `
   
      public static getAllFiltersForCompany = gql`
      query getAllFiltersForCompany($company_id:ID!){  
       getAllFiltersForCompany(company_id:$company_id){
           id
           filter_name 
       ...on SearchCandidateFilterFragment{
             id
             filter_name
             keywords
             country
             city_id
             current_company
             past_company
             industry
             sub_industry
             experience_level
             job_type
             skill
             language
             school
             degree
             field_of_study
             is_student
             currency
             period
             min_salary
             max_salary
             is_willing_to_travel
             is_willing_to_work_remotly
             is_possible_to_relocate    
         }
         ...on UserSearchFilterFragment{
             id
             filter_name
             keywords
             isMyConnection
             conenctionsOf
             country
             city_id
             school
             degree
             filedOfStudy
             isStudent
             currentCompany
             pastCompany
             industry
             position
             firstname
             lastname
             nickname
             isMale
             isFemale
             minAge
             maxAge
             skill
             language
             interest
             full_name
         }
         ...on SearchJobFilterFragment{
             id
             filter_name
             keywords
             date_posted
             experience_level
             degree
             country
             city_id
             job_type
             language
             industry
             subindustry
             company_name
             company_size
             currency
             period
             min_salary
             max_salary
             skill
             is_following
             without_cover_letter
             with_salary
   
   
    
         }
         ...on SearchCompanyFilterFragment{
              id
              filter_name
              keywords
              search_for_companies
              search_for_organizations
              with_jobs
              name
              city_id
              country
              industry
              subindustry
              size
              type
              business_hours
              founders_id
              founders_name
   
         }

         ...on SearchServiceFilterFragment{
              id
              filter_name
              keywords
              delivery_time
              price
              currency
              fixed_price_amount
              min_price_amount
              max_price_amount
              location_type
              country
              city
              skill
              is_always_open
              week_days
              hour_from
              hour_to
              services_ownwer
         }

         ...on SearchServiceRequestFilterFragment{
              id
              filter_name
              keywords
              delivery_time
              price
              currency
              fixed_price_amount
              min_price_amount
              max_price_amount
              location_type
              country
              project_type
              city
              skill
              tool
              language
              services_ownwer
         }
        }
      }`;

      ////////////////// QUERY /////////////////


      ////////////////// MUTATION /////////////////

    public static RemoveFilter = gql`
      mutation  RemoveFilter($filter_id:ID!){
           RemoveFilter(filter_id:$filter_id){
               success
           }
        }
     `;
     public static RemoveFilterForCompany = gql`
     mutation  RemoveFilterForCompany($filter_id:ID!,$companyID:ID!){
      RemoveFilterForCompany(filter_id:$filter_id,companyID:$companyID){
              success
          }
       }
    `;

      public static SaveCandidateSearchFilter = gql`
      mutation SaveCandidateSearchFilter(
        $companyId: ID!
        $name: String!
        $filter: CandidateSearchFilterInput!
      ) {
        SaveCandidateSearchFilter(
          companyId:$companyId
          name:$name
          filter:$filter
        )
        {
          id
          success
        }
      }`;

      public static SaveUserSearchFilter = gql`
      mutation SaveUserSearchFilter(
        $user_filter: UserSearchFilter!
      ) {
        SaveUserSearchFilter(
          user_filter:$user_filter
        )
        {
          id
          success
        }
      }`;

      public static SaveCompanySearchFilter = gql`
      mutation SaveCompanySearchFilter(
        $company_filter: CompanySearchFilter!
      ) {
        SaveCompanySearchFilter(
          company_filter:$company_filter
        )
        {
          id
          success
        }
      }`;

      public static SaveJobSearchFilter = gql`
      mutation SaveJobSearchFilter(
        $job_filter: JobSearchFilter!
      ) {
        SaveJobSearchFilter(
          job_filter:$job_filter
        )
        {
          id
          success
        }
      }`;

      public static SaveServiceSearchFilter = gql`
      mutation SaveServiceSearchFilter($company_id: ID $service_filter: SearchServiceQuery!){
        SaveServiceSearchFilter(company_id:$company_id , service_filter:$service_filter){
          id
        }
      }`;


      public static SaveServiceRequestSearchFilter = gql`
      mutation SaveServiceRequestSearchFilter($company_id: ID $service_request_filter: SearchServiceRequestQuery!){
        SaveServiceRequestSearchFilter(company_id:$company_id ,service_request_filter:$service_request_filter){
          id
        }
      }`;

      public static SaveUserSearchFilterForCompany = gql`
      mutation SaveUserSearchFilterForCompany(
        $user_filter: UserSearchFilterForCompany!
      ) {
        SaveUserSearchFilterForCompany(
          user_filter:$user_filter
        )
        {
          id
          success
        }
      }`;

      public static SaveCompanySearchFilterForCompany = gql`
      mutation SaveCompanySearchFilterForCompany(
        $company_filter: CompanySearchFilterForCompany!
      ) {
        SaveCompanySearchFilterForCompany(
          company_filter:$company_filter
        )
        {
          id
          success
        }
      }`;

      public static SaveJobSearchFilterForCompany = gql`
      mutation SaveJobSearchFilterForCompany(
        $job_filter: JobSearchFilterForCompany!
      ) {
        SaveJobSearchFilterForCompany(
          job_filter:$job_filter
        )
        {
          id
          success
        }
      }`;

      public static SaveCandidateSearchFilterForCompany = gql`
      mutation SaveCandidateSearchFilterForCompany(
        $candidate_filter: CandidateSearchFilterForCompany!
      ) {
        SaveCandidateSearchFilterForCompany(
          candidate_filter:$candidate_filter
        )
        {
          id
          success
        }
      }`;


      ////////////////// MUTATION /////////////////

}