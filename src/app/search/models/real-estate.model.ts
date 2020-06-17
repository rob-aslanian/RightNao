import { ISearchLeftModel } from "./search.interface";
import { RealEstateDealType, RealEstatePropertyType } from "./search.model";


export type InputTypes = 'avilable' | 'price' | 'size' | 'purchase' |
                         'floor';


export type CheckboxTypes = 'type_of_new_home' | 'bedrooms' | 'bathrooms' | 
                            'car_spaces' | 'outdoor_features' | 'indoor_features' |
                            'climat_control' | 'status' | 'additional_filters' | 'layout' |
                            'buildng_use' | 'commercial_property' | 'commercial_location' | 
                            'type_of_land' | 'property_type' | 'who_live' | 'remodel' | 'materials' |
                            'services';

export type RadioTypes = 'timing';


export type RealEstateLefType = { [ key in (InputTypes | CheckboxTypes | RadioTypes) ]?:ISearchLeftModel }


export const RealEstaetLeftInputModel:RealEstateLefType = {
    floor:{
        title:"Floor",
        form_names:['floor_from' , 'floor_to']
    },
    purchase:{
        title:"Purchase",
        form_names:['purchase']
    },
    size:{
        title:"Size",
        form_names:['min_size' , 'max_size']
    },
    avilable:{
        title:'Available date',
        form_names:['availability_from' , 'availability_to']
    },
    price:{
        title:"Price",
        form_names:['min_price' , 'max_price' , 
                    'fix_price' , 'currency']
    },
    
}

export function getFiltersByType(type: RealEstateDealType | RealEstatePropertyType ) : RealEstateLefType  {
    switch (type) {
        case "PropertyType_NewHomes":
            return {    
                size:{
                    title:"Size",
                    form_names:["min_size" , "min_size"],

                }
            }
        default:
            return RealEstaetLeftInputModel;
    }
}