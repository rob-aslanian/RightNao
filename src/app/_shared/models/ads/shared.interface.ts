import { ICity } from "../shared/location.interface";
import { AdvertFormatType, AdverCategoryType } from "./ads.type";

export interface IAdsCity {
    id:string,
    city: string,
    subdivision: string
}

export interface IAdsLocation{
    city?: IAdsCity
    country_id?: string;
}

export interface IAdsContent{
    file_id?: string;
    title?: string;
    description?: string;

    _image?:string;
}

export interface IAdsPrice {
    amount?: number;
    currency?: string;
}

export interface IAdsReview {
    preview?:{
        name?:string;
        image?:string;
        top_title?:string;
        bottom_title?:string;
        description?:string;
    },
    url?:string;
    location?:string;
    currency?:string;
    places?:string[];
    start_date?:string;

}

export interface IAdsCategory {
    title:string,
    icon:string,
    formats:string[],
    type:string,
    active?:boolean
}

export interface IAdsFormat {
    title:string,
    type:AdvertFormatType,
    icon:string,
    description:string,
    selected?:boolean
}

export interface IAdsCampmaignInput {
    company_id?:string,
    start_date:string,
    name:string,
    type: string,
    formats: AdvertFormatType[],
    locations?: IAdsLocation[],
    languages?:string[],
    currency?:string,
    gender?:string,
    age_from?:number,
    age_to?:number,
    impressions?:number,
    clicks?:number,
    forwarding?:number,
    referals?:number
}

export interface IAdsInput {
    id: string,
    url: string,
    type: string,
    name: string
    content?: IAdsInputContent
}

export interface IAdsInputContent {
    headline?: string,
    description?: string,
    custom_button?: string,
    url?: string
}