
import gql from 'graphql-tag';


export class groupsGraphql {

  public static checkGroupUrl = gql`
    query IsGroupURLBusy( $url: String! ){
        IsGroupURLBusy( url: $url )
    }
  `;
  
  public static  getGroup = gql`
        query GetGroupByURL(
            $url: String!
        ){
            GetGroupByURL(
            url: $url
            ){
            id
            url
            owner {
                id
                url
                avatar
                firstname
                lastname
            }
            name
            type
            privacy_type
            amount_of_members
            tagline
            description
            rules
            location{
                id
                city
                subdivision
                country
            }
            cover
            cover_origin
            created_at
            
            }
        }
  `;

  public static changeTagline = gql`
        mutation ChangeGroupTagline(
            $group_id: ID!
            $tagline: String!
        ){
        ChangeGroupTagline(
            group_id: $group_id
            tagline:  $tagline
        ){
            id
            success
        }
     }
  `;



 public static sendInvations = gql`

  mutation SentInvitations( $group_id: ID! $user_id: [ID!]!) {
        SentInvitations(  group_id: $group_id user_id: $user_id) {
        id
        success
    }
   } 
 `
 public static changeGroupName = gql`
    mutation ChangeGroupName($group_id: ID!, $name: String!){
        ChangeGroupName(group_id: $group_id, name: $name, ){
        id
        success
    }
  }
 `;

 public static changePrivactType = gql`
    mutation ChangeGroupPrivacyType($group_id: ID!, $type: GroupPrivacyTypeEnum!) {
        ChangeGroupPrivacyType(group_id: $group_id, type: $type) {
        id
        success
        }
    }
 `;
 public static changeGroupURL = gql`
    mutation ChangeGroupURL($group_id: ID!, $url: String!) {
        ChangeGroupURL(group_id: $group_id, url: $url) {
        id
        success
        }
    }
 `;
    public static getFriendships = gql`
    query getFriendships( $query:String ) {
        getFriendships(query: $query) {
        friend_profile {
            id
            avatar
            firstname
            lastname
            experiences(first: 999) {
                title
                company
            }
            url  
        }
        }
    }
    `;
 
 public static getFollowingCompanies = gql`
    query getFollowingCompanies($query: String ) {
        getFollowingCompanies(query: $query ){
            company_profile{
                id
                avatar
                name
                url 
            }
        }
    }
 `;
 
 
 public static getFollowingsForCompany = gql`
    query getFollowingsForCompany($query: String $companyId: String!) {
        getFollowingsForCompany(  query: $query companyId: $companyId ){
            user_profile {
                id
                avatar
                firstname
                lastname
                 url  
            }
        }
    }
`;

public static getFollowingCompaniesForCompany = gql`
    query getFollowingCompaniesForCompany($query: String $companyId: String!) {
        getFollowingCompaniesForCompany( query: $query companyId: $companyId){
            company_profile{
                id
                avatar
                name
                url   
           }
        }
    }
`;

}
