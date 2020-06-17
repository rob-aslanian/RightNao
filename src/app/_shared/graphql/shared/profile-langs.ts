import gql from 'graphql-tag';



export class graphqlProfileLangs {

    ////////// USER //////////
    public static SaveProfileTranslation = gql`
    mutation SaveProfileTranslation(
        $languageID:String!
        $translations:ProfileTranslationInput!
        
      ){
        SaveProfileTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      }
    `;

    public static SaveUserExperienceTranslation = gql`
    mutation SaveUserExperienceTranslation(
        $languageID: String!
          $translations: ExperienceTranslationInput!
      ) {
        SaveUserExperienceTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      } 
    `;

    public static SaveUserEducationTranslation = gql`
    mutation SaveUserEducationTranslation(
        $languageID: String!
          $translations: EducationTranslationInput!
      ) {
        SaveUserEducationTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      }
    `;

    public static SaveUserInterestTranslation = gql`
    mutation SaveUserInterestTranslation(
        $languageID: String!
          $translations: InterestTranslationInput!
      ) {
        SaveUserInterestTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      }       
    `;


    public static SaveUserPortfolioTranslation = gql`
    mutation SaveUserPortfolioTranslation(
        $languageID: String!
          $translations: PortfolioTranslationInput!
      ) {
        SaveUserPortfolioTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      }
    `;

    public static SaveUserToolTechnologyTranslation = gql`
    mutation SaveUserToolTechnologyTranslation(
        $languageID: String!
          $translations: ToolTechnologyTranslationInput!
      ) {
        SaveUserToolTechnologyTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      }
    `;

    public static SaveUserSkillTranslation = gql`
    mutation SaveUserSkillTranslation(
        $languageID: String!
          $translations: SkillTranslationInput!
      ) {
        SaveUserSkillTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      }
    `;


    public static SaveUserAccomplishmentTranslation = gql`
    mutation SaveUserAccomplishmentTranslation(
        $languageID: String!
          $translations: AccomplishmentTranslationInput!
      ){
        SaveUserAccomplishmentTranslation(languageID:$languageID translations:$translations){
          id
          success
        }
      }
    `;

    ////////// USER //////////


    ////////// COMPANY //////////
    public static SaveCompanyProfileTranslation = gql`
    mutation SaveCompanyProfileTranslation(
        $company_id: ID!
          $translations: CompanyProfileTranslationInput!
      ) {
        SaveCompanyProfileTranslation(company_id:$company_id translations:$translations){
          id
          success
        }
      }      
    `;

    public static SaveCompanyMilestoneTranslation = gql`
    mutation SaveCompanyMilestoneTranslation(
        $company_id: ID!
          $languageID: String!
          $translations: MilestoneTranslationInput!
      ) {
        SaveCompanyMilestoneTranslation(company_id:$company_id translations:$translations languageID:$languageID){
          id
          success
        }
      }      
    `;


    public static SaveCompanyAwardTranslation= gql`
    mutation SaveCompanyAwardTranslation(
        $company_id: ID!
          $languageID: String!
          $translations: AwardTranslationInput!
      ) {
        SaveCompanyAwardTranslation(company_id:$company_id languageID:$languageID translations:$translations ){
          id
          success
        }
      }`;


    ////////// COMPANY //////////


}