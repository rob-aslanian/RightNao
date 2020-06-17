import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

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


const GET_PROFILE = `
      id,
      firstname,
      lastname,
      nickname,
      middlename,
      headline,
      avatar,
      birthday,
      email,
      phone,
      story,
      friendship_id
      location{
        city , country
      },
      experiences(first: 2){
      id,title,company,
      start_date,finish_date,
      currently,description,
      location{
        city{
          id
          city,
          country
        } , country{
          id
        }
      },
      },
      educations(first: 2){
        id, school,
         degree, field_study, grade,
         start_date, 
         finish_date,
         description , 
         currently_study,
      },
      
      skills(first: 10){
         id,
         name,
      },
      interests(first: 20){
        id,
        interest, 
        description
      },
      languages(first: 20){
        id,  
        language,
        rate
      }
      accomplishments(first:999){
        id,
        ... on Award{
          id
          title
          issuer
          date
          description
          link{
            id
            address
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
        }
        ... on License{
          id
          name
          issuer
          license_number
          start_date
          finish_date
          is_expire
        }
        ... on Project{
          id
          name
          url
          start_date
          finish_date
          is_expire
          description
        }
        ... on Publication{
          id
          title
          publisher
          date
          url
          description
        }
        ... on Test{
          id
          title
          date
          description
          score
        }
   
      }

`;

export class graphqlShared {

  public static checkToken = gql`
      query checkToken{
          checkToken
      }
    `;

  public static GetOriginAvatar = gql`
    query GetOriginAvatar{
      GetOriginAvatar
    }
  `;

  public static GetOriginCompanyAvatar = gql`
  query GetOriginCompanyAvatar($company_id: ID!) {
    GetOriginCompanyAvatar(company_id:$company_id)
  }`;
  
  public static ActivateUser = gql`
    mutation ActivateUser (
      $code: String!
      $user_id: ID!
    ) {
      ActivateUser(
        code:$code
        user_id:$user_id
      ){
        token
        avatar
        id
        url
        first_name
        last_name
      }
    } `;
  
  public static checkUsername = gql`
    query checkUsername($username:String!) {
      checkUsername(username:$username)
    }
  `;

  public static sighOut = gql`
    mutation SignOut{
      SignOut{
        id
        success
      }
    }
    `;


  public static getListOfCountryCodes = gql`
     query getListOfCountryCodes {
        getListOfCountryCodes {
            id
            country_code
            country
         }
     }
    `;

  public static getLocation = gql`
      query ident{
        identifyCountry
      }    
    `;

  public static getProfileByID = gql`
      query getProfileByID($user_id:String!) {
        getProfileByID(user_id:$user_id){
          id
          avatar
          url
          firstname
          lastname
          experiences{
            title
            company
          }
          network_info{
            connections
            followings
            followers
          }
        }
      }
    `;


  public static getProfileForCV = gql`
    query getProfileByID($user_id:String!) {
      getProfileByID(user_id:$user_id){
        ${GET_PROFILE}
      }
    }`;

 
  public static GetCompanyProfileByID = gql`
      query GetCompanyProfileByID($company_id:ID!){
        GetCompanyProfileByID(
          company_id: $company_id
        ){
          id
          url
          avatar
          name
          industry{
            id
          }
          follow
          phone {
            country_code
            number
            primary 
          }
          network_info{
            employees
            followings
            followers
          }
          addresses{
            name
            country_id
            primary
            city {
              id
              city
            }
          }
        }
      }
    
    `

  public static getListOfCities = gql`
     query getListOfCities($search_city: SearchCityInput!){
      getListOfCities(search_city: $search_city, pagination: { first: 2000 }){
        id
        city
        subdivision
        country
      }
     }
     `;

  public static getListOfUiLanguages = gql`
      query getListOfUiLanguages {  
        getListOfUiLanguages
      }
    `;

  public static SearchCompanies = gql`
      query SearchCompanies($name:[String!]){
        searchCompanies(
          input: {
            name: $name
            with_jobs: false
            search_for_companies:false
            search_for_organizations: false
          }
          pagination:{
            first: 10
          }
        ){
          company{
            id
            url
            name
          }
        }
      }
    
    `;

  public static RegisterUser = gql`
    mutation ($input: RegistrationInput!){
      Register(input:$input){
        token
        id
        url
        is_2fa_requeried
        status
      }   
    } `
  public static searchUsersDetail = gql`
      query searchUsers($full_name: String, $pagination: PaginationInput!)  {

        searchUsers(
          input:{
            full_name:$full_name
            isMyConnection: false
            isStudent: false, isMale: false, 
            isFemale: false
            
          },
          pagination: $pagination
        ){
        profiles{
          id
          url
          avatar
          firstname
          gender
          lastname
          middlename
          friend
          friend_request
          follow
          birthday
          me
          location{
          city
          country
      }

      educations(first:999){
        school 
        degree
        currently_study
        field_study
      }  

          languages(first:999){
            language   
          }

          interests(first:999){
            interest
            
          }

          skills {
          id
          name
          }

          experiences{

          title
          company
          }

         network_info{
          followings
          followers
          mutual_connections_amount        
        }

        }
        amount_of_results
      }

    }`
  public static getCities = gql`
     query getCityInfo($city_id:ID!){
      getCityInfo(city_id:$city_id){
          id
          city
          subdivision
          country
        
      }
    }
    `

  public static VoteForComingSoon = gql`
  mutation VoteForComingSoon($email: String! $type: String!){
    VoteForComingSoon(email:$email ,type:$type){
      success
    }
  }`;

  public static searchJobsById = gql`
  query getAllJobs($company_ids: [ID!]) {
      searchJobs
      (
      input:{
          company_size:size_unknown
          date_posted:anytime
          experience_level:experience_unknown
          with_salary:false,
          without_cover_letter:false
          is_following:false
          period:Any,
          company_ids:$company_ids
      }
      pagination:{
          first:999
      }
      )
      {
      job_search_result{
          id
          is_saved
          is_applied
          company{
              id
              url
              name
              avatar
              industry{
                  id
              }
              follow
              
          }
          job_details{
              title
              country
              location{
                  id
                  city
                  subdivision
                  country
              }
              job_functions
              employment_types
              files{
                  id
                  name
                  address
                  mime_type
              }
              descriptions{
                language
                description
                why_us
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
              header_url
          }
      }
      amount_of_results
      }
  }
  `;
  public static searchJobs = gql`
    query  searchJobs($input:SearchJobQuery!){
      searchJobs(
        input:$input
        pagination:{first:9}){  
          job_search_result{
            id
            is_saved
            is_applied
            company{
            id
            url
            name
            avatar
            industry{
                id
            }
            type
                
            }
            
            job_details{
              title
              country
              location{
                  id
                  city
                  subdivision
                  country
              }
              job_functions
              employment_types
              descriptions{
              language
              description
              why_us
              }
              
              salary_currency
              salary_min
              salary_max
              salary_interval
              benefits
              number_of_positions
              files{
                id
                name
                address
                mime_type
              }
              publish_day
              publish_month
              publish_year
              header_url
          }
        }
        amount_of_results
      }
    }
    `;


  public static SaveFeedback = gql`
    mutation SaveFeedback($feedback: FeedbackInput!) {
      SaveFeedback(feedback:$feedback){
        id
        success
      }
    }`;

  public static Follow = gql`
    mutation Follow($userId: String!) {
      Follow(userId: $userId)
    }`;

  public static Unfollow = gql`
    mutation Unfollow($userId: String!) {
      Unfollow(userId: $userId)
    }`;

  public static FollowForCompany = gql`
    mutation FollowForCompany($companyId:String!,$userId:String!){
      FollowForCompany(companyId:$companyId,userId:$userId)
        
    }`;



  public static UnfollowForCompany = gql`
    mutation UnfollowForCompany($companyId:String!,$userId:String!){
       UnfollowForCompany(companyId:$companyId,userId:$userId)

    }`;

  public static FollowCompanyForCompany = gql`
    mutation FollowCompanyForCompany($companyId:String!,$followId:String!){
          FollowCompanyForCompany(companyId:$companyId,followId:$followId)
    }`;

  public static UnfollowCompanyForCompany = gql`
    mutation UnfollowCompanyForCompany($companyId:String!,$followId:String!){
          UnfollowCompanyForCompany(companyId:$companyId,followId:$followId)
    }`

    public static FollowCompany = gql`
    mutation FollowCompany($companyId: String!) {
      FollowCompany(companyId: $companyId)
    }
  `;

  public static UnfollowCompany = gql`
    mutation UnfollowCompany($companyId:String!) {
      UnfollowCompany(companyId:$companyId)
        
    }
  `;

  public static AddCompanyToFavourites = gql`
    mutation AddCompanyToFavourites($companyId:String!) {
      AddCompanyToFavourites(companyId:$companyId)
        
    }
  `;

  public static RemoveCompanyFromFavourites = gql`
    mutation RemoveCompanyFromFavourites($companyId:String!) {
      RemoveCompanyFromFavourites(companyId:$companyId)
        
    }
  `;
  
  public static RemoveFromFavourites = gql`
    mutation RemoveFromFavourites($userId: String!) {
      RemoveFromFavourites(userId: $userId) {
        user_id
      }
    }
  `;

  public static AddToFavourites = gql`
    mutation AddToFavourites($userId: String!) {
      AddToFavourites(userId: $userId) {
        user_id
      }
    }
  `;

  public static UnblockUser = gql`
  mutation UnblockUser( $userId:String! ){
      UnblockUser( userId:$userId )
  }
  `;

  public static UnblockCompany = gql`
  mutation  UnblockCompany($companyId:String!){
       UnblockCompany(companyId:$companyId)
       
    }
  `;

  public static UnblockUserForCompany = gql`
    mutation UnblockUserForCompany($company_id: ID!,  $user_id: ID!){
        UnblockUserForCompany( company_id: $company_id,user_id: $user_id)
    }
    `;

    public static Unfriend = gql`
    mutation Unfriend($userId: ID!) {
      Unfriend(userId: $userId)
    }
  `;

  public static SendFriendRequest = gql`
    mutation SendFriendRequest($userId: String!, $description: String){
      SendFriendRequest(userId: $userId, description: $description){
        id,my_request,status
      }
    }
  `;
  public static registerGroup = gql`
    mutation RegisterGroup( $input: RegisterGroupRequestInput ){
      RegisterGroup( input: $input ){
        id
        success
    }
  }
  `;

  public static getSuggestedCompaniesForCompany = gql`
     query getSuggestedCompaniesForCompany( $companyId: String!, $pagination: PaginationInput!) {
         getSuggestedCompaniesForCompany( companyId: $companyId, pagination: $pagination ) {
                company_profile{
                  id
                  avatar
                  name
                  follow
                  addresses{
                      name
                      street_address
                      apartment
                      country_id
                        city{
                            id
                            city
                        }
          
                  }
                  avarage_rating
              network_info{
                    followers
                  }
                  industry{
                      subindustries
                      id
                  }
                amount_jobs
                url

              }
       
         } 
     }
  `;

  public static getCompanyProfileInfo = gql`
      query GetCompanyProfileByID( $company_id: ID! ) {
        GetCompanyProfileByID(  company_id: $company_id ) {
            id
            avatar
            name
            addresses{
              city{
                id
                city
                subdivision
              }
              country_id
            }
          url
        }
    }
  `;

  public static getUserProfileInfo = gql`
    query getProfileByID( $user_id: String! ) {
        getProfileByID( user_id: $user_id ) {
            id
            avatar
            firstname
            lastname
            phone
            location{
            city
            country
          }
          url
      }
    }`;
}