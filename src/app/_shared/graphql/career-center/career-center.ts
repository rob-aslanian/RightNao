import gql from 'graphql-tag';

const GET_CANDIDATE = `
    career_interests{
      jobs
      industry
      job_types
      company_size
      experience
      salary_min
      salary_max
      salary_currency
      salary_interval
      suitable_for
      remote
      travel
      relocate
      cities{
        id
        city
        subdivision
        country
      }
      is_invited
      is_saved
    }
    user{
      id
      avatar
      url
      firstname,
      lastname,
      nickname,
      middlename,
      headline,
      birthday,
      phone,
      story,
      location{
        city
        country
      }
      email
      skills(first:999){
        name
      }
      accomplishments(first:999) {
        id
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
      experiences(first:999){
        title
        company
        start_date
        finish_date
        currently
        description
        location{
          city{
            id
            city
            country
          }
          country{
            id
            country
          }
        }
      }
      educations(first:999){
        school
        degree
        start_date
        finish_date
        currently_study
      }
      languages(first:999){
        language
        rate
      }
      interests(first:999){
        interest 
      }
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
      
    }

`;

export class graphqlCareerCenter {


    // ... Mutations ... // 
        public static openCareerCenter = gql`
        mutation openCareerCenter($company_id: ID! $input: OpenCareerCenterInput!) {
            openCareerCenter(
            company_id: $company_id
            input: $input
            )
        }`;


        public static addCVInCareerCenter = gql`
        mutation addCVInCareerCenter($company_id: ID! $options: AddCVInCareerCenterInput!){
            addCVInCareerCenter(
            company_id: $company_id
            options: $options
            )
        }`;

        public static MakeFavoriteCVs = gql`
        mutation MakeFavoriteCVs($companyId: ID! $ids: [ID!]! $is_favourite: Boolean!){
            MakeFavoriteCVs(
            companyId:$companyId
            ids: $ids
            is_favourite: $is_favourite
            )
        }`;

        public static RemoveCVs = gql`
        mutation RemoveCVs($companyId: ID! $ids: [ID!]! ) {
            RemoveCVs(
            companyId:$companyId
            ids: $ids
            )
        }`;
   // ... Mutations ... // 


   // ... Quiries  ... // 
        public static GetSavedCVs = gql`
        query GetSavedCVs($companyId: ID! $pagination: PaginationInput){
            GetSavedCVs(
              companyId: $companyId
              pagination:$pagination
            ){
              ${GET_CANDIDATE}
              user_id
              is_open
              is_saved
            }
        }`;


        public static getCompanyProfile = gql`
        query GetCompanyProfileByID($company_id: ID!) {
           GetCompanyProfileByID(company_id: $company_id){
                 id
                 url
                 name
                 avatar
                 my_role
                 follow
                 career_center{
                    title
                    description
                    cv_button_enabled
                    custom_button_enabled
                    custom_button_title
                    custom_button_url
                  }


           }
        }`;

   // ... Quiries  ... // 



}
