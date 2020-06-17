import { Injectable } from '@angular/core';

import gql from 'graphql-tag';


export class graphqlCompanyAccount {

    public static getCompanyAccount = gql`
    query GetCompanyAccount($company_id: ID!){
        GetCompanyAccount(company_id: $company_id) {
            id,
            owner_id,
            name,
            url,
            industry{
                id,subindustries
            },
            type,
            size,
            addresses{
                id,
                name,
                apartment,
                street_address,
                city{
                    id,city,subdivision
                },
                zip_code,
                country_id,
                phones{
                    id,country_code_id, country_code,  number, is_primary
                },
                business_hours{
                    id,week_days,hour_from,hour_to
                },
                geo_pos{
                    lantitude, longitude
                }
                primary
            },          
            foundation_date,
            emails{
                id,email
            },
            phones{
                id,country_code_id,number,is_primary
            },
            status,
            websites{
                id, website
            },
            parking,
            business_hours{
                id
                week_days
                hour_from
                hour_to
            }
            
        } 
    }
   `;
   public static getProfileHeader = gql`
    query GetCompanyProfile($url: String!) {
        GetCompanyProfile(url: $url) {
        avatar
        name
        foundation_date
        industry {
            id
        }
        addresses {
            city {
            city
                subdivision
            }
        }
        }
    } 
    `

   public static changeName = gql`
   mutation ChangeCompanyName($company_id: ID!, $name: String!){
        ChangeCompanyName( company_id: $company_id, name: $name ){
            success
        }
    }`;

    public static changeIndustry = gql`
    mutation ChangeCompanyIndustry($company_id: ID!, $input: ChangeCompanyIndustryInput!){
        ChangeCompanyIndustry( company_id: $company_id, input: $input ){
            success
        }
    }`;

    public static registerComapny = gql`
    mutation($input: RegistrationCompanyInput!) {
        RegisterCompany(input: $input) {
          success
          id
          url
        }
      }
    `;

    public static changeDataFound = gql`
    mutation ChangeCompanyFoundationDate($company_id: ID!, $foundation_date: String!){
        ChangeCompanyFoundationDate( company_id: $company_id, foundation_date: $foundation_date ){
            success
        }
    }`;
    
    public static changeCompanySize = gql`
    mutation ChangeCompanySize($company_id: ID!, $size: CompanySizeEnum!){
        ChangeCompanySize( company_id: $company_id, size: $size ){
            success
        }
    }`;

    public static changeComapnyType = gql`
    mutation ChangeCompanyType($company_id:ID! $type:CompanyTypeEnum!){
        ChangeCompanyType(company_id:$company_id type:$type){
            id
            success
        }
    }`;
    
    
    public static changeparking = gql`
    mutation ChangeCompanyParking($company_id: ID!, $parking: CompanyParkingEnum!){
        ChangeCompanyParking( company_id: $company_id, parking: $parking ){
            success
        }
    }`;
    
    public static addEmail = gql`
    mutation AddCompanyEmail($company_id: ID!,$input: CompanyEmailInput!){
        AddCompanyEmail(company_id: $company_id, input: $input ){
            id
            success
        }
    }`;
    
    public static deleteEmail = gql`
    mutation DeleteCompanyEmail($company_id: ID!,$id: ID!){
        DeleteCompanyEmail(company_id: $company_id, id: $id ){
            success
        }
    }`;

    
    public static addPhone = gql`
    mutation AddCompanyPhone($company_id: ID!,$input: CompanyPhoneInput!){
        AddCompanyPhone(company_id: $company_id, input: $input ){
            success,
            id
        }
    }`;


        
    public static deletePhone = gql`
    mutation DeleteCompanyPhone($company_id: ID!,$id: ID!){
        DeleteCompanyPhone(company_id: $company_id, id: $id ){
            success
        }
    }`;
    public static changePhone = gql`
    mutation ChangeCompanyPhone($company_id:ID!,$changes:ChangingCompanyPhoneInput!){
        ChangeCompanyPhone(company_id: $company_id, changes: $changes ){
            success
        }
    }`;
        
    public static addAddress = gql`
    mutation AddCompanyAddress($company_id: ID!,$input: CompanyAddressInput!){
        AddCompanyAddress(company_id: $company_id, input: $input ){
            id
            success
        }
    }`;
        
    public static editAddress = gql`
    mutation ChangeCompanyAddress($company_id: ID!,$changes: ChangingCompanyAddressInput!){
        ChangeCompanyAddress(company_id: $company_id, changes: $changes ){
            success
        }
    }`;
        
    public static deleteAddress = gql`
    mutation DeleteCompanyAddress($company_id: ID!,$id: ID!){
        DeleteCompanyAddress(company_id: $company_id, id: $id ){
            success
        }
    }`;
   
   
    public static addWebsite = gql`
    mutation AddCompanyWebsite($company_id: ID!,$website: String!){
        AddCompanyWebsite(company_id: $company_id, website: $website ){
            id
            success
        }
    }`;
   
    public static editWebsite = gql`
    mutation ChangeCompanyWebsite($company_id: ID!,$changes: ChangingCompanyWebsiteInput!){
        ChangeCompanyWebsite(company_id: $company_id, changes: $changes ){
            success
        }
    }`;

    public static deleteWebsite = gql`
    mutation DeleteCompanyWebsite($company_id: ID!,$id: ID!){
        DeleteCompanyWebsite(company_id: $company_id, id: $id ){
            success
        }
    }`;
    
    
    public static changePURL = gql`
    mutation ChangeCompanyUrl($company_id: ID!,$url: String!){
        ChangeCompanyUrl(company_id: $company_id, url: $url ){
            success
        }
    }`;

    public static deactivateAccount = gql`
    mutation  DeactivateCompany($company_id: ID!,$password: String!){
        DeactivateCompany(company_id: $company_id, password: $password ){
            success
        }
    }`;

    public static ChangeCompanyCover = gql`
        mutation ChangeCompanyCover($company_id:ID! $cover:String){
            ChangeCompanyCover(company_id: $company_id cover:$cover,){
            id
            success
            }
        }
    `;

    
    public static ChangeCompanyNotificationsSetting = gql`
      mutation ChangeCompanyNotificationsSetting($company_id:String! $property:CompanyNotificationOptions! $value:Boolean!){
        ChangeCompanyNotificationsSetting(company_id:$company_id  property:$property ,value:$value){
          id
          success
        }
      }
    `;

    public static getCompanyNotificationSetting = gql`
      query getCompanyNotificationSetting($company_id:ID!){
        getCompanyNotificationSettings(company_id:$company_id){
          new_follow
          new_review
          new_applicant
        }
      }
    `
    public static checkIfURLForCompanyIsTaken = gql`
     query  CheckIfURLForCompanyIsTaken($url:String!){
        CheckIfURLForCompanyIsTaken(url:$url)
             
     }
    
    `
    public static getCompanyAdmins = gql`
    query GetCompanyAdmins($company_id:ID!){
           GetCompanyAdmins(company_id:$company_id){
            role,
            user{
           id,
           firstname,
           lastname,
           avatar,
           skills(first: 1){
            name
            },
            experiences(first: 1){
                title
            },
            me
         }
       }
    }
 `
}
