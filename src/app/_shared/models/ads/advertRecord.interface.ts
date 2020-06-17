import { AdsPlacesType, AdvertStatusType } from "./ads.type";
import { IAdsPrice } from "./shared.interface";

export interface IAdsAdvertRecord {
    id?: string;
    places?: AdsPlacesType,
    image_url?: string;
    status?: AdvertStatusType,
    clicks?: number;
    impression?: number;
    cost_per_result?: IAdsPrice;
    amount_spent?: IAdsPrice;
    total_budget?: IAdsPrice;
    start_date?: string;
    finish_date?: string;
}