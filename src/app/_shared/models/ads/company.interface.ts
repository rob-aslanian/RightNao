import { IAdsLocation } from "./shared.interface";

export interface IAdsCompany {
    location?: IAdsLocation[];
    start_date?: string;
    name?: string;
    currency?:string;
    
}