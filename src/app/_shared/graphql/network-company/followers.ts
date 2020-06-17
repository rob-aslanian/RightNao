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
      story,
      url,
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


export class Followers {
    public static getFollowersForCompany = gql`
        query getFollowersForCompany($companyId: String!, $query:String,$category:String,$letter:String,$sort_by:String,$companies:[String!]){
            getFollowersForCompany(companyId: $companyId, query:$query,category:$category,letter:$letter,sort_by:$sort_by,companies:$companies){
                user{
                    id,url,avatar,first_name,last_name,gender,primary_email,primary_phone,
                    last_experience{
                        company,
                        position
                    }
                },
                user_profile{
                    ${GET_PROFILE}
                }
                followers,
                following,
                is_friend
            }
        }
    `;

    public static BlockUser = gql`
      mutation BlockUser($userId: String!){
        BlockUser(userId: $userId)
      }
  `;
  
    public static FollowForCompany = gql`
        mutation FollowForCompany($companyId: String!, $userId: String!){
            FollowForCompany(companyId: $companyId, userId: $userId)
        }
    `;

    // for companies
    public static getFollowerCompaniesForCompany = gql`
        query getFollowerCompaniesForCompany($companyId: String!, $query:String,$category:String,$letter:String,$sort_by:String){
            getFollowerCompaniesForCompany(companyId: $companyId, query:$query,category:$category,letter:$letter,sort_by:$sort_by){
                company_profile{
                  id,
                  name,
                  url,
                  avatar,
                  type,
                  email,
                  avarage_rating
                  industry { id }
                  amount_jobs
                  foundation_date
                  addresses{
                    city{
                      id
                      city,
                      subdivision
                    }
                    country_id
                    primary
                  }
                }
                following,
                followers,
                rating,
                size,
                categories
            }
        }
    `;

    public static FollowCompanyForCompany = gql`
        mutation FollowCompanyForCompany($companyId:String!,$followId: String!){
            FollowCompanyForCompany(companyId:$companyId,followId: $followId)
        }
    `;

    // Follower People for company profile 
    public static getFollowersOfCompany = gql`
    query getFollowersOfCompany($user_id:ID!){
      getFollowersOfCompany(user_id:$user_id ,pagination:{first:999}){
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
              city
              country
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
          location{
            country
            city
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
          available_translations
          date_of_registration
          network_info{
          connections
          followings
          followers
          recommendations
          reviews
          }
        }
      }
    }
    `;

    // Follower companies for company profile 
    public static getFollowersCompaniesOfCompany = gql`
    query getFollowersCompaniesOfCompany($user_id:ID!){
      getFollowersCompaniesOfCompany(user_id:$user_id,pagination:{first:999}){
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

}
