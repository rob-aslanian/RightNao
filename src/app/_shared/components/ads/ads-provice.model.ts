import { AdvertFormatType } from "../../models/ads/ads.type";
import { AdsImageComponent, AdsResponsiveComponent, AdsSingleImageComponent, AdsSpotlightComponent, AdsSearchComponent } from "./containers";

export type AdsFormatType = { [key in string]:  IAdsProvider | IAdsComponentProvider };
export type AdsFormatAmount = { [key in AdvertFormatType ]?:number };
export type AdsComponentPath =  { [ key in  AdvertFormatType]?:any };

export interface IAdsComponentProvider {
    [key:string]:IAdsProvider
 }

export interface IAdsProvider {
    formats:AdvertFormatType[] | AdvertFormatType,
    amounts?:number,
 }


 export interface IAdsCommon {
     data?:any;
     click(e:Event , id:string , clicks:number): void,
     formates:AdvertFormatType[],
 }


export const ADS_COMPONENTS_PATH:AdsComponentPath = {
    IMAGE:AdsImageComponent,
    RESPONSIVE:AdsResponsiveComponent,
    SINGLE_IMAGE:AdsSingleImageComponent,
    SPOTLIGHT:AdsSpotlightComponent,
    PROFESSIONAL_SEARCH:AdsSearchComponent,
    CANDIDATE_SEARCH:AdsSearchComponent,
    BUSINESS_SEARCH:AdsSearchComponent,
    SERVICE_SEARCH:AdsSearchComponent,
    JOB_SEARCH:AdsSearchComponent,
    OFFICE_SEARCH:AdsSearchComponent,
    SHOP_SEARCH:AdsSearchComponent,
    PRODUCT_SEARCH:AdsSearchComponent,
    ESTATE_SEARCH:AdsSearchComponent,
}


export const COMPONENTS:AdsFormatType = {
    Common:{
        formats:["IMAGE" , "RESPONSIVE" , "SPOTLIGHT"],
        amounts:6,
    },
    NewsFeedComponent:{
        formats:["SINGLE_IMAGE" , "CAROUSEL" , "VIDEO"],
    },
    UserJobsComponent:{
        formats:"HEAD_PIN",
        amounts:20,
    },
    JobListComponent:{
        formats:"HEAD_ROUND_PIN",
        amounts:20,
    },
    SearchMainComponent:{
        people:{
            formats:"PROFESSIONAL_SEARCH",
            amounts:3,
        },
        candidate:{
            formats:"CANDIDATE_SEARCH",
            amounts:3,
        },
        company:{
            formats:"BUSINESS_SEARCH",
            amounts:3,
        },
        job:{
            formats:"JOB_SEARCH",
            amounts:3,
        },
        service:{
            formats:"SERVICE_SEARCH",
            amounts:3,
        }
    }
}




