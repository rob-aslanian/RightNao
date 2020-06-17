import { IBuisnessHour } from "../businessHours.interface";
import { IPhone } from "./phone.interface";

export interface ILocation{
    id?:string;
    apartment?:string;
    business_hours?:IBuisnessHour[];
    state?:string;
    city?:{
        city?:string;
        id?:string | number,
        subdivision?:string;
    }
    city_id?:string | number;
    country_id?:string;
    geo_pos?:{
        lantitude?:number,
        longitude?:number
    }
    name?:string;
    phones?:IPhone[];
    street_address?:string;
    zip_code?:string;
    primary?: boolean;
    _close?:boolean;
    _type?: string;
}

