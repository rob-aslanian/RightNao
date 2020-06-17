import gql from 'graphql-tag';


export class graphQlAccomplishment {
    
    public static AddAccomplishmentCertification = gql`
        mutation AddAccomplishmentCertification($input:CertificationInput!){
            AddAccomplishmentCertification(input:$input){
                id
                success
            }
        }
    `;

    public static ChangeAccomplishmentCertification = gql`
        mutation ChangeAccomplishmentCertification($id:ID!, $accomplishment: ChangingCertificationInput!){
            ChangeAccomplishmentCertification(id:$id , accomplishment:$accomplishment){
                id,
                success
            }
        }
    `;

    public static ChangeAccomplishmentLicense = gql`
        mutation ChangeAccomplishmentLicense($id:ID!, $accomplishment: ChangingLicenseInput!){
            ChangeAccomplishmentLicense(id:$id , accomplishment:$accomplishment){
                id,
                success
            }
        }
    `;
    
    public static ChangeAccomplishmentAward  = gql`
        mutation ChangeAccomplishmentAward($id:ID!, $accomplishment: ChangingAwardInput!){
            ChangeAccomplishmentAward(id:$id , accomplishment:$accomplishment){
                    id,
                    success
                }
        }
    `;

    public static ChangeAccomplishmentProject = gql`
        mutation ChangeAccomplishmentProject($id:ID!, $accomplishment: ChangingProjectInput!){
            ChangeAccomplishmentProject(id:$id , accomplishment:$accomplishment){
                    id,
                    success
                }
        }
    `;

    public static ChangeAccomplishmentPublication = gql`
        mutation ChangeAccomplishmentPublication($id:ID!, $accomplishment: ChangingPublicationInput!){
            ChangeAccomplishmentPublication(id:$id , accomplishment:$accomplishment){
                    id,
                    success
                }
        }
    `;

    public static ChangeAccomplishmentTest = gql`
        mutation ChangeAccomplishmentTest($id:ID!, $accomplishment: ChangingTestInput!){
            ChangeAccomplishmentTest(id:$id , accomplishment:$accomplishment){
                    id,
                    success
                }
        }
    `;


    public static AddAccomplishmentLicense = gql`
        mutation AddAccomplishmentLicense($input:LicenseInput!){
            AddAccomplishmentLicense(input:$input){
             id
             success
            }
        }
    `;

    public static AddAccomplishmentAward = gql`
        mutation AddAccomplishmentAward($input:AwardInput!){
            AddAccomplishmentAward(input:$input){
                id
                success
            }
        }
    `;

    public static AddAccomplishmentProject = gql`
        mutation AddAccomplishmentProject($input: ProjectInput!){
            AddAccomplishmentProject(input:$input){
            id
            success
            }
        }
    `;

    public static AddAccomplishmentPublication = gql`
        mutation AddAccomplishmentPublication($input: PublicationInput!){
            AddAccomplishmentPublication(input:$input){
                id
                success
            }
        }  
    `;

    public static AddAccomplishmentTest = gql`
        mutation AddAccomplishmentTest($input:TestInput!){
            AddAccomplishmentTest(input:$input){
                id
                success
            }
        }   
    `;

    public static DeletAccomplishment = gql`
        mutation RemoveAccomplishment($id:ID!){
            RemoveAccomplishment(id:$id){
                success
            }
        }
    `

    public static GetAccomplishment = gql`
        query getProfile($url:String!  , $lang:String){
            getProfile(url:$url , lang:$lang) {
                id
                me
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
            }
        }
    `;

    public static RemoveAccomplishment = gql`
        mutation($id:ID!){
            RemoveAccomplishment(id:$id){
                id
                success
            }
        }
    `

}