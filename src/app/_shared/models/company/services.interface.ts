export interface IServices{
    services?:IService[],
    companyId?:string;
    isAdmin?:boolean;
}


export interface IService{
    id?: string;
    image?: string;
    name?: string;
    website?: string;
    price?:any;
    title?:any;
    delivery_time?:any;
    description?:any;

    _close?:boolean;
    _type?:string;
}