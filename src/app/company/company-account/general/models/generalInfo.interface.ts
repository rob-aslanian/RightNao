import { IBuisnessHour } from "src/app/_shared/models/businessHours.interface";

export interface IGeneralInfo{
    companyId?:string;
    industry?:IIndustry,
    foundation_date?:string;
    size?:size,
    parking?:parking
    type?:type;
    business_hours?:IBuisnessHour[]
}

interface IIndustry{
    id?:string;
    subindustries?: string[];
}




export type CompanySizeType = 'size_unknown' | 'size_self_employed' | 'size_1_10_employees' | 
                              'size_11_50_employees' | 'size_51_200_employees' | 'size_201_500_employees' |
                              'size_501_1000_employees' | 'size_1001_5000_employees' | 'size_5001_10000_employees' |
                              'size_10001_plus_employees';
            
export type CompanyTypeType = 'type_unknown' | 'type_self_employed' | 'type_educational_institution' | 
                              'type_government_agency' | 'type_sole_proprietorship' | 'type_privately_held' |
                              'type_partnership' | 'type_public_company';

export enum size {
    size_unknown,
    size_self_employed,
    size_1_10_employees,
    size_11_50_employees,
    size_51_200_employees,
    size_201_500_employees,
    size_501_1000_employees,
    size_1001_5000_employees,
    size_5001_10000_employees,
    size_10001_plus_employees
}

enum parking{
    parking_unknown,
    parking_no_parking,
    parking_parking_lot,
    parking_street_parking
}

export enum type{
    type_unknown,
    type_self_employed,
    type_educational_institution,
    type_government_agency,
    type_sole_proprietorship,
    type_privately_held,
    type_partnership,
    type_public_company
}

export enum weekDays {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
}