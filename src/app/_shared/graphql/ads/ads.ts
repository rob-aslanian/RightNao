import gql from 'graphql-tag';


const COMPANY_PROFILE = `
  id
  url
  avatar
  name
  industry{
    id
  }
  addresses{
    name
    country_id
    primary
    city {
      id
      city
    }
  }
`;

export class graphqlAds {
    /////_______ Mutations __________/////



    //actul

    /////_______ Mutations __________/////
    public static CreateAdvertCampaign = gql`
    mutation CreateAdvertCampaign($input: AdvertCampaignInput!){
      CreateAdvertCampaign(input: $input) {
        id
        success
      }
    }`;

    public static CreateAdvertByCampaign = gql`
    mutation CreateAdvertByCampaign($campaign_id: ID! $input: AdvertInput!){
      CreateAdvertByCampaign(campaign_id: $campaign_id input: $input) {
        id
        success
      }
    }`;



    public static pauseAdvertCampaign = gql`
    mutation pauseAdvertCampaign($campaign_id: ID!) {
      PauseAdvertCampaign(campaign_id: $campaign_id) {
        id
        success
      }
    }
    `
    public static pauseAdvert = gql`
    mutation pauseAdvert($advert_id: ID!) {
      PauseAdvert(advert_id: $advert_id) {
        id
        success
        
      }
    }`

    public static removeAdvertCampaign = gql`
    mutation removeAdvertCampaign($campaign_id: ID!){
      RemoveAdvertCampaign(campaign_id: $campaign_id) {
        id
        success
      }
    }`

    public static removeAdvert = gql`
    mutation RemoveAdvert($campaign_id: ID! $advert_id: ID!) {
      RemoveAdvert(campaign_id: $campaign_id advert_id: $advert_id) {
        id
        success
      }
    }`

    public static activeAdvertCampaign = gql`
    mutation ActiveAdvertCampaign($campaign_id: ID!){
      ActiveAdvertCampaign(campaign_id: $campaign_id) {
        id
        success
      }
    }`

    public static activeAdvert = gql`
    mutation ActiveAdvert($advert_id: ID!) {
      ActiveAdvert(advert_id: $advert_id) {
        id
        success
      }
    }`

    public static ClickOnAdvert = gql`
    mutation ClickOnAdvert($advert_id:ID!) {
      ClickOnAdvert(advert_id:$advert_id){
        success
      }
    }`;
    
    /////_______ Mutations __________/////


    /////_______ Queries __________/////

    public static GetAdvertCampaigns = gql`
    query GetAdvertCampaigns($company_id: ID $pagination: PaginationInput!){
      GetAdvertCampaigns(company_id: $company_id pagination: $pagination){
        total_amount
        campaings{
          id
          status
          name
          type
          start_date
          impressions
          clicks
          forwarding
          referals
          ctr_avg
          age_from
          age_to
          gender
          format
          languages
          locations {
            city
            country
          }
        }
      }
    }`;

    public static GetAdvertsByCampaignID = gql`
    query GetAdvertsByCampaignID($company_id: ID $campaign_id: ID! $pagination: PaginationInput!){
      GetAdvertsByCampaignID(company_id:$company_id campaign_id: $campaign_id pagination: $pagination){
        total_amount
        capmaign{
          id
          status
          name
          type
          start_date
          impressions
          clicks
          forwarding
          referals
          ctr_avg
          age_from
          age_to
          gender
          format
          languages
          locations {
            city
            country
          }
            }
        adverts{
          id
          name
          type
          status
          start_date
          end_date
          impressions
          clicks
          forwarding
          referals
          ctr_avg
          contents{
            title
            description
            destination_url
            custom_button
          }
          url
          files {
            id
            name
            address
            mime_type
          }
        }
      }
    }`;

    public static GetAdvert = gql`
    query GetAdvert($type: AdvertType!){
      GetAdvert(type: $type){
        id
        type_id
        name
        type
        status
        start_date
        end_date
        impressions
        clicks
        campaing_impressions
        campaing_clicks
        forwarding
        referals
        ctr_avg
        contents{
          title
          description
          destination_url
          custom_button
        }
        url
        formats
        files{
          id
          name
          address
          mime_type
        }
      }
    }`;

    public static GetAdverts = gql`
    query GetAdverts($type: AdvertType $formats: [AdvertFormatEnum!]!  $amount: Int!){
      GetAdverts(type: $type formats:$formats amount:$amount){
        adverts{
          id
          type_id
          name
          type
          status
          start_date
          end_date
          impressions
          campaing_impressions
          campaing_clicks
          forwarding
          referals
          ctr_avg
          contents{
            title
            description
            destination_url
            custom_button
          }
          url
          formats
          files{
            id
            name
            address
            mime_type
          }
        }
      }
    }`;
    /////_______ Queries __________/////
    //actual





    public static CreateAdvertBanner = gql`
    mutation CreateAdvertBanner($company_id: ID $banner: BannerInput!){
      CreateAdvertBanner(company_id:$company_id banner:$banner){
          id
          success
        }
    }`;

    public static CreateAdvertBannerDraft = gql`
    mutation CreateAdvertBannerDraft($company_id: ID $banner: BannerInput!){
      CreateAdvertBannerDraft(company_id: $company_id banner:$banner){
            id
            success
        }
    }`;

    public static CreateAdvertCandidate = gql`
    mutation CreateAdvertCandidate(
      $candidate: AdvertCandidateInput!
    ){
      CreateAdvertCandidate(candidate:$candidate){
        id
        success
      }
    }`;

    public static CreateAdvertJob = gql`
    mutation CreateAdvertJob(
      $company_id: ID!
      $job: AdvertJobInput!
    ){
      CreateAdvertJob(
        company_id:$company_id
        job:$job
        ){
        id
        success
      }
    }`;

    public static PublishAdvert = gql`
    mutation PublishAdvert(
      $company_id: ID
      $id: ID!
    ) {
      PublishAdvert(company_id:$company_id id:$id){
        id
        success
      }
    }`;

    public static PutAdvertOnPause = gql`
    mutation PutAdvertOnPause(
      $company_id: ID
      $id: ID!
    ) {
      PutAdvertOnPause(
        company_id: $company_id
        id: $id
      ){
        id
        success
      }
    }`;

    public static RemoveAdvert = gql`
    mutation RemoveAdvert(
      $company_id: ID
      $id: ID!
    ) {
      RemoveAdvert(
        company_id: $company_id
        id: $id
      ){
        id
        success
      }
    }`


    /////_______ Mutations __________/////



    /////_______ Queries __________/////


    public static GetMyAdvert = gql`
    query GetMyAdvert(
      $company_id: ID
      $first: String!
      $after: String!
    ){
      GetMyAdvert(
        company_id:$company_id,
        first:$first
        after:$after
      ){
        ads{
          id
          name
          status
          start_date
          end_date
          type
          budget
          creator_profile{
            id
            url
            avatar,
            firstname,
            lastname
          }
        }
        amount
      }
    }`

    public static GetAdvertGallery = gql`
    query GetAdvertGallery(
      $company_id: ID
      $first: String!
      $after: String!
    ) {
     GetAdvertGallery(
      company_id:$company_id,
      first:$first
      after:$after
      ){
        files{
          id
          name
          address
          mime_type
        }
        amount
      }
    }`;

    public static searchCompanies = gql`
    query searchCompanies {
      searchCompanies(input:{
        search_for_companies:true,
        search_for_organizations:true
        with_jobs:true
        size:size_unknown
        type:type_unknown
      } 
      pagination:{
        first:9999  
      }){
        amount_of_results
      }
    } `;

    public static searchUsers = gql`
    query searchUsers {
      searchUsers(input:{
        isMyConnection:false
        isStudent:false
        isMale:true
        isFemale:true
      }
      pagination:{
       first:9999 
      }){
        amount_of_results
      }
    }`;

    public static getProfile = gql`
    query getProfile(
      $url: String!
      $lang: String
    ) {
      getProfile(
        url:$url
        lang:$lang
      ){
        id
        url
        avatar
        firstname
        lastname
        experiences(first:1){
          title
          company
        }
        profile_complete_percent
      }
    }`;

    public static GetCompanyProfile = gql`
    query GetCompanyProfile(
      $url: String!
      $lang: String
    ) {
      GetCompanyProfile(
        url:$url
        lang:$lang
      ){
        ${COMPANY_PROFILE}
      }
    }`

    public static GetAdvertJobs = gql`
    query GetAdvertJobs (
      $countryID: ID!
      $amount: Int!
    ){
      GetAdvertJobs(
         countryID:$countryID
         amount:$amount
      ){
       ${COMPANY_PROFILE}
      }
    }`;

    public static GetAdvertCandidates = gql`
    query GetAdvertCandidates(
      $countryID: ID!
      $format: AdvertFormatEnum!
      $amount: Int!
    ){
      GetAdvertCandidates(
        countryID:$countryID
        format:$format
        amount:$amount
      ){
        id
        url
        avatar
        firstname
        lastname
        experiences(first:1){
          title
          company
          
        }
      }
    }`;

    public static GetAdvertBanners = gql`
    query GetAdvertBanners(
      $countryID: ID!
      $format: AdvertFormatEnum!
      $amount: Int!
  ) {
    GetAdvertBanners(
      countryID: $countryID
      format:$format
      amount: $amount
    ){
      button_title
      contents{
        title
        description
        destination_url
      }
    }
   }`



   //office-service
   public static getOffice = gql`
   query GetVOffice($company_id: ID, $user_id: ID) {
     GetVOffice(company_id: $company_id, user_id: $user_id) {
      v_offices {
        name
        id

      }
     }
   }
 `;

 public static GetCompanyProfileByID = gql`
 query GetCompanyProfileByID($company_id:ID!){
   GetCompanyProfileByID(
     company_id: $company_id
   ){
     id
     url
     avatar
     name
     industry{
       id
     }
     follow
     network_info{
       employees
       followings
       followers
     }
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
 }

`; 
 public static GetAllServices = gql`
 query GetAllServices( $company_id: ID ){
   GetAllServices( company_id: $company_id ){
     services{
       id
       title
       officeID
     }
   }
 }`;
 
 //companies
 public static getAllMyCompany = gql`
 query getMyCompanies {
   getMyCompanies{
     id,
     name
     url
   } 
 }
 `;
 
 //jobs
 public static GetAllJobs = gql`
 query GetPostedJobs($companyId:ID!) {
   GetPostedJobs(companyId:$companyId){
     id
     job_details {
       title
     }
     company {
       id
       url
     }

   }
 }
 
 `;

    /////_______ Queries __________/////
}