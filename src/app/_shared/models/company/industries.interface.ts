export interface IIndustry{
    id?:string;
    name?:string;
    subindustries?:ISubindustries[]
}


export interface ISubindustries {
    id?:string;
    name?:string;
}