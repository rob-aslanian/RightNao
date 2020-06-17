
import { Injectable } from '@angular/core';

import gql from 'graphql-tag';

export class graphqlCompanyProfile {

  public static getProfile = gql`
  query GetCompanyProfile($url: String! $lang: String){
    GetCompanyProfile(url: $url lang: $lang){
      is_about_us_set
      avatar
      cover
      id
      url
      name
      email
      description
      mission
      websites
      phone{
        country_code
        number
      }
      industry{
        id
        subindustries
      }
      type
      foundation_date
      size
      parking
      follow
      favorite
      business_hours{
        id
        week_days
        hour_from
        hour_to
      }
      founders{
        id
        name
        position_title
        avatar
        approved
      }
      awards{
        id
        title
        issuer
        year,
        file{
          id,
          name
          address,
          mime_type,
        }
        link{
          id
          address
        }
      }
      milstones{
        id
        image
        year
        title
        description
      }
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
      gallery{
        id
        files{
          id
          name
          address
          mime_type
        }
        created_at
      }
      addresses{
        id, name, 
        zip_code,
        apartment,
        street_address,
        city {
          id
          city
        },
        country_id,
        phones{
          id
          country_code_id
          number
          is_primary
        }
        business_hours{
          id
          week_days
          hour_from
          hour_to
        }
        geo_pos{
          lantitude
          longitude
        }
        primary
      }
      my_role,
      blocked,
      amount_jobs,
      benefits,
      avarage_rating,
      current_translation
      available_translations
      network_info{
        followings
        followers
        employees
      }
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

  public static GetTranslationCompanyProfile = gql`
  query GetCompanyProfile($url: String! $lang: String){
    GetCompanyProfile(url: $url lang: $lang){
      id
      name
      description
      mission
      available_translations
      awards{
        id
        title
        issuer
        year,
        file{
          id,
          name
          address,
          mime_type,
        }
        link{
          id
          address
        }
      }
      milstones{
        id
        image
        year
        title
        description
      }

    }
  }
  `

  public static  GetCompanyReviews = gql`
  query GetCompanyReviews($company_id: ID!) {
      GetCompanyReviews(company_id:$company_id pagination:{first:999}) {
        id
        score
        headline
        description
        created_at
        user{
          avatar
          id
          firstname
          lastname
          experiences{
            title
            company
          }
        }
      }
  }
  `; 

  public static GetCompanyRate = gql`
  query GetCompanyRate($company_id: ID!) {
    GetCompanyRate(company_id:$company_id) {
      avarage_rate
      amount_reviews
    }
  }
  `;

  public static GetAmountOfEachRate = gql`
  query GetAmountOfEachRate($company_id: ID!) {
    GetAmountOfEachRate(company_id:$company_id) {
      score_excellent
      score_very_good
      score_good
      score_fair
      score_poor
      }
  }
  
  `;


  public static removeCompanyCoverImage = gql`
    mutation RemoveCompanyCover($company_id:ID!){
      RemoveCompanyCover(company_id: $company_id){
        id
        success
      }
    } 
  `;



  public static changeAbout = gql`
    mutation ChangeCompanyAboutUs($company_id: ID!, $changes: ChangingCompanyAboutUsInput!){
      ChangeCompanyAboutUs( company_id: $company_id, changes: $changes){
          success
      }
    }
  `;

  public static searchUsers = gql`
    query searchUsers($full_name: String){
      searchUsers(input: {
        full_name:$full_name
        isMyConnection: false
        isStudent: false, isMale: false, 
        isFemale: false}, pagination: {first: 9}) {
      
        profiles {
          id
          url
          avatar
          firstname
          gender
          lastname
          middlename
          friend
          friend_request
          follow
          birthday
          location{
          city
          country
          }

          educations(first:999){
            school 
            degree
            currently_study
            field_study
          }

          languages(first:999){
            language   
          }

          interests(first:999){
            interest
          }

          skills {
            id
            name
          }

          experiences(first:999){
            title
            company
          }
          network_info{
            mutual_connections_amount 
            followers
            followings
          }
        }

        amount_of_results
      }
    }
  `
  public static searchCompanyProfile = gql`
  query SearchCompanies($input:SearchCompaniesQuery!){
    searchCompanies(
      input:$input

      pagination:{
        first: 9
      }
      
    ){
      company{
     id
     avatar
     url
     name
     network_info{
      followings
      followers
     }
     description
     mission
     follow
     amount_jobs
     avarage_rating
     industry{
     id
     subindustries
     }
     type
     foundation_date
     size
     parking
     business_hours{
     id
     week_days
     hour_from
     hour_to
     }
     founders(first:999){
     id
     name
     position_title
     avatar
     userID
     approved
     }
     cover
     email
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
     }
      }
      amount_of_results
    }

  }
   `;
   
  
  public static addFounder = gql`
    mutation AddCompanyFounder($company_id: ID!, $input: CompanyFounderInput!){
      AddCompanyFounder( company_id: $company_id, input: $input ){
        success,
        id
      }
    } 
  `;

  public static editFounder = gql`
    mutation ChangeCompanyFounder($company_id: ID!, $changes: ChangingCompanyFounderInput!){
      ChangeCompanyFounder( company_id: $company_id, changes: $changes ){
         success
      }
    }
  `;

  public static deleteFounder = gql`
    mutation DeleteCompanyFounder($company_id: ID!, $id: ID!){
      DeleteCompanyFounder( company_id: $company_id, id: $id ){
          success
      }
    }
  `;

  public static addMilestone = gql`
    mutation AddCompanyMilestone($company_id: ID!, $input: CompanyMilestoneInput!){
      AddCompanyMilestone( company_id: $company_id, input: $input ){
          success,
          id
      }
    }
  `;

  public static editMilestone = gql`
    mutation ChangeCompanyMilestone($company_id: ID!, $changes: ChangingCompanyMilestoneInput!){
      ChangeCompanyMilestone( company_id: $company_id, changes: $changes ){
        success
      }
    }
  `;

  public static deleteMilestone = gql `
    mutation DeleteCompanyMilestone($company_id: ID!, $id: ID!){
      DeleteCompanyMilestone( company_id: $company_id, id: $id ){
        success
      }
    } 
  `;

  public static deleteImageinMilestone = gql`
    mutation RemoveImageInMilestone($company_id:ID! $id:ID!){
      RemoveImageInMilestone(company_id: $company_id id:$id){
        id
        success
      }
    }
    `;

  public static addAward = gql`
    mutation AddCompanyAward($company_id: ID!, $input: CompanyAwardInput!){
      AddCompanyAward( company_id: $company_id, input: $input ){
        success,
        id
      }
    }`;

    public static RemoveLinksInCompanyAward = gql`
    mutation RemoveLinksInCompanyAward(
      $company_id: ID!
      $id: ID!
      $links_id: [ID!]!
    ) {
      RemoveLinksInCompanyAward(company_id:$company_id id:$id links_id:$links_id){
        id
        success
      }
    }`;

    public static RemoveFilesInCompanyAward = gql`
    mutation RemoveFilesInCompanyAward(
      $company_id: ID!
      $id: ID!
      $files_id: [ID!]!
    ) {
      RemoveFilesInCompanyAward(company_id:$company_id id:$id files_id:$files_id){
        id
        success
      }
    }`;
  
  public static editAward = gql`
    mutation ChangeCompanyAward($company_id: ID!, $changes: ChangingCompanyAwardInput!){
      ChangeCompanyAward( company_id: $company_id, changes: $changes ){
        success
      }
    }`; 
    
  public static deleteAward = gql`
    mutation DeleteCompanyAward($company_id: ID!, $id: ID!){
      DeleteCompanyAward( company_id: $company_id, id: $id ){
         success
      }
    }`;

  public static addProduct = gql`
   mutation AddCompanyProduct($company_id: ID!, $input: CompanyProductInput!){
      AddCompanyProduct( company_id: $company_id, input: $input ){
        success,id
      }
    }`;

  public static editProduct = gql`
    mutation ChangeCompanyProduct($company_id: ID!, $changes: ChangingCompanyProductInput!){
      ChangeCompanyProduct( company_id: $company_id, changes: $changes ){
        success
      }
    }`;

  public static deleteProduct = gql`
    mutation DeleteCompanyProduct($company_id: ID!, $id: ID!){
      DeleteCompanyProduct( company_id: $company_id, id: $id ){
        success
      }
    }`;

  public static addService = gql`
    mutation AddCompanyService($company_id: ID!, $input: CompanyServiceInput!){
      AddCompanyService( company_id: $company_id, input: $input ){
        success,id
      }
    }`;

  public static editService = gql`
    mutation ChangeCompanyService($company_id: ID!, $changes: ChangingCompanyServiceInput!){
      ChangeCompanyService( company_id: $company_id, changes: $changes ){
        success
      }
    }`;

  public static deleteService = gql`
    mutation DeleteCompanyService($company_id: ID!, $id: ID!){
      DeleteCompanyService( company_id: $company_id, id: $id ){
        success
      }
    }`;

  public static FollowCompanyForCompany = gql`
    mutation FollowCompanyForCompany($companyId: String!, $followId: String!){
      FollowCompanyForCompany(companyId: $companyId, followId: $followId)
    }
  `;



  public static ChangeCompanyAddress = gql`
    mutation ChangeCompanyAddress($company_id:ID! $changes:ChangingCompanyAddressInput!){
      ChangeCompanyAddress(company_id:$company_id changes:$changes){
        id
        success
      }
    }
  `;

  public static RemoveCompanyAvatar = gql`
    mutation RemoveCompanyAvatar($company_id: ID!){
      RemoveCompanyAvatar(company_id:$company_id){
        id
        success
      }
    }
  `;
  public static RemoveProductImage = gql`
      mutation RemoveImageInProduct($company_id:ID!, $id:ID!){
        RemoveImageInProduct(company_id:$company_id,  id:$id){
          id
          success

        }
      }
  `;
  public static removeServiceImage = gql`
  mutation RemoveImageInService($company_id:ID!, $id:ID!){
    RemoveImageInService(company_id:$company_id,  id:$id){
      success

    }
  }
  `; 
    public static addCompanyReview = gql`
    mutation AddCompanyReview($company_id:ID!, $input:CompanyReviewInput!){
      AddCompanyReview(company_id:$company_id,  input:$input){
        success

      }
    }
    `;  


    public static ChangeCompanyBenefits = gql`
    mutation ChangeCompanyBenefits($company_id: ID! $benefits: [CompanyBenefitsEnum!]){
      ChangeCompanyBenefits(company_id:$company_id benefits:$benefits){
        id
        success
      }
    }
    `;

    public static RemoveFilesInCompanyGallery = gql`
    mutation RemoveFilesInCompanyGallery(
      $company_id: ID!
      $files_id: [ID!]!
    ) {
      RemoveFilesInCompanyGallery(
        company_id:$company_id,
        files_id:$files_id
      ){
        id
        success
      }
    }
    `
  public static removeOfficeCoverImage = gql`
          mutation RemoveVofficeCover(
            $office_id:  ID!
            $company_id: ID
        ){
          RemoveVofficeCover(
            office_id:  $office_id
            company_id: $company_id
        ){
          id
          success
        }
        }
  `

}

