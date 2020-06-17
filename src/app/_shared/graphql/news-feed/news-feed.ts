import gql from 'graphql-tag';

const POST = `
    id
    user_profile{
    id
    url
    avatar
    firstname
    lastname
    }
    company_profile{
    id
    url
    avatar
    name
    }
    text
    files{
        id
        name
        address
        mime_type
    }
    created_at
    changed_at
    hashtags
    shared_post_id
    is_comments_disabled
    is_notification_disabled
    likes_amount{
        like
        heart
        stop
        hmm
        clap
        rocket
        shit
    }
    comments_amount
    shares_amount
    liked
    tags{
        id
        type
    }
`;

export class graphqlNewsFeed {

    /*__________________ MUTATION  __________________*/

    public static AddPost = gql`
    mutation AddPost
        (
        $company_id: ID
        $newsfeed_user_id: ID
        $newsfeed_company_id: ID
        $text: String!
        $files_ids: [ID!]
        $shared_post_id: ID
    ){
        AddPostInNewsfeed(
            post: {
            company_id:$company_id
            newsfeed_user_id:$newsfeed_user_id
            newsfeed_company_id:$newsfeed_company_id
            text:$text
            files_ids:$files_ids
            shared_post_id: $shared_post_id
            }
        ){
            id
            success
        }
    }
    `;

    public static AddComment = gql`
    mutation AddComment(
        $company_id: ID
        $post_id: ID!
        $parent_id: ID
        $text: String!
        $files_ids: [ID!]
      ){
        AddCommentInPostInNewsfeed(
           comment:{
            company_id:$company_id
            post_id:$post_id
            parent_id:$parent_id
            text:$text
            files_ids:$files_ids
          }
        ){
          id
          success
        }
      }
    `;

    public static LikePostInNewsfeed = gql`
    mutation LikePostInNewsfeed(
        $post_id: ID!
        $comment_id: ID
        $like: LikeInput!
    ){
      LikePostInNewsfeed(
        post_id:$post_id
        comment_id:$comment_id
        like:$like
      ){
        id
        success
      }
    }`;

    public static UnlikePostInNewsfeed = gql`
    mutation UnlikePostInNewsfeed(
      $post_id: ID!
      $comment_id: ID
      $id: ID!
    ) {
      UnlikePostInNewsfeed(
        post_id: $post_id
        comment_id: $comment_id
        id: $id
      ){
        id
        success
      }
    }`;

    public static RemoveCommentInPostInNewsfeed = gql`
    mutation RemoveCommentInPostInNewsfeed(
      $post_id: ID!
      $comment_id: ID!
      $company_id: ID
    ) {
      RemoveCommentInPostInNewsfeed(
        post_id:$post_id
        comment_id:$comment_id
        company_id:$company_id
      ){
        id
        success
      }
    }`;

    /*__________________ MUTATION  __________________*/


     /*__________________ QUERY  __________________*/

    public static GetNewsFeed = gql`
    query GetNewsFeed(
        $id: ID
        $company_id: ID
        $pinned: Boolean
        $first: String!
        $after: String!
      ) {
        GetNewsfeed(
          id: $id
          company_id:$company_id
          pinned:$pinned
          first: $first,
          after: $after
        ){
          post_amount
          posts{ ${POST} }
        }
      }
    `;

    public static GetNewsfeedPost = gql`
    query GetNewsfeedPost($id: ID!){
      GetNewsfeedPost(id:$id){
       ${ POST }
      }
    }`;

    public static RemovePostInNewsfeed = gql`
    mutation RemovePostInNewsfeed(
        $post_id: ID!
        $company_id: ID
    ) {
      RemovePostInNewsfeed(
        post_id: $post_id
        company_id: $company_id
      ){
        id
        success
      }
    }`;

    public static ChangePostInNewsfeed = gql`
    mutation ChangePostInNewsfeed(
        $post:ChangePostNewsfeedInput!
    ) {
      ChangePostInNewsfeed(
        post:$post
      ){
        id
        success
      }
    }`;


    public static GetListOfLike = gql`
    query GetListOfLike(
      $post_id: ID!
      $comment_id: ID
      $company_id: ID
      $emoji: String
      $first: String!
      $after: String!
    ){
      GetListOfLikedInNewsfeed(
        post_id: $post_id
        comment_id: $comment_id
        company_id: $company_id
        emoji: $emoji
        first: $first
        after:$after
      ){
        __typename
        ... on UserLikedItem{
          profile{
            id
            url
            avatar
            firstname
            lastname
            friend
            me
            experiences{
              title
              company
            }
          }
          emoji
        }
        ... on CompanyLikedItem{
          profile{
            id
            avatar
            url
            name
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
          emoji
        }
      }
    }`;


    public static GetSharedPost = gql`
    query GetSharedPost(
        $id: ID!
          $first: String!
          $after: String!
      ){
        GetSharedPost(
          id:$id
          first:$first
          after:$after
        ){
            post_amount
            posts{ ${POST} }
        }
      }
    `
     /*__________________ QUERY  __________________*/

    public static GetComments = gql`
    query GetComments (
        $post_id: ID!
        $sort: PostCommentsSortEnum
        $first: String!
        $after: String!
      ){
       GetCommentsOfNewsfeedPost(
          post_id: $post_id
          sort: $sort
          first: $first,
          after: $after
        ){
          amount
          comments{
            id
            user_profile{
              id
              url
              avatar
              firstname
              lastname
            }
            company_profile{
              id
              avatar
              url
              name
            }
            files{
              id
              name
              address
              mime_type
            },
            text
            created_at
            replies_amount
            liked
            likes_amount{
              like
              heart
              stop
              hmm
              clap
              rocket
              shit
            }
          }
        } 
      }
    `;

    public static GetReplyComments = gql`
    query GetCommentRepliesOfNewsfeedPost (
        $post_id: ID!
        $commentID: ID!
        $first: String!
        $after: String!
      ){
     GetCommentRepliesOfNewsfeedPost(
          post_id: $post_id
          commentID: $commentID
          first: $first,
          after: $after
        ){
          amount
          comments{
            id
            user_profile{
              id
              url
              avatar
              firstname
              lastname
            }
            company_profile{
              id
              avatar
              url
              name
            }
            files{
              id
              name
              address
              mime_type
            },
            text
            created_at
            replies_amount
            liked
            parent_id
            likes_amount{
              like
              heart
              stop
              hmm
              clap
              rocket
              shit
            }
          }
        } 
      }
    `;

    /*__________________ SUBSCRIPTION   __________________*/
    
    public static AddedPost =  gql`
    subscription AddedPost(
      $id:ID!
    ){
      addedPost(
        id: $id
      ){
        id
        text
      }
    }
    `;

    public static AddedLike = gql`
    subscription AddedLike (
      $post_id:ID!
      $comment_id:ID
    ) {
      addedPostLike(
        post_id:$post_id
        comment_id:$comment_id
      ){
        id
        type
        emoji
      }
    }`;

    public static AddedComment = gql`
    subscription AddedComments(
      $post_id: ID!
    ) {
      addedPostComment(
        post_id: $post_id
      ){
        id
        user_profile{
          id
          avatar
          firstname
          lastname
        }
        company_profile{
          id
          avatar
          name
        }
        text
        tags{
          id
          type
        }
        liked
        likes_amount{
          like
        }
        files{
          id
          name
          address
          mime_type
        }
        replies_amount
        created_at
        parent_id
      }
    }`

    /*__________________ SUBSCRIPTION   __________________*/


}