import { Injectable } from '@angular/core';

import gql from 'graphql-tag';


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
      url,
      story,
      location{
        city , country
      },
      experiences(first: 20){
      id,title,company,
      start_date,finish_date,
      currently,description,
      location{
        city{
          id
          city,
        } , country{
          id
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
      }
      me,friend,follow,favorite,blocked,friend_request,recieved_friend_request,friendship_id,
      profile_complete_percent,
      network_info{
        connections,followings,followers,recommendations,reviews
      },
      phone
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
          link{
            id
            address
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
          link{
            id
            address
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
          link{
            id
            address
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
          link{
            id
            address
          }
        }
   
       
      }

`;

export class Following {

    public static getFollowingsPeople = gql`
      query getFollowingsForCompany($companyId: String!,$query: String, $category: String, $letter: String, $sort_by: String, $companies: [String!]){
        getFollowingsForCompany(companyId: $companyId, query: $query, category: $category, letter: $letter, sort_by: $sort_by, companies: $companies){
        followers,
        following,
        user{
          id,url,avatar,first_name,last_name,gender,primary_email,primary_phone,
          last_experience{
            company,position
          }
        },
        user_profile{
          ${GET_PROFILE}
        }
        is_friend
    
        }
      }
    `;

    // Get Following Companies for company 
    public static getFollowsCompaniesOfCompany = gql`
    query getFollowsCompaniesOfCompany($user_id:ID!){
      getFollowsCompaniesOfCompany(user_id:$user_id, pagination:{first:999}){
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
          products{
            id
            image
            name
            website
          }
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
            }
            
          }
          cover
          email
          phone{
            country_code
            number
            primary
          }
          websites
          my_role
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

    // Get Following People  for company 
    public static getFollowsOfCompany = gql`
    query getFollowsOfCompany($user_id:ID!){
      getFollowsOfCompany(user_id:$user_id, pagination:{first:999}){
        amount
        profiles{
          id
          url
          avatar
          firstname
          lastname
          middlename
          patronymic
          follow
          nickname
          birthday
          email
          phone
          emails
          phones
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
          location{
            city
            country
          }
          headline
          story
        experiences(first:10){
          id
        title
        company
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
        currently
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
    }
        
      }
    }
    `;


  public static BlockUser = gql`
      mutation BlockUser($userId: String!){
        BlockUser(userId: $userId)
      }
  `;
  
  public static Unfollow = gql`
      mutation UnfollowForCompany($companyId: String!, $userId: String!){
        UnfollowForCompany(companyId: $companyId, userId: $userId)
      }
  `;

  // companies

  public static getFollowingCompaniesForCompany = gql`
      query getFollowingCompaniesForCompany($companyId: String!, $query: String, $category: String, $letter: String, $sort_by: String){
        getFollowingCompaniesForCompany(companyId: $companyId, query: $query, category: $category, letter: $letter, sort_by: $sort_by){
          company_profile{
            id
            name
            url
            avatar
            type
            email
            follow
            favorite
            blocked
            foundation_date
            avarage_rating
            industry { id }
            amount_jobs
            addresses{
              city{
                id
                city
                subdivision
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
  
  public static GetFollowingsCategoryTreeForCompany = gql`
      query GetFollowingsCategoryTreeForCompany($companyId:ID!){
        GetFollowingsCategoryTreeForCompany(companyId:$companyId){
          name,unique_name,has_children
          children{
            name,unique_name,has_children
          }
        }
      }
  `;

  public static CreateFollowingsCategoryForCompany = gql`
      mutation CreateFollowingsCategoryForCompany($companyId: ID!,$name:String!,$parent:String!){
        CreateFollowingsCategoryForCompany(companyId: $companyId,name:$name,parent:$parent)
      }
  `;

  public static RemoveFollowingsCategoryForCompany = gql`
      mutation RemoveFollowingsCategoryForCompany($companyId: ID!,$name:String!,$parent:String!){
        RemoveFollowingsCategoryForCompany(companyId: $companyId,name:$name,parent:$parent)
      }
  `;

  public static AddToFollowingsCategoryForCompany = gql`
      mutation AddToFollowingsCategoryForCompany($companyId: ID!,$refCompanyId:ID!,$category_name:String!){
        AddToFollowingsCategoryForCompany(companyId: $companyId,refCompanyId:$refCompanyId,category_name:$category_name){
          unique_name,company_id
        }
      }
  `;

  public static RemoveFromFollowingsCategoryForCompany = gql`
      mutation RemoveFromFollowingsCategoryForCompany($companyId:ID!,$refCompanyId:ID!,$category_name:String!){
        RemoveFromFollowingsCategoryForCompany(companyId:$companyId,refCompanyId:$refCompanyId,category_name:$category_name){
          unique_name,company_id
        }
      }
  `;

  public static BatchRemoveFromFollowingsCategoryForCompany = gql`
      mutation BatchRemoveFromFollowingsCategoryForCompany($companyId:ID!,$companyIds:[String!]!,$category_name:String!,$all:Boolean!){
        BatchRemoveFromFollowingsCategoryForCompany(companyId:$companyId,companyIds:$companyIds,category_name:$category_name,all:$all)
      }
  `;

  public static FollowCompanyForCompany = gql`
      mutation FollowCompanyForCompany($companyId:String!,$followId: String!){
        FollowCompanyForCompany(companyId:$companyId,followId: $followId)
      }
  `;

  public static UnfollowCompanyForCompany = gql`
      mutation UnfollowCompanyForCompany($companyId:String!,$followId: String!){
        UnfollowCompanyForCompany(companyId:$companyId,followId: $followId)
      }
  `;

  public static BlockCompany = gql`
    mutation BlockCompany($companyId:String!){
      BlockCompany(companyId:$companyId)
    }
  `;
  public static followCompanyInCompany = gql`
     mutation FollowCompanyForCompany($companyId:String!,$followId:String!){
           FollowCompanyForCompany(companyId:$companyId,followId:$followId)
     }
  
  `
  public static unfollowCompanyInCompany = gql`
  mutation UnfollowCompanyForCompany($companyId:String!,$followId:String!){
       UnfollowCompanyForCompany(companyId:$companyId,followId:$followId)
  }`
}