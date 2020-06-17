import { weekDays, CompanySizeType, CompanyTypeType } from "src/app/company/company-account/general/models/generalInfo.interface";
import { ratingModel } from "src/app/_shared/components/company/write-review/Models/model";
import { DatePostedType, CareerInterestType, SalaryIntervalType } from "src/app/jobs/models/userJobs.model";
import { LocationType, DeliverTimeType, ProjectType, PriceType, ServiceOwnerType, WeekDayType, RealEstateDealType, RealEstatePropertyType, RealEstateMetricType, RealEstateTypeOfProperty, RealEstateOutdoorFeatureType, RealEstateIndoorFeatureType, RealEstateClimatControlType, RealEstateStatusType } from "./search.model";

export interface ISearchLeftModel {
    title?:string;
    form_names?:string[];
    models?:any;
    childrens?:ISearchLeftModel[]
};

export interface ISearchUser {
    keywords?: string[];
    isMyConnection?: boolean;
    conenctionsOf?: string[];
    country?: string[];
    city?: string[];
    school?: string[];
    degree?: string[];
    filedOfStudy?: string[];
    isStudent?: boolean;
    currentCompany?: string[];
    pastCompany?: string[];
    industry?: string[];
    position?: string[];
    firstname?: string[];
    lastname?: string[];
    nickname?: string[];
    isMale?: boolean;
    isFemale?: boolean;
    minAge?: number;
    maxAge?: number;
    skill?: string[];
    language?: string[];
    interest?: string[];
    full_name?: string;

    filter_name?:string;
    __typename?:string;
}


export interface ISearchCompany {
    keywords?: string[];
    search_for_companies?: boolean;
    search_for_organizations?: boolean;
    with_jobs?: boolean;
    name?: string[];
    city?: string[];
    country?: string[];
    industry?: string[];
    subindustry?: string[];
    size?: CompanySizeType,
    type?: CompanyTypeType;
    rating?: ratingModel[];
    business_hours?: weekDays[];
    founders_id?: string[];
    founders_name?: string[];
    is_career_center_opened?:boolean;

    filter_name?:string;
    __typename?:string;
}

export interface ISearchJob {
    keywords?: string[];
    date_posted?: DatePostedType,
    experience_level?: CareerInterestType,
    degree?: string[];
    country?: string[];
    city?: string[];
    job_type?: string[];
    language?: string[];
    industry?: string[];
    subindustry?: string[];
    company_name?: string[];
    company_size?: CompanySizeType;
    currency?: String
    period?: SalaryIntervalType,
    min_salary?: number;
    max_salary?: number;
    skill?: string[];
    is_following?: boolean;
    without_cover_letter?: boolean;
    with_salary?: boolean;
    company_ids?: string[];

    filter_name?:string;
    __typename?:string;
}


export interface ISearchCandidate {
    keywords?:string[];
    country?: string[];
    city?: string[];
    current_company?:string[];
    past_company?:string[];
    industry?:string[];
    sub_industry?:string[];
    experience_level?: CareerInterestType,
    job_type?:string[];
    skill?:string[];
    language?: string[];
    school?:string[];
    degree?:string[];
    field_of_study?:string[];
    is_student?: boolean;
    currency?: String
    period?: SalaryIntervalType,
    min_salary?: number;
    max_salary?: number;
    is_willing_to_travel?: boolean;
    is_willing_to_work_remotly?: boolean;
    is_possible_to_relocate?: boolean;

    filter_name?:string;
    __typename?:string;
}

export interface ISearchService {
    keywords?:string[];
    country?: string[];
    location_type?: LocationType,
    delivery_time?: DeliverTimeType,
    price?:PriceType,
    city?: string[];
    skill?:string[];
    currency?: String;
    fixed_price_amount?:number;
    min_salary?: number;
    max_salary?: number;
    is_always_open?:boolean;
    week_days?:WeekDayType[];
    hour_from?:string;
    hour_to?:string;

    services_ownwer?:ServiceOwnerType,

    filter_name?:string;
    __typename?:string;
}


export interface ISearchServiceRequest {
    keywords?:string[];
    country?: string[];
    location_type?: LocationType,
    delivery_time?: DeliverTimeType,
    project_type?:ProjectType[];
    price?:PriceType,
    city?: string[];
    skill?:string[];
    tool?:string[];
    language?:string[];
    currency?: String;
    fixed_price_amount?:number;
    min_salary?: number;
    max_salary?: number;
    services_ownwer?:ServiceOwnerType,

    filter_name?:string;
    __typename?:string;
}

export interface ISearchRealEstateRequest {
    keywords?:string[];
    country?: string[];
    city?: string[];
    deal_type?:RealEstateDealType,
    property_type?:RealEstatePropertyType,
    metrict_type?: RealEstateMetricType
    min_size?: number;
    max_size?: number;
    type_of_property?: RealEstateTypeOfProperty[];
    badrooms?: number;
    bathrooms?: number;
    floor_from?: number;
    floor_to?: number;
    floors?: number;
    car_spaces?: number;
    rooms?: number;
    purchase?: number;
    min_price?: number;
    max_price?: number;
    fix_price?: number;
    currency?: string;
    availability_from?: string;
    availability_to?: string;
    outdoor_features?:RealEstateOutdoorFeatureType[];
    indoor_features?:RealEstateIndoorFeatureType[];
    climat_control?:RealEstateClimatControlType[];
    status?:RealEstateStatusType[];
    additional_filters?: any[];
    layout?: any[];
    building_use?: any[];
    commercial_properties?: any[];
    commercial_locations?: any[];
    type_of_land?: any[];
    who_live?: any[];
    timing?: any;
    services?: any[];
    location_type?: any[];
    materials?: any[];
    publication_date?: any;
    by_reposssed?: boolean;
    by_agent?: boolean;
    by_user?: boolean;

    filter_name?:string;
    __typename?:string;
}

export interface IPagination {
    first?: number;
    after?: string;
}