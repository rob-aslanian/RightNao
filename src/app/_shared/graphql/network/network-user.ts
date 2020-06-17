import gql from 'graphql-tag';
 


const GET_PROFILE = `
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
phones
friendship_id
location{
    city,
    country
}
headline,
story,
experiences(first: 20){
    id,title,company,
    start_date,finish_date,
    currently,description,
    location{
      country{
        id
        country
      }

      city{
        id
        city,
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
      network_info{
        connections
        followings
        followers     

      }     
      url
     
`
const getCompanyProfile = `

      id
      avatar
      url
      name
      industry{
        id
        subindustries
      }
      foundation_date
      email
      phone{
        number
        country_code
      }
      network_info{
        followers
        followings
        
      }
      addresses{
        city{
          city
          id
        }
        primary
        country_id
       }
      amount_jobs
      avarage_rating
      follow
      favorite

`

export class  NetworUser{
   
 
public static getInvitations = gql`

  query  GetInvitation{
            GetInvitation{
                amount
                invitations{
                    name
                    email
                }
            }
        }
    `;

public static getUserInfo = gql`
   
  query getProfileByID($user_id:String!){
          getProfileByID(user_id:$user_id){
            id
            network_info{
                connections
                followings
                followers     

              }
           }  
        }
   `;  

public static SentEmailInvitationUser = gql`

 mutation SentEmailInvitation($email:String!,$name:String!){
             SentEmailInvitation(email:$email,name:$name){ 
                   id
                   success

             }
          } 
   `;  

 public static CreateConversationUser = gql`
   
      mutation CreateConversation($name:String!,$avatar:String!,$participants:[ParticipantInput!]!){  
                  CreateConversation(name:$name,avatar:$avatar,participants:$participants){
                        id

                  }
            }
   `;

   public static getCategoryTree = gql`

        query GetCategoryTree{
            GetCategoryTree{
                name
                unique_name
                has_children
                children{
                    name
                    unique_name
                    has_children
                }
            }
        }
 `;


  public static getFriendships = gql`
    query getFriendships($query: String,$category: String,$letter: String,$sort_by: String,$companies:[String!]){
              getFriendships(query:$query,category:$category,letter:$letter,sort_by:$sort_by,companies:$companies){
              id
              my_request
              status
              categories
              following
              friend_profile{
                ${GET_PROFILE}
              }

              }
              
          }
      `;

     
  public static getConnectionInfo = gql`
    query getFriendships{
              getFriendships{
              id
              my_request
              status
              categories
              following
              }
              
          }
      `;



      public static getFriendshipsForInfoBox = gql`
        query getFriendships($query: String,$category: String,$letter: String,$sort_by: String,$companies:[String!]){
            getFriendships(query:$query,category:$category,letter:$letter,sort_by:$sort_by,companies:$companies){
                status
                my_request
                created_at
                responded_at
                id
            }
        }
    `;

      public static createCategories = gql`

            mutation CreateCategory($name: String!,$parent: String!){
                CreateCategory(name:$name,parent:$parent)
            }
      `;

      public static RemoveCategory = gql`
      
          mutation RemoveCategory($name: String!,$parent: String!){
                RemoveCategory(name: $name,parent: $parent)
            }
       `;
  
    public static BatchRemoveFromCategory = gql`
      mutation BatchRemoveFromCategory($userIds:[String!]!,$category_name:String!,$all:Boolean!){
          BatchRemoveFromCategory(userIds:$userIds,category_name:$category_name,all:$all)
      }`;
      
    public static Unfriend = gql`
    mutation Unfriend($userId:ID!){
        Unfriend(userId:$userId)
        
    }
    `;

    public static getFriendSuggestions = gql`
        query getFriendSuggestions($pagination: PaginationInput!){
            getFriendSuggestions(pagination: $pagination){
                  user_profile{
                    id
                    avatar
                    firstname
                    lastname
                    follow
                      experiences(first:5){
                        company
                        title
                      }
                        network_info{
                            mutual_connections_amount
                        }
                    url
                  }
            }
        }
    `;

    public static getMutualConnectionsOfUser = gql`
    query getMutualConnectionsOfUser($user_id:ID!){
      getMutualConnectionsOfUser(user_id:$user_id pagination:{first:999}){
        amount
      }
    }`;

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
          experiences(first: 20){
              id,
              title,
              company,
           }        
              friend,
              follow,
              favorite,
              blocked,
              friend_request,
              network_info{
                connections        
                mutual_connections_amount
          }  
           
        }
      }
    }
  `;

    public static getSuggestedCompanies = gql`
        query getSuggestedCompanies($pagination: PaginationInput!){
            getSuggestedCompanies(  pagination:  $pagination){

                company_profile{
                    id
                    avatar
                     name
                     follow
                     addresses{
                        id
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
    public static FollowCompany = gql`
          mutation FollowCompany($companyId:String!){
              FollowCompany(companyId:$companyId)
          }
    `;
   public static SendFriendRequest = gql`
     mutation SendFriendRequest( $userId: String! ){
       SendFriendRequest( userId: $userId ){
             id
       }
     }
   `
  public static followUser = gql`
    mutation Follow( $userId: String! ){
      Follow( userId: $userId)
      
    }
  
  `

  public static unfollowUser = gql`
    mutation Unfollow( $userId: String! ){
      Unfollow( userId: $userId)

    }
  
  `
  public static getFollowingsPeople = gql`
  query getFollowings($query: String, $category: String, $letter: String, $sort_by: String, $companies: [String!]){
    
    getFollowings(query: $query, category: $category, letter: $letter, sort_by: $sort_by, companies: $companies){

      user_profile{
          ${GET_PROFILE}
      }
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

    public static getFollowingCompanies = gql`
    query getFollowingCompanies($query: String, $category: String, $letter: String, $sort_by: String){
      getFollowingCompanies(query: $query, category: $category, letter: $letter, sort_by: $sort_by){
 
        company_profile{
             ${getCompanyProfile}

        }
        categories
      
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
public static BatchRemoveFromFollowingsCategory = gql`
    mutation BatchRemoveFromFollowingsCategory($companyIds:[String!]!,$category_name:String!,$all:Boolean!){
      BatchRemoveFromFollowingsCategory(companyIds:$companyIds,category_name:$category_name,all:$all)
    }
`;
  public static UnfollowCompany = gql`
    mutation UnfollowCompany($companyId:String!){
      UnfollowCompany(companyId:$companyId)
  }
`;
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
            id
            avatar
            url
            name
            industry{
              id
              subindustries
            }
            network_info{
              followers
              followings
              
            }
            addresses{
              city{
                city
                id
              }
              primary
              country_id
            }
            avarage_rating
            follow
            
        }  
        categories
      }
    }
  `;
  public static getFriendRequests = gql`
  query getFriendRequests( $status:String, $sent:Boolean ){
      getFriendRequests( status:$status, sent:$sent ){
          id
          my_request
          status
          description
          friend {
              id
              url
              avatar
              first_name
              last_name
              gender
              primary_email
              primary_phone
          last_experience{
              company
              position
          }
          }
          created_at
          responded_at
      }
  }
`;
public static approveFriendRequest = gql`
    mutation ApproveFriendRequest( $requestId:String! ){
        ApproveFriendRequest( requestId:$requestId )
    }
 `;

 public static ignoreFriendRequest = gql`
        mutation IgnoreFriendRequest( $requestId:String! ){
            IgnoreFriendRequest( requestId:$requestId )
        }
  `;

  public static removeFromCategory = gql`
    mutation RemoveFromCategory( $userId: String!, $category_name: String!) {
      RemoveFromCategory( userId: $userId, category_name: $category_name ) {
        unique_name
        user_id
      }
    }
`;

public static addToCategory = gql`
    mutation AddToCategory( $userId: String!, $category_name: String!) {
      AddToCategory( userId: $userId,  category_name: $category_name) {
        unique_name
        user_id
      }
    }
`;
};
 