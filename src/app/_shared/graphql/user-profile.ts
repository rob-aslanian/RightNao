
import { Injectable } from '@angular/core';

import gql from 'graphql-tag';


const GET_PROFILE = `
      id,
      firstname,
      url,
      lastname,
      nickname,
      middlename,
      headline,
      avatar,
      birthday,
      online,
      email,
      emails,
      phone,
      phones,
      story,
      current_translation,
      available_translations,
   
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
          country
        } , country{
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
         id,
         name,
         endorsements{ 
           id
           firstname, 
           lastname,
           avatar 
           url
          },
          amount_endorsements
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

      toolsTechnologies(first:999){
        id
        userID
        companyID
        tool_Technology
        rank
        created_at
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

export class graphqlUserProfile {

  public static Login = gql`
  mutation ($input: Credentials!){
    Login(input:$input){
      status,
      token,
      id,
      url,
      is_2fa_requeried,
      avatar,
      first_name,
      last_name,
      gender
      email
    }
  }`;
  
  
  public static getProfile = gql`

  query getProfile($url: String!){
    getProfile(url: $url) {
      ${GET_PROFILE}
      recieved_recommendation(first: 999){
        id,
        text
        is_hidden
        created_at
        title
        relation
        recommendator{
          id
            avatar
          firstname
          lastname
          experiences{
            company
            title
          } 
          skills{
            id
            name  
          }
          url
        }
      }
      given_recommendations(first:999){
        id
        is_hidden
        text
        created_at
        title
        relation
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
          url
        }
      },
      requested_recommendation_requests(first: 999){
        id
        text
        created_at
        title
        relation
        requested {
          id
          firstname
          lastname
          avatar
          experiences{
            company
            title
          } 
          url
        }
      },
      received_recommendation_requests(first:999){
        id
        text
        created_at
        title
        relation
        requestor{
          id
          firstname
          lastname
          avatar
          experiences{
            title
            company
          }
        url
        }
      },  
      hidden_recommendation(first:999){
        id,
        text
        is_hidden
        title
        relation
        receiver{
          id
          firstname
          lastname
          avatar
            skills{
                id
                name
              } 
          experiences{
            company
            title
        }
        url
        }
      },

    }   
  }
  `;


  public static getTranslatedLanguage = gql`

  query getProfile($url: String!, $lang: String){
    getProfile(url: $url, lang: $lang) {
      ${GET_PROFILE}
      recieved_recommendation(first:999){
        id,
        text
        is_hidden
        recommendator{
          id
            avatar
          firstname
          lastname
          experiences{
            company
            title
          } 
          skills{
            id
            name
            
          }
        }
      }
      given_recommendations(first:999){
        id
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
        requested {
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
        text
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
      hidden_recommendation(first:999){
        id,
        text
        is_hidden
    
        receiver{
          id
          firstname
          lastname
          avatar
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

    }   
  }
  `;


  public static getUnAuthProfile = gql`
  query getProfile($url: String!){
    getProfile(url: $url) {
      ${GET_PROFILE}
    }
  }
  `; 

  public static getUserInfo = gql`
  query getProfile($url: String!){
    getProfile(url: $url) {
      id,
      firstname,
      lastname,
      nickname,
      avatar,
    }   
  }
  `;

  public static getMyCompany = gql`
  query getMyCompanies {
    getMyCompanies{
      id,
      url,
      avatar,
      name,
      current_translation
      available_translations
      network_info{
        followers
      },
      career_center{
        title
        description
        cv_button_enabled
        custom_button_enabled
        custom_button_title
        custom_button_url
      }
    } 
  }
  `;

 
  public static changeStory = gql`
    mutation ChangeStory($input: String!){
      ChangeStory(input: $input){
      success
      }
    }`;

    public static removeAvatar = gql`
    mutation RemoveAvatar{
      RemoveAvatar{
        success
      }
    }`;

  public static changeHeadline = gql`
    mutation ChangeHeadline($input: String!){
      ChangeHeadline(input: $input){
        success
      }
    }`;
  
  public static addExperience = gql`
    mutation AddExperience($experience: ExperienceInput!){
      AddExperience(experience: $experience){
        success, id
      }
    }
  `;

  public static editExperience = gql`
    mutation ChangeExperience($id: ID!, $experience: ChangingExperienceInput!){
      ChangeExperience(id: $id, experience: $experience){
      success
      }
    }
  `;
  
  public static deleteExperience = gql`
   mutation RemoveExperience($id: ID!){
      RemoveExperience(id: $id){
       success
     }  
   }
  `;

  public static addEducation = gql`
    mutation AddEducation($education: EducationInput!){
      AddEducation( education: $education){
        success, id
      }
    }
  `;

  public static editEducation = gql`
    mutation ChangeEducation( $id: ID!, $education:ChangingEducationInput!){
      ChangeEducation( id: $id,education: $education){
       success
      }
    }
  `;

  public static deleteEducation = gql`
    mutation RemoveEducation( $id: ID! ){
      RemoveEducation( id: $id){
        success
      }
    }
  `;

  public static addSkill = gql`
    mutation AddSkills($skills: [SkillInput!]!){
      AddSkills( skills: $skills){
        success, id
      }
    }
  `;

  public static deleteSkill = gql`
    mutation RemoveSkills( $skill_id: [ID!]! ){
      RemoveSkills( skill_id: $skill_id){
        success
      }
    }
  `;


  public static addLanguage = gql`
    mutation AddKnownLanguage($language: KnownLanguageInput!){
      AddKnownLanguage( language: $language){
        success, id
      }
    }
  `;

  public static editLanguage = gql`
    mutation ChangeKnownLanguage($id: ID!,$language: ChangingKnownLanguageInput!){
      ChangeKnownLanguage( id: $id ,language: $language){
        success
      }
    }  
  `;

  public static deleteLanguage = gql`
    mutation RemoveKnownLanguage( $id: ID! ){
      RemoveKnownLanguage( id: $id ){
        success
      }
    }
  `;

  public static addInterest = gql`
    mutation AddInterest($input: InterestInput!){
      AddInterest( input: $input){
        success, id
      }
    }
  `;

  public static editInterest = gql`
    mutation ChangeInterest($id: ID!, $interest: ChangingInterestInput!){
      ChangeInterest( id: $id, interest: $interest){
        success
      }
    }
  `;

  public static deleteInterest = gql`
    mutation RemoveInterest( $id: ID! ){
      RemoveInterest( id: $id ){
        success
      }
    }
  `;

  public static SendFriendRequest = gql`
    mutation SendFriendRequest($userId: String!, $description: String){
      SendFriendRequest(userId: $userId, description: $description){
        id,my_request,status
      }
    }
  `;

  public static approveFriendRequest = gql`
    mutation ApproveFriendRequest($requestId: String!){
      ApproveFriendRequest(requestId: $requestId)
    }
  `;
  
  public static GetOriginAvatar = gql`
    query GetOriginAvatar{
      GetOriginAvatar
    }
  `;

  public static CreateConversation = gql`
    mutation CreateConversation($name: String!, $avatar: String!, $participants: [ParticipantInput!]!){
      CreateConversation(name: $name, avatar: $avatar, participants: $participants){
        id
      }
    }
  `;
  public static CreateConversationCompany = gql`
    mutation CreateConversationForCompany($companyId:String!,$name: String!, $avatar: String!, $participants: [ParticipantInput!]!){
      CreateConversationForCompany(companyId:$companyId, name:$name, avatar: $avatar, participants: $participants){
        id
      }
    }
  `;

  public static ChangeOrderOfSkill = gql`
    mutation ChangeOrderOfSkill($skill:ChangeOrderSkillInput!){
      ChangeOrderOfSkill(skill:$skill){
        id
        success
      }
    } 
  `;

  public static AddLinksInEducation = gql`
    mutation AddLinksInEducation($id:ID! $input:[LinkInput!]!){
      AddLinksInEducation(id:$id input:$input){
        id
        success
      }
    }
  `;

  public static RemoveFilesInEducation = gql`
    mutation RemoveFilesInEducation($id:ID! $files_id:[ID!]! ){
      RemoveFilesInEducation(id:$id,files_id:$files_id){
        id
        success
      }
    }
  `;

  public static RemoveFilesInExperience = gql`
    mutation RemoveFilesInExperience($id:ID! $files_id:[ID!]! ){
      RemoveFilesInExperience(id:$id,files_id:$files_id){
        id
        success
      }
    }  
  `;

  public static RemoveFilesInAccomplishment = gql`
    mutation RemoveFilesInAccomplishment($id:ID! $files_id:[ID!]!){
      RemoveFilesInAccomplishment(id:$id, files_id:$files_id){
        id
        success
      }
    }
  `;

  public static RemoveLinksInEducation = gql`
    mutation RemoveLinksInEducation($id:ID! $links_id:[ID!]!){
      RemoveLinksInEducation(id:$id, links_id:$links_id){
        id
        success
      }
    }
  `;

  public static RemoveLinksInExperience = gql`
    mutation RemoveLinksInExperience($id:ID! $links_id:[ID!]!){
      RemoveLinksInExperience(id:$id, links_id:$links_id){
        id
        success
      }
      
    }
  `;

  public static RemoveLinksInAccomplishment = gql`
    mutation RemoveLinksInAccomplishment($id:ID! $links_id:[ID!]!){
      RemoveLinksInAccomplishment(id:$id, links_id:$links_id){
        id
        success
      }
      
    }
  `;


  public static ChangeLinkInEducation = gql`
    mutation ChangeLinkInEducation($id:ID! $link_id:ID! ,$url:String!){
      ChangeLinkInEducation(id:$id, link_id:$link_id url:$url){
        id
        success
      }
    }
  `;

  public static checkUsername = gql`
    query checkUsername($username:String!) {
      checkUsername(username:$username)
    }
  `;
  public static removeImageInterst = gql`
  mutation RemoveImageInInterest($id:ID!) {
    RemoveImageInInterest(id:$id){     
      success
    }
  }
`;
 public static addLanguages = gql`
    mutation AddKnownLanguage($language:KnownLanguageInput!){
        ChangeKnownLanguage(language:$language){
           id
           success
      }
    }
 `;
 public static removeLanguage = gql`
    mutation RemoveKnownLanguage($id:ID!){
      RemoveKnownLanguage(id:$id){
        id
        success
      }
    }
 `;
 public static changeKnownLanguage = gql`
    mutation ChangeKnownLanguage($id:ID!,$language:ChangingKnownLanguageInput!){
         ChangeKnownLanguage(id:$id,language:$language){
           id
           success
      }
    }
 `;
 public static ChangeHeadline = gql`
     mutation ChangeHeadline($input:String!){
        ChangeHeadline(input:$input){
          success
       }
     }
 
 `
 public static GetReviews = gql`
  query GetCompanyReviewsOfUser($user_id: ID!, $pagination: PaginationInput!) {
        GetCompanyReviewsOfUser(user_id:$user_id ,pagination:$pagination){
        id
        score
        headline
        description
        company {
            id
            url
            name
            avatar
            foundation_date
            url
        }
        created_at
      }
  }`;

  public static VerifySkill = gql`
  mutation VerifySkill($user_id: ID! $skill_id: ID!){
    VerifySkill(user_id:$user_id skill_id:$skill_id){
      id
      success
    }
  }
  `;

  public static UnverifySkill = gql`
  mutation UnverifySkill($user_id: ID! $skill_id: ID!){
    UnverifySkill(user_id:$user_id skill_id:$skill_id){
      id
      success
    }
  }
  `;

  public static AddToolTechnology = gql`
    mutation AddToolTechnology($tools_technologies: [ToolTechnologyInput!]!){
      AddToolTechnology(tools_technologies: $tools_technologies){
        ids
      }
    }
  `;


  public static RemoveToolTechnology = gql`
    mutation RemoveToolTechnology($id: [ID!]!){
    RemoveToolTechnology(id: $id){
      id,
      success
    }
  }
  `;

  public static ChangeToolTechnology = gql`
    mutation ChangeToolTechnology($tools_technologies: [ChangeToolTechnologyInput!]!){
      ChangeToolTechnology(tools_technologies: $tools_technologies){
        id,
        success
      }
    }
  `;
  
  public static addPortfolio = gql`
      mutation AddPortfolio($portfolio:PortfolioInput!){
         AddPortfolio(portfolio:$portfolio){
            id
            success
         }
      }
   `;

  public static getDetailedPortfolio = gql`
        query GetUserPortfolioByID( $user_id: ID! $portfolio_id: ID!) {
          GetUserPortfolioByID(  user_id: $user_id portfolio_id: $portfolio_id) {
              id
              content_type
              tools
              title
              description
              files {
                id
                name
                address
                mime_type
              }
              created_at
              saved_count
              has_liked
              view_count
              like_count
              share_count
              is_comments_disabled
         }
      }
  `;
    public static likeUserPortfolio = gql`
      mutation LikeUserPortfolio($company_id: ID, $owner_id: ID! $portfolio_id: ID!) {
        LikeUserPortfolio(company_id: $company_id owner_id: $owner_id portfolio_id: $portfolio_id) {
          id
          success
        }
      }`;

    public static unlikeUserPortfolio = gql`
      mutation UnLikeUserPortfolio( $company_id: ID $owner_id: ID! $portfolio_id: ID! ) {
        UnLikeUserPortfolio( company_id: $company_id owner_id: $owner_id portfolio_id: $portfolio_id) {
          id
          success
        }
      }
    `;

    public static addCommentsInportfolio = gql`
        mutation AddCommentToPortfolio( $comment: AddPortfolioCommentInput! ) {
          AddCommentToPortfolio( comment: $comment ) {
            id
            success
          }
        }
    `;

    public static deleteCommentPortfolio = gql`
        mutation RemoveCommentInPortfolio( $company_id: ID $portfolio_id: ID! $comment_id: ID! ) {
          RemoveCommentInPortfolio(
            company_id: $company_id
            portfolio_id: $portfolio_id
            comment_id: $comment_id
          ){
            success
          }
        }
    `;

    public static getCommentsInPortfolio = gql`
        query GetPortfolioComments( $portfolio_id: ID!, $pagination: PaginationInput! ) {
          GetUserPortfolioComments( portfolio_id: $portfolio_id, pagination: $pagination  ){
            comments_amount
            comments{
              id
              comment
              created_at
              
              user_profile{
                id
                avatar
                firstname
                lastname
                url
              }

              company_profile{
                id
                avatar
                name
                url
              }
              
            }
          
          }
        }
    `;

    public static changePortfolio = gql`
      mutation ChangePortfolio ( $id: ID!, $portfolio: ChangingPortfolioInput!) {
          ChangePortfolio( id: $id portfolio: $portfolio ){
          id
          success
        }
     }`;

    public static removePortfolio = gql`
        mutation RemovePortfolio($id:ID!){
            RemovePortfolio(id:$id){
                  id
                  success
            }
        }
    `;

 
    public static removeFIlesPortfolio = gql`
      mutation RemoveFilesInPortfolio($id:ID!,$files_id:[ID!]!){
            RemoveFilesInPortfolio(id:$id,files_id:$files_id){
              id
              success     
            }
         }
    `

 
   public static changeOrdersInPorfolio = gql`
     mutation ChangeOrderFilesInPortfolio($file: ChangeOrderFilesInPortfolioInput!){
      ChangeOrderFilesInPortfolio(file: $file){
           id
           success
      }
     }
   `
 

  public static getUserNetworkInfo = gql`
    query getProfileByID( $user_id: String!){
      getProfileByID(  user_id: $user_id){
        id
        network_info {
          followings
          followers
          connections
        }
      }
    }
  `;


  public static getCompanyNetworkInfo = gql`
    query GetCompanyProfileByID( $company_id: ID! ){
      GetCompanyProfileByID(  company_id: $company_id){
        id
        network_info {
          followings
          followers
        }
      }
    }
  `;

  public static getUserPortfolioByContentType = gql`
      query getPortfolio( $user_id: String!,  $content_type: ContentTypeEnum!, $pagination: PaginationInput!, $company_id: ID ) {
        GetUserPortfolios( user_id: $user_id, content_type: $content_type, pagination: $pagination, company_id: $company_id ) {
          portfolios {
          id

          files{
              id
              name
              address
              mime_type
          }
          has_liked
          title
          created_at
          view_count
          like_count
         }
          portfolio_amount
      }
    }`;

    public static AddSavedCountToPortfolio = gql`
      mutation AddSavedCountToPortfolio($owner_id: ID!, $portfolio_id: ID!) {
        AddSavedCountToPortfolio( owner_id: $owner_id, portfolio_id: $portfolio_id ) {
          id
          success
        }
      }
    `;

    public static AddViewCountToPortfolio = gql`
      mutation AddViewCountToPortfolio( $company_id: ID, $owner_id: ID!, $portfolio_id: ID! ) {
        AddViewCountToPortfolio( company_id: $company_id, owner_id: $owner_id, portfolio_id: $portfolio_id ) {
            id
            success
        }
      }
    `;

    public static GetPortfolioInfo = gql`
        query GetPortfolioInfo( $user_id: ID! ){
          GetUserPortfolioInfo( user_id: $user_id ){
              portfolio_statistic{
                view_count
                like_count
                comment_count
              }

              portfolio_amount{
                has_photo
                has_video
                has_article
                has_audio
             }

          }
        }
    `;
 
 
  }

 
