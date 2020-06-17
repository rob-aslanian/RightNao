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
        connections,
        followings,
        followers,recommendations,
        reviews,
        mutual_connections_amount
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

const COMPANY_PROFILE = `
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
`;

export class NetworCompany{
   
 
    public static GetInvitationForCompany = gql`
    query  GetInvitationForCompany($company_id: ID!){
        GetInvitationForCompany(company_id:$company_id){
                    amount
                    invitations{
                        name
                        email
                    }
                }
            }
        `;
    
    public static GetNetworkImportInfo = gql`
    query GetCompanyProfile($url: String!){
        GetCompanyProfile(url:$url){
            id
            name
            network_info{
                followings
                followers
            }
        }
    }         
    `;

    public static SentEmailInvitation = gql`
    mutation SentEmailInvitation($email:String! $name:String! $company_id: ID){
        SentEmailInvitation(email:$email name:$name company_id:$company_id){
           id
          success
        }
      }
    `;

    public static getBlockedUsersOrCompanies = gql`
    query getBlockedUsersOrCompanies{
        getBlockedUsersOrCompanies{
            id
            name
            avatar
            is_company
        }
    }
   `;

    public static UnblockUser = gql`
    mutation UnblockUser( $userId:String! ){
        UnblockUser( userId:$userId )
    }
    `;

    public static UnblockCompany = gql`
    mutation UnblockCompany( $companyId:String! ){
        UnblockCompany( companyId:$companyId )
     }
    `;

    public static FollowForCompany = gql`
    mutation FollowForCompany($companyId: String!, $userId: String!){
        FollowForCompany(companyId: $companyId, userId: $userId)
    }`;

    public static FollowCompanyForCompany = gql`
    mutation FollowCompanyForCompany($companyId:String!, $followId: String!){
        FollowCompanyForCompany(companyId:$companyId, followId: $followId)
    }
   `;

    public static getFriendSuggestions = gql`
    query getFriendSuggestions{
        getFriendSuggestions{
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
            following,followers
        }
    }
    `;

    public static getSuggestedCompaniesForCompany = gql`
        query getSuggestedCompaniesForCompany($companyId: String!){
            getSuggestedCompaniesForCompany(companyId: $companyId){
                company_profile{
                    ${COMPANY_PROFILE}
                },
                followers
            }
        }
    `;
    
 }