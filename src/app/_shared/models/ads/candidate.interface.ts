import { IAdsLocation } from "./shared.interface";
import { AdvertFormatType } from "./ads.type";

export interface IAdsCandidate {
    location?: IAdsLocation[];
    start_date?: string;
    currency?: string;
    name?: string;
    format?: AdvertFormatType
}