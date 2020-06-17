export interface ICompanyProfile{
    avatar?: string;
    country_id?: string;
    id?: string;
    name?: string;
    url?: string;
    industry?:string;
    lang?:string;
    has_vOffice?:boolean;
    career_center?:ICareerCenter;
}

export interface ICareerCenter {
    title?: string;
    description?: string;
    cv_button_enabled?: boolean;
    custom_button_enabled?: boolean;
    custom_button_title?: string;
    custom_button_url?: string;
}