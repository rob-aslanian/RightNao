import gql from 'graphql-tag';


const QUALIFICATIONS = `
    experience
    languages{
    language
    rank
    }
    tools{
    tool
    rank
    }
    skills
    license
    education
    work
`;

const GET_JOBS = `
        id
        user_id
        status
        number_of_applications
        number_of_views
        is_saved
        is_applied
        application{
            email
            phone
            created_at
            documents{
            id
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
        company{
            id
            url
            name
            avatar
            industry{
            id
            }
            type
            
        }
        job_meta{
            amount_of_days
            highlight
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
            additional_compensation
            additional_info{
                travel_requirement
                suitable_for
            }
            salary_currency
            salary_min
            salary_max
            salary_interval
            benefits
            number_of_positions
            required { ${QUALIFICATIONS} }
            preterred{ ${QUALIFICATIONS} }
            files{
                id
                name
                address
                mime_type
            }
            publish_day
            publish_month
            publish_year
            header_url
        }

`;


export class graphqlJobForUser{
    public static SetCareerInterests = gql`
        mutation SetCareerInterests($interests:CareerInterestsInput!) {
            SetCareerInterests(interests:$interests)
        }
    `;

    public static getProfileForJobMatcher = gql`
    query getProfileByID($user_id:String!) {
      getProfileByID(user_id:$user_id){
        toolsTechnologies(first:10){
          tool_Technology
          rank
        },
        educations(first: 10){
           id,
           degree,
        },
       
        skills(first: 10){
           id,
           name,
        },
        languages(first: 10){
          id,  
          language,
          rate
        }
      }
    }`;

    public static GetRecommendedJobs = gql`
        query GetRecommendedJobs( $pagination:PaginationInput! )
        {
            GetRecommendedJobs(pagination:$pagination)
            {
            id
            user_id
            status
            company{
                id
                url
                name
                avatar
                industry{
                 id
                }
                type
                
            }
            number_of_applications
            number_of_views
            is_saved
            job_meta{
                amount_of_days
                highlight
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
                additional_compensation
                additional_info{
                    travel_requirement
                    suitable_for
                }
                descriptions{
                    language
                    description
                    why_us
                }
                salary_currency
                salary_min
                salary_max
                salary_interval
                benefits
                number_of_positions
                required { ${QUALIFICATIONS} }
                preterred{ ${QUALIFICATIONS} }
                publish_day
                publish_month
                publish_year
                header_url
            }
        }
            
        }
    `;

    public static GetSavedJobs = gql`
    query GetSavedJobs{
        GetSavedJobs(pagination:{first:999}){
            ${GET_JOBS}
      }
    }
    
    `;

    public static GetAppliedJobs = gql`
        query GetAppliedJobs{
            GetAppliedJobs(pagination:{first:999}){
                ${GET_JOBS}      
            }
        }
    `;

    public static GetSkippedJobs = gql`
    query GetSkippedJobs{
        GetSkippedJobs(pagination:{first:999}){
            ${GET_JOBS}
        }
      }
    `;

    public static getInvitedJobs = gql`
    query GetInvitedJobs{
        GetInvitedJobs(pagination:{first:99}){
            ${GET_JOBS}
            text_invitation
        }
      }
    `

    public static getAllJob = gql`
        query getAllJobs($keywords: [String!] $country:[ID!]) {
            searchJobs
            (
            input:{
                keywords:$keywords
                company_size:size_unknown
                date_posted:anytime
                experience_level:experience_unknown
                with_salary:false,
                without_cover_letter:false
                is_following:false
                period:Any,
                country:$country
            }
            pagination:{
                first:999
            }
            )
            {
            job_search_result{
                id
                is_saved
                is_applied
                company{
                    id
                    url
                    name
                    avatar
                    industry{
                        id
                    }
                    follow
                    
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
                    salary_currency
                    salary_min
                    salary_max
                    salary_interval
                    benefits
                    number_of_positions
                    files{
                        id
                        name
                        address
                        mime_type
                    }
                    required { ${QUALIFICATIONS} }
                    preterred{ ${QUALIFICATIONS} }
                    publish_day
                    publish_month
                    publish_year
                    header_url
                }
            }
            amount_of_results
            }
        }
    `;

    public static GetJobProfile = gql`
        query GetJobProfile {
            GetJobProfile{
            is_open
            is_saved
            career_interests{
                salary_min
                jobs
                industry
                subindustry
                company_size
                job_types
                salary_currency
                salary_min
                salary_max
                salary_interval
                relocate
                remote
                travel
                experience
                suitable_for
                cities{
                    id
                    city
                    subdivision
                    country
                }
                
            }
            }
        }
    `;


    public static ApplyJob = gql`
        mutation ApplyJob($application: ApplicationInput!){
            ApplyJob(application:$application)
        }
    
    `;

    public static getUserProfile = gql`
        query getProfile($url:String!){
            getProfile(url:$url){
            id
            avatar
            url
            firstname
            lastname
            emails
            phones
            experiences{
                title
                company
                
            }
            profile_complete_percent
            }
        }
    `;

    public static ReportJob = gql`
        mutation ReportJob($jobId: ID! $type: ReportJobEnum! $text: String!) {
            ReportJob(jobId:$jobId text:$text type:$type)
        }
    `;

    public static SkipJob = gql`
        mutation SkipJob($jobId:ID!){
            SkipJob(jobId:$jobId)
        }
    `;

    public static UnskipJob = gql`
        mutation UnskipJob($jobId:ID!){
            UnskipJob(jobId:$jobId)
        }
    `;

    public static SaveJob = gql`
        mutation SaveJob($jobId:ID!) {
            SaveJob(jobId:$jobId)
        }
    `;

    public static UnsaveJob = gql`
        mutation UnsaveJob($jobId:ID!) {
            UnsaveJob(jobId:$jobId)
        }
      
    `;

    public static SetOpenFlag = gql`
        mutation SetOpenFlag($open:Boolean!) {
            SetOpenFlag(open:$open)
        }
    `;

    public static FollowCompany = gql`
    mutation FollowCompany($companyId: String!) {
      FollowCompany(companyId: $companyId)
    }
  `;

  public static UnfollowCompany = gql`
    mutation UnfollowCompany($companyId:String!) {
      UnfollowCompany(companyId:$companyId)
        
    }
  `;
    
}