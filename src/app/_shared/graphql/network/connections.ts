
import gql from 'graphql-tag';


export class Connections {

    public static getFriendships = gql`
        query getFriendships($query: String,$category: String,$letter: String,$sort_by: String,$companies:[String!]){
            getFriendships(query:$query,category:$category,letter:$letter,sort_by:$sort_by,companies:$companies){
            id
            my_request
            status
            categories
            following
           friend_profile{
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
                    company,position
                  }
            }
            }
            
        }
    `;



    public static createCategories = gql`
        mutation CreateCategory($name: String!,$parent: String!){
            CreateCategory(name:$name,parent:$parent)
        }
    `;

    public static AddToCategory = gql`
        mutation AddToCategory($userId: String!,$category_name: String!){
            AddToCategory(userId: $userId,category_name: $category_name){
                unique_name
                user_id
            }
        }
    `;

    public static RemoveFromCategory = gql`
        mutation RemoveFromCategory($userId: String!,$category_name: String!){
            RemoveFromCategory(userId: $userId,category_name: $category_name){
                unique_name
                user_id
            }
        }
    `;

    public static RemoveCategory = gql`
        mutation RemoveCategory($name: String!,$parent: String!){
            RemoveCategory(name: $name,parent: $parent)
        }
    `;
    
    public static Follow = gql`
        mutation Follow($userId: String!){
            Follow(userId: $userId)
        }
    `;
    
    public static Unfollow = gql`
        mutation Unfollow($userId: String!){
            Unfollow(userId: $userId)
        }
    `;

    public static BlockUser = gql`
        mutation BlockUser( $userId:String! ){
            BlockUser( userId:$userId )
        }
    `;

    public static BatchRemoveFromCategory = gql`
        mutation BatchRemoveFromCategory($userIds:[String!]!,$category_name:String!,$all:Boolean!){
            BatchRemoveFromCategory(userIds:$userIds,category_name:$category_name,all:$all)
        }
    `;

    public static Unfriend = gql`
        mutation Unfriend($userId:ID!){
            Unfriend(userId:$userId)
        }
    `;

    public static getConnectionsOfUser = gql`
     query getConnectionsOfUser($user_id:ID!){
      getConnectionsOfUser(user_id:$user_id, pagination:{first:999}){
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
      available_translations
      date_of_registration
      network_info{
        connections
        followings
        followers
        recommendations
        reviews
        mutual_connections_amount
      }
      experiences(first: 999){
        id
        title
        company
        start_date
        finish_date
        currently
        description

      }
       }
     }
  }
  `;

  public static getMutualConnectionsOfUser = gql`
  query getMutualConnectionsOfUser($user_id:ID!){
    getMutualConnectionsOfUser(user_id:$user_id, pagination:{first:999}){
      amount
      profiles{
        id
        firstname
        lastname
        avatar
        network_info{
          connections
          followings
          followers
          recommendations
          reviews
          mutual_connections_amount
        }
      }
    }
  }
  `;

}
