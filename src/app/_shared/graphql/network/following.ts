import { Injectable } from '@angular/core';

import gql from 'graphql-tag';


export class Following {
 //native_name
 //location
 // network_ifo
 //request_reccomendation
    public static getFollowingsPeople = gql`
      query getFollowings($query: String, $category: String, $letter: String, $sort_by: String, $companies: [String!]){
        
        getFollowings(query: $query, category: $category, letter: $letter, sort_by: $sort_by, companies: $companies){

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
          location{
            city , country
          },
          phone,
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
          url 
       }
      }
    }
  `;

    public static getFollowsOfUser = gql`
    query getFollowsOfUser($user_id:ID!){
      getFollowsOfUser(user_id:$user_id, pagination:{first:999}){
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
          location{
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
          start_date
          finish_date
          currently
          description
        }
       }
      }
    }
    `;

    public static getFollowsCompaniesOfUser = gql`
    query getFollowsCompaniesOfUser($user_id:ID!){
      getFollowsCompaniesOfUser(user_id:$user_id, pagination:{first:999}){
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
      mutation BlockUser($userId: String!){
        BlockUser(userId: $userId)
      }
  `;
  

  public static Follow = gql`
  mutation Follow($userId: String!){
    Follow(userId: $userId){
      userId
      
    }
  }
`;
public static Unfollow = gql`
mutation Unfollow($userId: String!){
  Unfollow(userId: $userId)
 
}
`;
public static reportUser = gql`
mutation ReportUser($user_id: ID!,$input:ReportUserInput!){
  ReportUser(user_id: $user_id,input:$input){
    success
 

  }
 
}
`;
  // companies
  public static getFollowingCompanies = gql`
      query getFollowingCompanies($query: String, $category: String, $letter: String, $sort_by: String){
        getFollowingCompanies(query: $query, category: $category, letter: $letter, sort_by: $sort_by){
          company_profile{
            name
            avatar
          }
          company{
            id
            name
            url
            avatar
            industry
            type
            email
            address
            foundation_year,
            
          }
          company_profile{
            id
            avarage_rating
            industry { 
              id
             }
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
  
  public static GetFollowingsCategoryTree = gql`
      query GetFollowingsCategoryTree{
        GetFollowingsCategoryTree{
          name,unique_name,has_children
          children{
            name,unique_name,has_children
          }
        }
      }
  `;

  

  public static CreateFollowingsCategory = gql`
      mutation CreateFollowingsCategory($name:String!,$parent:String!){
        CreateFollowingsCategory(name:$name,parent:$parent)
      }
  `;

  public static RemoveFollowingsCategory = gql`
      mutation RemoveFollowingsCategory($name:String!,$parent:String!){
        RemoveFollowingsCategory(name:$name,parent:$parent)
      }
  `;

  public static AddToFollowingsCategory = gql`
      mutation AddToFollowingsCategory($companyId:ID!,$category_name:String!){
        AddToFollowingsCategory(companyId:$companyId,category_name:$category_name){
          unique_name,company_id
        }
      }
  `;

  public static RemoveFromFollowingsCategory = gql`
      mutation RemoveFromFollowingsCategory($companyId:ID!,$category_name:String!){
        RemoveFromFollowingsCategory(companyId:$companyId,category_name:$category_name){
          unique_name,company_id
        }
      }
  `;

  public static BatchRemoveFromFollowingsCategory = gql`
      mutation BatchRemoveFromFollowingsCategory($companyIds:[String!]!,$category_name:String!,$all:Boolean!){
        BatchRemoveFromFollowingsCategory(companyIds:$companyIds,category_name:$category_name,all:$all)
      }
  `;

  public static FollowCompany = gql`
      mutation FollowCompany($companyId:String!){
        FollowCompany(companyId:$companyId)
      }
  `;

  public static UnfollowCompany = gql`
      mutation UnfollowCompany($companyId:String!){
        UnfollowCompany(companyId:$companyId)
      }
  `;

  public static BlockCompany = gql`
    mutation BlockCompany($companyId:String!){
      BlockCompany(companyId:$companyId)
    }
  `;

  public static Unfriend = gql`
    mutation Unfriend($userId:ID!){
        Unfriend(userId:$userId)
   
    }
  `;

  public static SendFriendRequest = gql`
    mutation SendFriendRequest($userId:String!,$description:String){
        SendFriendRequest(userId:$userId,description:$description){
            id
        }
    }
  `;
  public static reportComapany = gql`
  mutation AddCompanyReport($company_id:ID!,$input:CompanyReportInput!){
     AddCompanyReport(company_id:$company_id,input:$input){
          id
      }
  }
`;
  static BatchRemoveFromFollowingsCategoryForCompany: any;
  static AddToFollowingsCategoryForCompany: any;
  static RemoveFromFollowingsCategoryForCompany: any;
  static getFollowingCompaniesForCompany: any;
  
}