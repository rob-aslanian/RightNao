import { JobType, SalaryType } from "src/app/_shared/models/jobs/jobs.interface";

export interface ICareerInterest {
    jobs?:string[];
    industry?: string;
    subindustry?: string[];
    company_size?: CopmanySizeType;
    job_types?: JobType[];
    salary_currency?:string;
    salary_min?: number;
    salary_max?: number;
    salary_interval?: SalaryType;
    relocate?: boolean;
    remote?: boolean;
    travel?: boolean;
    experience?: number;
    cities?: string[];
    suitable_for?:string[];
}


export type CopmanySizeType = 'size_unknown' | 'size_self_employed' | 'size_1_10_employees' |
                              'size_11_50_employees' | 'size_51_200_employees' | 'size_201_500_employees' |
                              'size_501_1000_employees' | 'size_1001_5000_employees' | 'size_5001_10000_employees' |
                              'size_10001_plus_employees';

export const JobTypes = [
    {
        id:'FullTime',
        name:'Full Time'
    },
    {
        id:'PartTime',
        name:'Part Time'
    },
    {
        id:'Contractual',
        name:'Contractual'
    },
    {
        id:'Internship',
        name:'Internship'
    },
    {
        id:'Volunteer',
        name:'Volunteer'
    },
    {
        id:'Temporary',
        name:'Temporary'
    },
];


export const ExperienceYears = [

    {
        id:"experience_unknown",
        name:"Any experience",
        _score:-2,
    },
    {
        id:'without_experience',
        name:'Without Experience',
        _score:-1
    },
    {
        id:'less_then_one_year',
        name:'Less than 1 year',
        _score:0
    },
    {
        id:'one_two_years',
        name:'1 - 2 years',
        _score:1
    },
    {
        id:'two_three_years',
        name:'2 - 3 years',
        _score:2
    },
    {
        id:'three_five_years',
        name:'3 - 5 years',
        _score:3
    },
    {
        id:'five_seven_years',
        name:'5 - 7 years',
        _score:4
    },
    {
        id:'seven_ten_years',
        name:'7 - 10 years',
        _score:5
    },
    {
        id:'ten_years_and_more',
        name:'10+ years',
        _score:5
    },
];


export type DatePostedType = 'past_24_hours' | 'past_week' |
                             'past_month' | 'anytime';


export enum DatePostedEnum {
    past_24_hours,
    past_week,
    past_month,
    anytime,
}

export type CareerInterestType = 'experience_unknown' | 'without_experience' | 'less_then_one_year' |
                                 'one_two_years' | 'two_three_years' | 'three_five_years' |
                                 'five_seven_years' | 'seven_ten_years' | 'ten_years_and_more';


export enum CareerInterestEnum {
    experience_unknown,
    without_experience,
    less_then_one_year,
    one_two_years,
    two_three_years,
    three_five_years,
    five_seven_years,
    seven_ten_years,
    ten_years_and_more,
}


export type SalaryIntervalType = 'Unknown' | 'Any' | 'Hour' |
                                 'Month' | 'Year';
                                 
export enum SalaryIntervalEnum {
    Unknown,
    Any,
    Hour,
    Month,
    Year,
}

