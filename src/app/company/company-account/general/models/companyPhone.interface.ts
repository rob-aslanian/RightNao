export interface ICompanyPhone{
    id?:string;
    country_code_id?: number;
    country?: string;
    country_code?:string; 
    number?: string;
    is_primary?:boolean;
}