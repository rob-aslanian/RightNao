export interface IProfileTranslation {
    profileId?:string;
    type?: profile;
    activeLang?:string;
    langs?:string[]; 
}

type profile = 'company' | 'user';


//// User ////
export interface IUserProfileTranslation {
    firstname?: string;
    lastname?: string;
    headline?: string;
    nickname?: string;
    story?   : string
}


export interface IUserExperienceTranslation {
    experience_id?: string;
    position?: string
    company?: string
    description?: string
}


export interface IUserEducationTranslation {
    education_id?: string
    school?: string;
    degree?: string;
    field_of_study?: string;
    grade?: string;
    description?: string;
}

export interface IUserInterestTranslation {
    interest_id?: string;
    interest?: string;
    description?: string;  
}

export interface IUserPortfolioTranslation {
    portfolio_id?: string;
    tittle?: string;
    description?: string;  
}

export interface IUserToolsTranslation {
    tool_technology_id?: string;
    tool_technology?: string; 
}

export interface IUserSkillTranslation {
    skill_id?:string;
    skill?: string;
}

export interface IUserAccomplishmentTranslation {
    accomplishment_id?: string;
    name?: string;
    issuer?: string;
    description?: string;
}


//// Company ////

export interface ICompanyProfileTranslation {
    language?: string;
    name?: string;
    mission?: string;
    description?: string;
}

export interface ICompanyAwardTranslation {
    award_id?: string;
    title?: string;
    issuer?: string;
}

export interface ICompanyMilestoneTranslation {
    milestone_id?: string;
    title?: string;
    description?: string;
}