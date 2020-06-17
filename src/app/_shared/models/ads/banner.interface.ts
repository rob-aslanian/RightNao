import { IAdsLocation, IAdsContent } from "./shared.interface";
import {  AdsPlacesType } from "./ads.type";

export interface IAdsBanner {
    location?: IAdsLocation[],
    places?: AdsPlacesType[],
    start_date?: string;
    name?: string;
    destination_url?: string;
    is_responsive?: boolean;
    contents?: IAdsContent[];
    currency?: string;

}