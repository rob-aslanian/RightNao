export interface IInterests{
    interests?:IInterest[],
    isAdmin?:boolean;
}

export interface IInterest{
    id?:string;
    title?: string;
    interest?:string;
    image?: string;
    description?: string;

    _close?:boolean;
    _type?:string;
}