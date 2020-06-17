export interface IProducts{
    products?:IProduct[],
    companyId?:string;
    isAdmin?:boolean;
}


export interface IProduct{
    id?: string;
    image?: string;
    name?: string;
    website?: string;

    _close?:boolean;
    _type?:string;
}