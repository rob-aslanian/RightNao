import gql from 'graphql-tag';


export class graphQlRecommendation{
    public static getFriendships = gql`
      query getFriendships($query: String){
            getFriendships(query:$query){
            id
            status
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

    public static GetRecommendation = gql`
        query getProfile($url:String! , $lang:String){
            getProfile(url:$url , lang:$lang){
                id
                me,
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
                given_recommendations(first:999){
                  id
                  text
                  is_hidden
                  receiver{
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
                },
                requested_recommendation_requests(first: 999){
                  id
                  text
                  created_at
                  requested{  
                    id 
                    firstname
                    lastname
                    avatar
                    experiences{
                      company
                      title
                    } 
                  }
                },
                received_recommendation_requests(first:999){ 
                  id     
                  created_at   
                  requestor{                                  
                    id       
                    firstname 
                    lastname
                    avatar
                    experiences{
                      title
                      company
                    }
                  }
                },

            }
        }
    
    `;

    public static AskRecommendation = gql`
      mutation AskRecommendation($user_id:ID! $text:String! $relation: RecommendationRelationEnum $title:String){
        AskRecommendation(user_id:$user_id ,text:$text relation:$relation title:$title){
          id     
          success   
        }
      }
    `;
    public static WriteRecommendation = gql`
    mutation WriteRecommendation($user_id:ID! $text:String! $relation: RecommendationRelationEnum $title:String){
      WriteRecommendation(user_id:$user_id ,text:$text relation:$relation title:$title){
        id
        success
      }
    }
  `;

    public static IgnoreRecommendationRequest = gql`
      mutation IgnoreRecommendationRequest($id:ID!){
        IgnoreRecommendationRequest(id:$id){
          id
          success 
        }
      }
    `;

    public static  SetVisibilityRecommendation = gql`
      mutation SetVisibilityRecommendation($id: ID! $is_visible: Boolean!){
        SetVisibilityRecommendation(id:$id is_visible:$is_visible){
          id
          success
        }
      }
    `;
    public static removeFromFavourites = gql`
    mutation RemoveFromFavourites($userId: String!) {
      RemoveFromFavourites(userId: $userId) {
        user_id
      }
    }
  `;
  public static getRecommendations = gql`
  query hidden_recommendation($first:int,$after:String){
    hidden_recommendation(first: $first,after:$after){
      recommendation

    }
  }
`;
  public static unblockCompany = gql`
  mutation  UnblockCompany($companyId:String!){
       UnblockCompany(companyId:$companyId)
       
    }
  `;
  public static addCompanyAdmin = gql`
    mutation AddCompanyAdmin($company_id:ID!,$password:String!,$user_id:ID!,$role:CompanyAdminRoleEnum!){
           AddCompanyAdmin(company_id:$company_id,user_id:$user_id,password:$password,role:$role){
               id,
               success
      }
    }
  `;
  public static deleteCompanyAdmin = gql`
      mutation DeleteCompanyAdmin($company_id:ID!,$password:String!,$user_id:ID!){
        DeleteCompanyAdmin(company_id:$company_id,password:$password,user_id:$user_id){
           id,
           success
        }
      }
  `
   public static checkPassword = gql`
        query checkPassword($password: String!){
            checkPassword(password: $password){
                success
            }
        }
    `;
}