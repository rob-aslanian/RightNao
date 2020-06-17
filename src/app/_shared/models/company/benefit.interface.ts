import { BenefitType } from "../jobs/jobs.interface";

export interface IBenefit {
    benefits:BenefitType[],
    companyId?:string;
    isAdmin?:boolean;
}