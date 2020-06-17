import { IFile } from "../files.interface";

export interface IJob{
    companyId?: string;
    details?: IJobDetails;
    meta?: IJobMeta;
}

export interface IJobDetails {
    title?:string;
    country?: string;
    region?: string;
    location_type?:JobLocationType;
    city?: string;
    _city?:string;
    job_functions?: string[];
    employment_types?: JobType[];
    descriptions?: IJobDescription[];
    salary_currency?: string;
    required?:IJobQualification;
    preterred?:IJobQualification;
    salary_min?: number;
    salary_max?: number;
    salary_interval?: SalaryType;
    benefits?: BenefitType[];
    number_of_positions?: number;
    additional_compensation?:JobAdditionalCompensationType;
    additional_info?:IJobAdditionalInfo;
    cover_letter?: boolean;
    is_willing_to_work_remotly?: boolean;
    header_url?: string;
    files:IFile[];

    _files:IFile[];
}

export interface IJobMatcher {
    required?:IJobQualification;
    preterred?:IJobQualification;
}


export interface IJobQualification {
    experience?:string,
    languages?:IJobQualificationLanguage[],
    tools?:IJobQualificationTool[],
    skills?:string[],
    license?:string,
    education?:string[],
    work?:string;

    _type?:string;

}

export  interface IJobQualificationLanguage {
    language?:string,
    rank?:string;
}
export  interface IJobQualificationTool {
    tool?:string,
    rank?:string;
}


export interface IJobDescription  {
    language?: string;
    description?: string;
    why_us?: string;
}

export interface IJobAdditionalInfo {
    travel_requirement?:JobTraverlRequirementType;
    suitable_for?:JobSuitableForType;
}



export interface IJobMeta {
    advertisement_countries?: string[];
    renewal?: number;
    job_plan?: JobPlanType;
    anonymous?: boolean;
    num_of_languages?: number;
    currency?: string;
    highlight?:JobHighlightType;
    amount_of_days?:number;
}


export type JobSpecialOffersType = 'none' | 'travel' | 'relocation_package';

export type JobTraverlRequirementType = 'none' | 'all_time' | 'once_week' | 'once_month' |
                                        'few_times' | 'once_year'

export type JobSuitableForType = 'none' | 'student' | 'person_with_a_disability' |
                                 'single_parent';

export type JobHighlightType = 'none' | 'blue' | 'white';

export type JobLocationType = 'Remote_only' | 'On_Site_Work';


export type JobAdditionalCompensationType = 'bonus' | 'sales_commission' |
                                            'tips_gratuities' | 'profit_sharing';
 

export type JobPlanType = 'basic' |  'start' | 'standard' |
                          'professional' | 'professionalPlus' |
                          'exclusive' | 'premium';


export type JobType = 'FullTime' | 'PartTime' | 'Partner' |
                      'Contractual' | 'Volunteer' | 'Temporary' |
                      'Consultancy' | 'Internship';

export type SalaryType = 'Any' | 'Hour' |  'Month' | 'Year';


export type BenefitType = 'other' | 'labor_agreement' | 'floater' | 'paid_timeoff' |
                          'flexible_working_hours' | 'additional_timeoff' | 'additional_parental_leave' |
                          'sick_leave_for_family_members' | 'company_daycare' | 'company_canteen' |
                          'sport_facilities' | 'access_for_handicapped_persons' | 'employee_parking' |
                          'shuttle_service' | 'multiple_work_spaces' | 'corporate_events' | 'trainig_and_development' |
                          'pets_allowed' | 'corporate_medical_staff' | 'game_consoles' | 'snack_and_drink_selfservice' |
                          'private_pension_scheme' | 'health_insurance' | 'dental_care' | 'car_insurance' | 
                          'tution_fees' | 'permfomance_related_bonus' | 'stock_options' | 'profit_earning_bonus' |
                          'additional_months_salary' | 'employers_matching_contributions' | 'parental_bonus' | 'tax_deductions' |
                          'language_courses' | 'company_car' | 'laptop' | 'discounts_on_company_products_and_services' | 'holiday_vouchers' |
                          'restraunt_vouchers' | 'corporate_housing' | 'mobile_phone' | 'gift_vouchers' | 'cultural_or_sporting_activites' |
                          'employee_service_vouchers' | 'corporate_credit_card' | '';
           
                         




