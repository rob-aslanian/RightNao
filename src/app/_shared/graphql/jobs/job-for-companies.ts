
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

const GET_JOB = `
      id
      status
      user_id
      is_saved
      is_applied
      number_of_applications
      number_of_views
      job_meta{
        advertisement_countries
        renewal
        amount_of_days
        anonymous
        num_of_languages
        currency
      }
      job_details{
        title
        country
        location{
          id
          city
          subdivision
          country
        }
        job_functions
        employment_types
        descriptions{
          language
          description
          why_us
        }
        files{
          id
          name
          address
          mime_type
        }
        salary_currency
        salary_min
        salary_max
        salary_interval
        benefits
        number_of_positions
        publish_day
        publish_month
        publish_year
        deadline_day
        deadline_month
        deadline_year
        hiring_day
        hiring_month
        hiring_year
        cover_letter
        header_url
      }
      job_meta{
        advertisement_countries
        amount_of_days
        anonymous
        num_of_languages
        currency
      }
`;

export class graphqlJobForCompany {

    public static getCandidate = gql`
    query searchCandidate($input: SearchCandidateQuery!){
        searchCandidate(input: $input, pagination: {first:9}) {
            amount_of_results
            candidate_search_result{
              ${GET_CANDIDATE}
            }
        }
    }
  `;


  public static getAllCandidate = gql`
    query getAllCandidate($keywords: [String!]) {
      searchCandidate(
        input:{
          keywords:$keywords
          experience_level:experience_unknown,
          is_student:false,
          is_willing_to_travel:false
          is_willing_to_work_remotly:false
          is_possible_to_relocate:false
          period:Any
        }
        pagination:{first:3}
      ){
        candidate_search_result{
          ${GET_CANDIDATE}
        }
        amount_of_results
      }
    }
  `;

    public static inviteUserToApply = gql`
    mutation InviteUserToApply($companyId: ID!, $userId: ID!, $jobId: ID!, $text: String!){
        InviteUserToApply(companyId: $companyId, userId: $userId, jobId: $jobId, text: $text)
    }
  `;

    public static getPostedJobs = gql`
    query GetPostedJobs($companyId: ID!){
        GetPostedJobs(companyId: $companyId){
            id
            job_details {
                title      
            }
        }
    }
  `;

    public static skipCandidate = gql`
    mutation SkipCandidate($companyId: ID!, $candidateId: ID!){
        SkipCandidate(companyId: $companyId, candidateId: $candidateId)
    }
  `;

    public static unskipCandidate = gql`
    mutation UnskipCandidate($companyId: ID!, $candidateId: ID!){
        UnskipCandidate(companyId: $companyId, candidateId: $candidateId)
    }
  `;

    public static saveCandidate = gql`
    mutation SaveCandidate($companyId: ID!, $candidateId: ID!){
        SaveCandidate(companyId: $companyId, candidateId: $candidateId)
    }
  `;

    public static unsaveCandidate = gql`
    mutation UnsaveCandidate($companyId: ID!, $candidateId: ID!){
        UnsaveCandidate(companyId: $companyId, candidateId: $candidateId)
    }
  `;

    public static saveCandidateSearchFilter = gql`
    mutation SaveCandidateSearchFilter($companyId: ID!, $name: String!, $filter: CandidateSearchFilterInput!){
        SaveCandidateSearchFilter(companyId: $companyId, name: $name, filter: $filter)
    }
  `;

    public static getSavedCandidateSearchFilters = gql`
    query GetSavedCandidateSearchFilters($companyId: ID!){
        GetSavedCandidateSearchFilters(companyId: $companyId){
            id
            name
            filter {
                keyword
                country
                city
                current_company
                past_company
                industry
                sub_industry
                experience_level
                job_type
                skill
                language
                school
                degree
                field_of_study
                is_student
                currency
                period
                min_salary
                max_salary
                is_willing_to_travel
                is_willing_to_work_remotly
                is_possible_to_relocate
            }
        }
    }
  `;

    public static saveCandidateAlert = gql`
    mutation SaveCandidateAlert($companyId: ID!, $name: String!, $interval: String!, $notify_email: Boolean!, 
                                $notify_notification: Boolean!, $filter: CandidateSearchFilterInput!){
        SaveCandidateAlert(companyId: $companyId, name: $name, interval: $interval, notify_email: $notify_email, 
            notify_notification: $notify_notification, filter: $filter)
    }
  `;

    public static updateCandidateAlert = gql`
  mutation UpdateCandidateAlert($companyId: ID!, $alertId: ID!, $name: String!, $interval: String!, $notify_email: Boolean!, 
                              $notify_notification: Boolean!, $filter: CandidateSearchFilterInput!){
      UpdateCandidateAlert(companyId: $companyId, alertId: $alertId, name: $name, interval: $interval, notify_email: $notify_email, 
          notify_notification: $notify_notification, filter: $filter)
  }
`;

    public static deleteCandidateAlert = gql`
  mutation DeleteCandidateAlert($companyId: ID!, $alertId: ID!){
      DeleteCandidateAlert(companyId: $companyId, alertId: $alertId)
  }
`;

    public static getSkippedCandidates = gql`
    query GetSkippedCandidates($companyId: ID!, $first: Int, $after: Int){
        GetSkippedCandidates(companyId: $companyId, first: $first, after: $after) {
            user_id,
            is_open,
            is_saved
            ${GET_CANDIDATE}
        }
    }
  `;

    public static getSavedCandidates = gql`
    query GetSavedCandidates($companyId: ID!, $first: Int, $after: Int){
        GetSavedCandidates(companyId: $companyId, first: $first, after: $after) {
          user_id,
          is_open,
          is_saved
          ${GET_CANDIDATE}
        }
    }
  `;

    public static getCandidateAlerts = gql`
    query GetCandidateAlerts($companyId: ID!){
        GetCandidateAlerts(companyId: $companyId){
            id
            name
            interval
            notify_email
            notify_notification
            filter {
                keyword
                country
                city
                current_company
                past_company
                industry
                sub_industry
                experience_level
                job_type
                skill
                language
                school
                degree
                field_of_study
                is_student
                currency
                period
                min_salary
                max_salary
                is_willing_to_travel
                is_willing_to_work_remotly
                is_possible_to_relocate
            }
        }
    }
  `;

  public static getPricingFor = gql`
    query GetPricingFor($companyId: ID!, $meta: JobMetaInput!){
        GetPricingFor(companyId: $companyId, meta: $meta){
            total
            currency
            countries {
                country
                plan_price
                renewal_price
                publish_anonymously_price
                language_price
                total_price
            }
        }
    }
  `;

  public static GetPlanPrices = gql`
    query GetPlanPrices($company_id:ID! $countries: [String!]! $currency: String!) {
        GetPlanPrices(
        company_id: $company_id
        countries: $countries
        currency: $currency
        ){
        country
        currency
        price_per_plan{
            basic
            start
            standard
            professional
            professionalPlus
            exclusive
            premium
        }
        features{
            anonymously
            language
            renewal
        }
        }
    }
  `;

  public static GetAmountOfApplicantsPerCategory = gql`
    query GetAmountOfApplicantsPerCategory($company_id:ID!){
        GetAmountOfApplicantsPerCategory(company_id:$company_id){
            total
            unseen
            in_review
            favorite
            disqualified
        }
    }
  `;

  public static  GetListOfJobsWithSeenStat = gql`
    query GetListOfJobsWithSeenStat($company_id:ID!){
        GetListOfJobsWithSeenStat(
        company_id:$company_id
        pagination:{
        first: 50
        }){
            id
            title
            total_amount
            unseen_amount
            status
        }
    }
  `;

  public static PostJob = gql`
    mutation PostJob($companyId:String! $details: JobDetailsInput! $meta: JobMetaInput!){
        PostJob(companyId:$companyId details:$details meta:$meta){
        id
        success
        }
    }
  `;

  public static SaveDraft = gql`
  mutation SaveDraft($companyId:String! $details: JobDetailsInput! $meta: JobMetaInput!){
    SaveDraft(companyId:$companyId details:$details meta:$meta){
      id
      success
    }
}
  
  `

    public static GetJobForCompany = gql`
    query GetJobForCompany($companyId: ID! $jobId: ID!){
      GetJobForCompany(companyId:$companyId jobId:$jobId){
        ${GET_JOB}
        
      }
    }
  `;

    public static GetJob = gql`
    query GetJob($jobId: ID!) {
      GetJob(jobId:$jobId){
        ${GET_JOB}
      }
    }
    `;

  public static GetPostedJobs = gql`
  query GetPostedJobs($companyId:ID!) {
    GetPostedJobs(companyId:$companyId){
      ${GET_JOB}
    }
  }
  
  `;

  public static ActivateJob = gql`
    mutation ActivateJob($companyId:String! $jobId:String!){
        ActivateJob(companyId:$companyId jobId:$jobId)
    }
  `;

  public static PauseJob = gql`
    mutation PauseJob($companyId:String! $jobId:String!){
        PauseJob(companyId:$companyId jobId:$jobId)
    }
  `;


  public static GetJobApplicants = gql`
  query GetJobApplicants($companyId:String! $jobId:String!){
    GetJobApplicants
         (companyId:$companyId
          jobId:$jobId
          pagination:{first:999}
        ){
      userId
       ${GET_CANDIDATE}
      application{
        email
        phone
        documents{
          name
          address
          mime_type
        }
        cover_letter
        metadata{
          seen
          category
        }
      }
    }
  }
  `;

  public static SetJobApplicationCategory = gql`
    mutation SetJobApplicationCategory(
      $companyId:ID!
      $jobId: ID!
      $applicationId: ID!
      $category: ApplicantCategoryEnum!
    ){
      SetJobApplicationCategory(
        companyId: $companyId
        jobId: $jobId
        applicationId: $applicationId
        category: $category
      )
    } 
  `;
  public static SetJobApplicationSeen = gql`
  mutation SetJobApplicationSeen(
    $companyId:ID!
    $jobId: ID!
    $applicationId: ID!
    $seen: Boolean!
  ){
    SetJobApplicationSeen(
      companyId: $companyId
      jobId: $jobId
      applicationId: $applicationId
      seen: $seen
    )
  }    
  `;

  public static ChangePost = gql`
    mutation ChangePost($companyId: String! $draftId: String! $details: JobDetailsInput!){
      ChangePost(companyId:$companyId draftId:$draftId details:$details){
        id
        success
      }
    }
  
  `;
  
  public static ChangeDraft = gql`
  mutation ChangeDraft($companyId: String! 
        $draftId: String! 
        $details: JobDetailsInput!
        $meta: JobMetaInput!){
        ChangeDraft(companyId:$companyId draftId:$draftId details:$details meta:$meta){
          id
          success
        }
    }
  
  `;



  


}