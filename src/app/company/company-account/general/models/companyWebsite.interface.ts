export interface ICompanyWebsite{
    company_id?:string;
    websites?:IWebsite[];
}


export interface IWebsite{
    id?:string;
    website?:string;
}