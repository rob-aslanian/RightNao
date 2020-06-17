import { Injectable } from "@angular/core";

import gql from "graphql-tag";

export class Followers {
  public static getFollowers = gql`
    query getFollowers(
      $query: String
      $category: String
      $letter: String
      $sort_by: String
      $companies: [String!]
    ) {
      getFollowers(
        query: $query
        category: $category
        letter: $letter
        sort_by: $sort_by
        companies: $companies
      ) {
        user_profile{
          id,
          url,
          avatar,
          firstname,
          lastname,
          middlename,
          patronymic,
          nickname,
         
          birthday,
          email,
          phone,
          location{
            city 
            country
          },
        experiences(first: 20){
          id,title,company,
          start_date,finish_date,
          currently,description,
          location{
            city{
              id
              city,
            } 
            country{
              id
              country

            }
          },
          link{
            id
            address
          },
          file{
            id
            name
            address
            mime_type
          }
        },
        educations(first: 20){
      
          id, school, degree, field_study, grade, start_date, finish_date, description , currently_study,
          link{
            id
            address
          },
          file{
            id
            name
            address
            mime_type
          }
        },
        skills(first: 999){
          id,name,endorsements{ firstname, lastname,avatar },amount_endorsements
          },
          interests(first: 20){
          id,interest, description, image
          },
          languages(first: 20){
          id, image, language, rate
          },
          me,friend,follow,favorite,blocked,friend_request,recieved_friend_request,friendship_id,
          profile_complete_percent,
          accomplishments(first:999){
            id,
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


     
 }
        user {
          id
          url
          avatar
          first_name
          last_name
          gender
          primary_email
          primary_phone
          last_experience {
            company
            position
          }
        }
        followers
        following
        is_friend
      }
    }
  `;

  public static getFollowersOfUser = gql`
    query getFollowersOfUser($user_id:ID!){
      getFollowersOfUser(user_id:$user_id, pagination:{first:999}){
        amount
        profiles{
         id
         url
         avatar
         firstname
         lastname
         middlename
         patronymic
         nickname
         native_name{
           name
           language
         }
         birthday
         gender
         email
         phone
         emails
         phones
         location{
           city
           country
         }
         headline
         story
         online
         me
         friend
         follow
         favorite
         blocked
         friend_request
         recieved_friend_request
         friendship_id
         profile_complete_percent
         current_translation
         date_of_registration
         network_info{
           connections
           followings
           followers
           recommendations
           reviews
         }
         experiences(first:10){
          id
          title
          company
          location {
            city{
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
          start_date
          finish_date
          currently
          description
        }
        educations(first:10){
          id
          school
          degree
          field_study
          grade
          location{
            city{
              id
              subdivision
              country
              city
            }
            country{
              id
              country
            }
          }
          start_date
          finish_date
          currently_study
          description
          file{
            id
            name
            address
            mime_type
          }
          link{
            id
            address
          }
        }
        skills(first:10){
          id
          name
          amount_endorsements  
        }
        interests(first:10){
          id
          interest
          image
          description
        }
        languages(first:10){
          id
          image
          language
          rate
        }
        accomplishments(first:10){
          id
        }
       }
      }
    }
    `;

    public static getFollowersCompaniesOfUser = gql`
    query getFollowersCompaniesOfUser($user_id:ID!){
      getFollowersCompaniesOfUser(user_id:$user_id,pagination:{first:999}){
        amount
        profiles{
          id
          avatar
          url
          name
          description
          mission
          industry{
            id
            subindustries
          }
          foundation_date
          
          services{
            id
            image
            name
            website
          }
          addresses{
            id
            name
            zip_code
            apartment
            street_address
            city{
              id
              city
              subdivision
            }
            country_id
            phones{
              id
              country_id
              country_code
              number
              is_primary
              country_code_id
            }
            business_hours{
              id
              week_days
              hour_to
              hour_from
            }
            primary
          }
          cover
          email
          phone{
            country_code
            number
            primary
          }
          websites
          network_info{
            followings
            followers
            employees
          }
          amount_jobs
          avarage_rating
          is_about_us_set
          follow
          favorite
          online
          blocked
        }
      }
      }
    `;

   

 

  public static BlockUser = gql`
    mutation BlockUser($userId: String!) {
      BlockUser(userId: $userId)
    }
  `;

  public static Follow = gql`
    mutation Follow($userId: String!) {
      Follow(userId: $userId)
    }
  `;

  public static Unfollow = gql`
    mutation Unfollow($userId: String!) {
      Unfollow(userId: $userId)
    }
  `;
  public static Unfriend = gql`
    mutation Unfriend($userId: ID!) {
      Unfriend(userId: $userId)
    }
  `;

  public static SendFriendRequest = gql`
    mutation SendFriendRequest($userId: String!, $description: String) {
      SendFriendRequest(userId: $userId, description: $description) {
        id
      }
    }
  `;

  // for companies
  public static getFollowerCompanies = gql`
    query getFollowerCompanies(
      $query: String
      $category: String
      $letter: String
      $sort_by: String
    ) {
      getFollowerCompanies(
        query: $query
        category: $category
        letter: $letter
        sort_by: $sort_by
      ) {
        company_profile{
          name
          avatar
        }  
        company {
          id
          name
          url
          avatar
          industry
          type
          email
          address
          foundation_year
        }
        company_profile{
          avarage_rating
          industry { id }
          amount_jobs
          addresses{
            city{
              city
            }
            country_id
            primary
          }
        }
        
        following
        followers
        rating
        size
        categories
      }
    }
  `;

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
  
  public static removeFromFavourites = gql`
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
  public static blockUser = gql`
    mutation blockUser($userId: String!) {
      blockUser(userId: $userId)
    }
  `;

  public static ReportUser = gql`
    mutation ReportUser($user_id: ID!, $input: ReportUserInput!) {
      ReportUser(user_id: $user_id, input: $input){
            id
      }
    }
  `;

  public static AddCompanyReport = gql`
    mutation AddCompanyReport($company_id:ID! $input:CompanyReportInput!){
      AddCompanyReport(company_id:$company_id input:$input){
        id
        success
      }
    }
  `;

  public static BlockCompany = gql`
    mutation BlockCompany($companyId:String!){
      BlockCompany(companyId:$companyId)
    }
  `
  ;
  public static askReccomendation = gql`
    mutation WriteRecommendation($user_id:ID!,$text:String!){
      WriteRecommendation(user_id:$user_id,text:$text)
    }
  `
  ;
  public static unblockUser = gql`
    mutation UnblockUser($userId:String!){
      UnblockUser(userId:$userId)
  }
  `
   public static  saveusersearchfilter = gql`
   mutation SaveUserSearchFilter($user_filter:UserSearchFilter!){
         SaveUserSearchFilter(user_filter:$user_filter){
             success
       }
   }   
   `
 
  //  public static saveJobsSearchFiltersCompany = gql`
  //    mutation SaveJobSearchFilterForCompany($companyID:ID!,$name:String!,$jobSearchFilter: JobSearchFilterInput!){
  //     SaveJobSearchFilterForCompany(companyID:$companyID,name:$name,jobSearchFilter:$jobSearchFilter){
  //        id
  //        success
  //     }
  //    }
   
   
  //  `;
  public static  saveCompanySearchFilter = gql`
  mutation SaveCompanySearchFilter($company_filter:CompanySearchFilter!){
    SaveCompanySearchFilter(company_filter:$company_filter){
            success
      }
  }   
  `;  

   public static  saveCandidateSearchFilter = gql`
   mutation SaveCandidateSearchFilterForCompany($candidate_filter:CandidateSearchFilterForCompany!){
    SaveCandidateSearchFilterForCompany(candidate_filter:$candidate_filter){
         id,
         success
       }
   }   
   ` 
  public static saveUserSearchFiltersForCompany = gql`
      mutation SaveUserSearchFilterForCompany($user_filter:UserSearchFilterForCompany!){
        SaveUserSearchFilterForCompany(user_filter:$user_filter){
             id
             success
        }
      } 
  `
  public static saveCompanySearchFilterCompany = gql`
  mutation  SaveCompanySearchFilterForCompany($company_filter:CompanySearchFilterForCompany!){
        SaveCompanySearchFilterForCompany(company_filter:$company_filter){
         id  
         success
        }
    }
 
 `;

   public static getAalFilters = gql`
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
 
     }
   }
   `

   public static getAalFiltersForCompany = gql`
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
     }
   }
   `
   public static removefilter = gql`
    mutation  RemoveFilter($filter_id:ID!){
         RemoveFilter(filter_id:$filter_id){
             success
         }
      }
   `
   public static removeFilterForCompany = gql`
   mutation  RemoveFilterForCompany($filter_id:ID!,$companyID:ID!){
    RemoveFilterForCompany(filter_id:$filter_id,companyID:$companyID){
            success
        }
     }
  `
  public static saveJobSearchFilter = gql`
    mutation SaveJobSearchFilter($job_filter:JobSearchFilter!){
      SaveJobSearchFilter(job_filter:$job_filter){
         success
      }
    }
  `
  public static saveJobsSearchFilterCompany = gql`
    mutation SaveJobSearchFilterForCompany($job_filter:JobSearchFilterForCompany!){
      SaveJobSearchFilterForCompany(job_filter:$job_filter){
        id
        success
      }
    }
  `;

  public static followCompanyUser = gql`
     mutation FollowForCompany($companyId:String!,$userId:String!){
       FollowForCompany(companyId:$companyId,userId:$userId)
          
     }
  `;
  public static unfollowCompanyUser = gql`
    mutation UnfollowForCompany($companyId:String!,$userId:String!){
       UnfollowForCompany(companyId:$companyId,userId:$userId)

    }
  `
}