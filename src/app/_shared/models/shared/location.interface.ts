export interface ILocation{
    city?:ICity,
    country?:{
        id?:string;
        country?: string;
    }
}

export interface ICity{
    id?: string;
    city?: string;
    subdivision?: string;
    country?:string;
}
