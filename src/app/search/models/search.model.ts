import { ISearchUser, ISearchCompany, ISearchJob, ISearchCandidate, ISearchService, ISearchServiceRequest, ISearchRealEstateRequest } from "./search.interface";
import { CompanySizeType, CompanyTypeType } from "src/app/company/company-account/general/models/generalInfo.interface";
import { DatePostedType, CareerInterestType, SalaryIntervalType } from "src/app/jobs/models/userJobs.model";
import { FormGroup, FormControl } from "@angular/forms";
import { AdverCategoryType } from "src/app/_shared/models/ads/ads.type";



export type SearchByType = 'people' | 'professional' | 'company' |
                           'group' | 'candidate' | 'job' | 'all' | 'service' |
                           'service_request' | 'real_estate';

export type ServiceOwnerType = 'Owner_User' | 'Owner_Company';

export type LocationType = 'Remote_only' | 'On_Site_Work';

export type ProjectType = 'One_Time_Project' | 'On_Going_Project';

export type DeliverTimeType = 'Any' | 'Up_To_24_Hours' | 'Up_To_3_Days' |
                              'Up_To_7_Days' | 'Weeks_1_2' | 'Weeks_2_4' | 'Month_And_More';
                              
export type PriceType = 'Any' | 'Price_Fixed' | 'Price_Hourly' | 'Price_Negotiable';

export type WeekDayType = 'monday' | 'tuesday' | 'wednesday' | 'thursday' |
                          'friday' | 'saturday'| 'sunday';

export type RealEstateDealType =  'DealType_Any' | 'DealType_Rent' | 'DealType_Lease' |
                                'DealType_Share' | 'DealType_Sell' | 'DealType_Build' |
                                'DealType_Materials' | 'DealType_Renovation' | 'DealType_Move';

export type RealEstatePropertyType = 'PropertyType_All' | 'PropertyType_Any' |  'PropertyType_NewHomes'|  
                                     'PropertyType_Homes' | 'PropertyType_Houses' | 'PropertyType_Appartments' |
                                     'PropertyType_Garages' | 'PropertyType_StorageRooms' |  'PropertyType_Offices' |
                                     'PropertyType_CommercialProperties' | 'PropertyType_Buildings' | 'PropertyType_Land' |
                                     'PropertyType_BareLand' | 'PropertyType_Barn' | 'PropertyType_SummerCottage' |
                                     'PropertyType_RuralFarm' | 'PropertyType_HotelRoom';


export type RealEstateMetricType = 'PriceType_Any' | 'PriceType_Total' |  'PriceType_MetreSquare' | 'PriceType_FeetSquare';


export type RealEstateOutdoorFeatureType = 'OutdoorFeatures_Any' |  'OutdoorFeatures_SwimmingPool' |  'OutdoorFeatures_Balcony' |
                                           'OutdoorFeatures_UndercoverParking' |  'OutdoorFeatures_FullyFenced' | 'OutdoorFeatures_TennisCourt' |
                                           'OutdoorFeatures_Garden' | 'OutdoorFeatures_Garage' | 'OutdoorFeatures_OutdoorArea' | 
                                           'OutdoorFeatures_Shed' | 'OutdoorFeatures_OutdoorSpa' |  'OutdoorFeatures_Outbuildings';

export  type RealEstateIndoorFeatureType =  'IndoorFeatures_Any' | 'IndoorFeatures_Ensuit' |  'IndoorFeatures_Study' | 
                                            'IndoorFeatures_AlarmSystem' |  'IndoorFeatures_Floorboards' |  'IndoorFeatures_RumpusRoom' |
                                            'IndoorFeatures_StorageRoom' |  'IndoorFeatures_Dishwasher' |  'IndoorFeatures_Lift' |
                                            'IndoorFeatures_BuiltInRobes' |  'IndoorFeatures_Broadband' | 'IndoorFeatures_Gym' | 'IndoorFeatures_Workshop';

export type RealEstateClimatControlType  =  'ClimatControl_Any' | 'ClimatControl_AirConditioning' | 'ClimatControl_Hearting' | 
                                            'ClimatControl_WaterTank' |  'ClimatControl_SolarPanels' |  'ClimatControl_HighEnergyEfficiency' |
                                            'ClimatControlSolarHotWater' | 'ClimatControl_ZonalHeating' | 'ClimatControl_CentralHeating';

export type RealEstateStatusType =  'Status_Any' |  'Status_OldBuild' |  'Status_NewBuilding' |  'Status_UnderConstruction' | 
                                    'StatusDeveloped' |  'Status_Buildable' |  'Status_NonBuilding';

export type RealEstateTypeOfProperty = 'TypeOfProperty_Any' | 'TypeOfProperty_Appartaments' | 'TypeOfProperty_Houses' |
                                       'TypeOfProperty_CountryHomes' | 'TypeOfProperty_Duplex' |  'TypeOfProperty_Penthouses' |
                                       'TypeOfProperty_Bungalow';

export const FilterIgnoreField = ['city' , '__typename' , 'id' , 'filter_name' , 'founders_id' , 'company_ids',
                                  'pastCompany' , 'past_company'];

export const FilterRadioBtns = ['date_posted' , 'currency' , 'period' , 'experience_level',
                                'size' , 'company_size'];



export const SearchLeftColumns = {

    people:['SearchNameColumnComponent' , 'SearchCountryColumnComponent', 'SearchCityColumnComponent', 
            'SearchJobTitleColumnComponent', 'SearchSkillColumnComponent' , 'SearchCompanyNameColumnComponent',
            'SearchSchoolColumnComponent' ,'SearchAgeColumnComponent' , 'SearchGenderColumnComponent' , 
            'SearchLanguageColumnComponent' , 'SearchFeildOfStudyColumnComponent' , 
            'SearchInterestColumnComponent' , 'SearchShowOnlyColumnComponent' ],

    professional:[ 'SearchCountryColumnComponent' , 'SearchOccupationColumnComponent' , 'SearchIndustryColumnComponent',
                   'SearchPractiseYearColumnComponent' , 'SearchRaitingColumnComponent' , 'SearchSchoolColumnComponent',
                   'SearchFeildOfStudyColumnComponent' , 'SearchSkillColumnComponent' , 'SearchLanguageColumnComponent',
                   'SearchNameColumnComponent' , 'SearchAgeColumnComponent' , 'SearchGenderColumnComponent' ],
    
    company:['SearchNameColumnComponent' , 'SearchCountryColumnComponent' , 'SearchCityColumnComponent' ,
             'SearchIndustryColumnComponent', 'SearchCompanySizeColumnComponent', 'SearchCompanyTypeColumnComponent',
             'SearchShowMeColumnComponent' , 'SearchJobOffersColumnComponent']  , //'SearchRaitingColumnComponent, ],

    candidate:[//'SearchNameColumnComponent' , 
                'SearchCountryColumnComponent' , //'SearchAgeColumnComponent',
               'SearchIndustryColumnComponent' , 'SearchJobTypeColumnComponent' , 'SearchExperienceColumnComponent' , 
               'SearchSchoolColumnComponent','SearchDegreeColumnComponent'  , 'SearchFeildOfStudyColumnComponent' , 
               'SearchSkillColumnComponent' ,'SearchLanguageColumnComponent' ,  'SearchSalaryColumnComponent' , 
               'SearchCompanyNameColumnComponent' ,'SearchShowCandidatesColumnComponent' ],

    job:[//'SearchJobOffersColumnComponent' , 
         'SearchDatePostedColumnComponent' , 'SearchJobTypeColumnComponent',
         'SearchSalaryColumnComponent' , 'SearchCountryColumnComponent' , 'SearchIndustryColumnComponent' , 
         'SearchCompanyNameColumnComponent' ,  'SearchCompanySizeColumnComponent' ,  'SearchSkillColumnComponent' , 
         'SearchExperienceColumnComponent' ,  'SearchDegreeColumnComponent' , 'SearchLanguageColumnComponent' , 
         'SearchShowOffersColumnComponent' ], //'SearchSuitableColumnComponent'

    service:['SearchLocationComponent' , 'SearchCountryColumnComponent' ,  'SearchDeliveryTimeComponent' , 'SearchSalaryColumnComponent',
             'SearchSkillColumnComponent' ,  , 'SearchWorkingHoursComponent' ,  'SearchRaitingColumnComponent' ,  
             'SearchShowOnlyColumnComponent'],
         
    service_request:['SearchLocationComponent' , 'SearchProjectTypeComponent' , 'SearchDeliveryTimeComponent' ,
                     'SearchSalaryColumnComponent' , 'SearchSkillColumnComponent' , 'SearchLanguageColumnComponent' , 
                     'SearchRaitingColumnComponent' ,  'SearchShowOnlyColumnComponent' ] ,

    real_estate:['SearchDealTypeComponent' , 'SearchRealEstateContentComponent' , 'SearchPublicationDateComponent'],                 
};


export type AdsListType = { [key in AdverCategoryType]?:string[] }


export const WorkingHours = [
   "0:00", "0:30", "1:00" , "1:30",
   "2:00","2:30","3:00", "3:30",
   "4:00","4:30","5:00","5:30","6:00",
   "6:30","7:00","7:30","8:00","8:30",
   "9:00", "9:30","10:00","10:30",
   "11:00","11:30","12:00"

]

export const SearchHeader = {
    people:{
      text:'people',
    },
    company:{
        text:'Business & organizations',
    },
    group:{
        text:'group',
    },
    service:{
        text:'service',
    },
    service_request:{
        text:'service requests',
    },
    candidate:{
        text:'candidates',
        btns:[
            {
                text:'Manage',
                path:'/jobs/company/dashboard/',
                class:'backgroundless'
            },
            {
                text:'Post a job',
                path:'/jobs/company/post-a-job',
                class:'btn-primary'
            }
        ]
    },
    job:{
        text:'work offers',
        btns:[
            {
                text:'Manage',
                path:'/jobs/user/dashboard/',
                class:'backgroundless'
            }
        ]
    },
    real_estate:{
        text:'real estates',
        btns:[
            {
                text:'Manage',
                path:'/real-estate/manage-estate/',
                class:'btn-primary'
            }
        ]
    }

} 

export const SearchAllTitle = {
    people:{
        title:"People results",
        link:'/search/people'
    },
    company:{
        title:"Companies & Organizations results",
        link:'/search/company'
    },
    job:{
        title:"Job results",
        link:'/search/job'
    },
    candidate:{
        title:"Candidates results",
        link:'/search/candidate'
    },
    service:{
        title:"Services results",
        link:'/search/service'
    },
    service_request:{
        title:"Service Requests results",
        link:'/search/service_request'
    }
      
}

export const SERVICE_OWNER = [
    {
        id:"Owner_User",
        name:"Users"
    },
    {
        id:"Owner_Company",
        name:"Companies"
    },
]

export const PROJECT_TYPE = [
    {
        id:"One_Time_Project",
        name:"One Time Project",
        isSelected:false
    },
    {
        id:"On_Going_Project",
        name:"On-Going Project",
        isSelected:false
    },
];


export const SERVICE_LOCATION = [
    {
        id:"Remote_only",
        name:"Remote only"
    },
    {
        id:"On_Site_Work",
        name:"On-site work"
    },
];

export const SERVICE_PRICE = [
    {
        id:"Any",
        name:"Any",
    },
    {
        id:"Price_Fixed",
        name:"Fixed price"
    },
    {
        id:"Price_Hourly",
        name:"Hourly"
    },
    {
        id:"Price_Negotiable",
        name:"Price Negotiable"
    },
];

export const DELIVERY_TIME = [
    {
        id:"Up_To_24_Hours",
        name:"Up to 24 hours"
    },
    {
        id:"Up_To_3_Days",
        name:"Up to 3 days"
    },
    {
        id:"Up_To_7_Days",
        name:"Up to 7 days"
    },
    {
        id:"Weeks_1_2",
        name:"1 - 2 weeks"
    },
    {
        id:"Weeks_2_4",
        name:"2 - 4 weeks"
    },
    {
        id:"Month_And_More",
        name:"Month and more"
    }
];

export const PULICATION_DATE = [
    {
        id:"Date_Any",
        name:"Any"
    },
    {
        id:"Date_Last_48_Hours",
        name:"Last 48Hours"
    },
    {
        id:"Date_Last_Week",
        name:"Last Week"
    },
    {
        id:"Date_Last_Month",
        name:"Last Month"
    },
]

export class SearchUserInput implements ISearchUser {
    full_name: string = '';
    isFemale:boolean =  false;
    isMale:boolean = false;
    isMyConnection:boolean =  false;
    isStudent:boolean =  false;
}

export class SearchCompanyInput implements ISearchCompany {
    search_for_companies:boolean = false;
    search_for_organizations:boolean =  false;
    size =  "size_unknown" as CompanySizeType;
    type = "type_unknown" as CompanyTypeType;
    with_jobs:boolean =  false;
    
}


export class SearchJobInput implements ISearchJob {
    date_posted = "anytime" as DatePostedType;
    experience_level = "experience_unknown" as CareerInterestType;
    country = [];
    company_size = "size_unknown" as CompanySizeType;
    period = "Any" as SalaryIntervalType;
    is_following:boolean = false;
    with_salary:boolean = false;
    without_cover_letter:boolean = false;

}

export class SearchCandidateInput implements ISearchCandidate {
    experience_level = "experience_unknown" as CareerInterestType;
    is_possible_to_relocate:boolean =  false;
    is_student:boolean =  false;
    is_willing_to_travel:boolean =  false;
    is_willing_to_work_remotly:boolean =  false;
    period = "Any" as SalaryIntervalType;  
}

export class SearchServiceInput implements ISearchService {
   delivery_time = "Any" as DeliverTimeType;
   price = "Any" as PriceType;
   services_ownwer = "Any_Owner" as ServiceOwnerType;
   is_always_open:boolean = false;
   location_type = 'Location_Any' as LocationType;
   week_days = [];
}

export class SearchServiceRequestInput implements ISearchServiceRequest {
    delivery_time = "Any" as DeliverTimeType;
    price = "Any" as PriceType;
    services_ownwer = "Any_Owner" as ServiceOwnerType;
    location_type = "Location_Any" as LocationType;
    project_type = [];
 }

 export class SearchRealEstateInput implements ISearchRealEstateRequest {
    deal_type = "DealType_Any" as RealEstateDealType;
    property_type = "PropertyType_Any" as RealEstatePropertyType;
    by_user = false;
    by_agent = false;
    by_reposssed = false;
    publication_date = "Date_Any";
 }

export class SearchForms {
    
    form:FormGroup;

    constructor(
        public type:SearchByType
    ) {
    }

    public generateForm(){
        switch(this.type){
            case "people":{
                return new FormGroup({
                    isMyConnection: new FormControl(false , { updateOn:'change' }),
                    // conenctionsOf: [ID!]
                    country: new FormControl(),
                    city: new FormControl(),
                    school: new FormControl(),
                    degree: new FormControl(),
                    filedOfStudy: new FormControl(),
                    isStudent: new FormControl(false , { updateOn:'change'  }),
                    currentCompany: new FormControl(),
                    pastCompany: new FormControl(),
                    industry: new FormControl(),
                    position: new FormControl(),
                    firstname: new FormControl(),
                    lastname: new FormControl(),
                    nickname: new FormControl(),
                    isMale: new FormControl(false , { updateOn:'change' }),
                    isFemale: new FormControl(false , { updateOn:'change' }),
                    minAge:new FormControl(),
                    maxAge: new FormControl(),
                    skill: new FormControl(),
                    language: new FormControl(),
                    interest: new FormControl(),
                    full_name: new FormControl(),
                  }  , { updateOn:"submit" })
            }
            case "company":{
                return new FormGroup({
                    search_for_companies: new FormControl(false , { updateOn:'change' }),
                    search_for_organizations: new FormControl(false , { updateOn:'change' }),
                    with_jobs: new FormControl(false , { updateOn:'change' }),
                    name: new FormControl(),
                    subindustry: new FormControl(),
                    size: new FormControl('' , { updateOn:'change' }),
                    type: new FormControl('' , { updateOn:'change' }),
                    rating: new FormControl(),
                    business_hours: new FormControl(),
                    founders_id: new FormControl(),
                    founders_name: new FormControl(),
                    country: new FormControl(),
                    city: new FormControl(),
                    industry: new FormControl(),           
                  }  , { updateOn:"submit" })
            }

            case "job":{
                return new FormGroup({
                    with_salary: new FormControl(false , { updateOn:'change' }),
                    subindustry: new FormControl(),
                    company_size: new FormControl('' , { updateOn:'change' }),
                    country: new FormControl(),
                    city: new FormControl(),
                    industry: new FormControl(), 
                    date_posted: new FormControl('' , { updateOn:'change' }),
                    experience_level: new FormControl('' , { updateOn:'change' }),
                    degree: new FormControl(),
                    job_type:new FormControl('' ,  { updateOn:'change'  }),
                    language: new FormControl(),
                    company_name: new FormControl(),
                    currency: new FormControl('' , { updateOn:'change' }),
                    period: new FormControl(false , { updateOn:'change' }),
                    min_salary: new FormControl(),
                    max_salary: new FormControl(),
                    skill: new FormControl(),
                    is_following: new FormControl(false , { updateOn:'change' }),
                    without_cover_letter: new FormControl(false , { updateOn:'change' }),
                    company_ids: new FormControl(),        
                  }  , { updateOn:"submit" })
            }
            case "candidate":{
                return new FormGroup({
                    current_company: new FormControl(),
                    past_company: new FormControl(),
                    sub_industry: new FormControl(),
                    company_size: new FormControl('' , { updateOn:'change' }),
                    country: new FormControl(),
                    city: new FormControl(),
                    industry: new FormControl(), 
                    date_posted: new FormControl(),
                    experience_level: new FormControl(),
                    degree: new FormControl(),
                    job_type:new FormControl(),
                    language: new FormControl(),
                    company_name: new FormControl(),
                    currency: new FormControl('' , { updateOn:'change' }),
                    period: new FormControl('' , { updateOn:'change' }),
                    min_salary: new FormControl(),
                    max_salary: new FormControl(),
                    skill: new FormControl(),
                    company_ids: new FormControl(),        
                    school: new FormControl(),
                    field_of_study: new FormControl(),
                    is_student: new FormControl(false , { updateOn:'change' }),
                    is_willing_to_travel: new FormControl(false , { updateOn:'change' }),
                    is_willing_to_work_remotly: new FormControl(false , { updateOn:'change' }),
                    is_possible_to_relocate: new FormControl(false , { updateOn:'change' }),
                  }  , { updateOn:"submit" })
            }
            case "service":{
                return new FormGroup({
                    location_type: new FormControl('' , { updateOn:"change" }),
                    delivery_time: new FormControl('' , { updateOn:"change" }),        
                    price: new FormControl('' , { updateOn:"change" }),              
                    country: new FormControl(),
                    city: new FormControl(),
                    currency: new FormControl('' , { updateOn:'change' }),
                    fixed_price_amount: new FormControl(),
                    min_salary: new FormControl(),
                    max_salary: new FormControl(),
                    skill: new FormControl(),
                    is_always_open: new FormControl(false , { updateOn:"change" }),   
                    week_days:new FormControl('' , { updateOn:"change" }), 
                    hour_from:new FormControl('' , { updateOn:"change" }),   
                    hour_to:new FormControl('' , { updateOn:"change" }),   
                    services_ownwer:new FormControl('' , { updateOn:"change" }),   
                  }  , { updateOn:"submit" })
            }
            case "service_request":{
                return new FormGroup({
                    location_type: new FormControl('' , { updateOn:"change" }),
                    delivery_time: new FormControl('' , { updateOn:"change" }), 
                    project_type: new FormControl('' , { updateOn:"change" }),        
                    price: new FormControl('' , { updateOn:"change" }),              
                    country: new FormControl(),
                    city: new FormControl(),
                    currency: new FormControl('' , { updateOn:'change' }),
                    fixed_price_amount: new FormControl(),
                    min_salary: new FormControl(),
                    max_salary: new FormControl(),
                    skill: new FormControl(),
                    tool: new FormControl(), 
                    language: new FormControl(), 
                    services_ownwer:new FormControl('' , { updateOn:"change" }),   
                  }  , { updateOn:"submit" })
            }

            case "real_estate":{
                return new FormGroup({
                    country: new FormControl(),
                    city: new FormControl(),
                    deal_type:new FormControl('DealType_Any' , { updateOn:'change' }),
                    property_type:new FormControl('PropertyType_Any' , { updateOn:'change' }),
                    metrict_type: new FormControl(),
                    min_size: new FormControl(),
                    max_size: new FormControl(),
                    type_of_property: new FormControl(),
                    badrooms: new FormControl(),
                    bathrooms: new FormControl(),
                    floor_from: new FormControl(),
                    floor_to: new FormControl(),
                    floors: new FormControl(),
                    car_spaces: new FormControl(),
                    rooms: new FormControl(),
                    purchase: new FormControl(),
                    min_price: new FormControl(),
                    max_price: new FormControl(),
                    fix_price: new FormControl(),
                    currency: new FormControl(),
                    availability_from: new FormControl(),
                    availability_to: new FormControl(),
                    outdoor_features:new FormControl(),
                    indoor_features:new FormControl(),
                    climat_control:new FormControl(),
                    status:new FormControl(),
                    additional_filters: new FormControl(),
                    layout: new FormControl(),
                    building_use: new FormControl(),
                    commercial_properties: new FormControl(),
                    commercial_locations: new FormControl(),
                    type_of_land: new FormControl(),
                    who_live: new FormControl(),
                    timing: new FormControl('Any_Timing' ,  { updateOn:"change" }),
                    services: new FormControl(),
                    interior_and_exterior: new FormControl(),
                    location_type: new FormControl(),
                    materials: new FormControl(),
                    publication_date: new FormControl('', { updateOn:'change' }),
                    by_reposssed: new FormControl(false, { updateOn:'change' }),
                    by_agent:new FormControl(false, { updateOn:'change' }),
                    by_user: new FormControl(false, { updateOn:'change' }),   
                  }  , { updateOn:"submit" })
            }
        }
    }
}