export interface IFounders{
    founders:IFounder[],
    companyId?:string;
    isAdmin?:boolean;
}

export interface IFounder{
    id?:string;
    name?: string;
    position_title?:string;
    avatar?: string;
    url?: string;
    user_id?:string;
    userID?:string;
    approved?:boolean;
    manualy?: any;
    _close?:boolean;
    _type?:string;
}