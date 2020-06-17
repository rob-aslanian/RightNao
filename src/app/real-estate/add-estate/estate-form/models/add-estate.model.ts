
interface RentalPriceInput {
    price_type: string
    min_price: number
    max_price: number
    currency: string
}

interface phones {
    country_code_id: number
    number: string
}

interface rental_detail {
    title: string
    house_rules: string
    description: string
}

interface exterior {
    price_type: string
    min_price: number
    max_price: number
    currency: string
}

 
// Property type NewHome, Homes, Apartaments and House
export interface AddNewHome {
    type_of_property: string[]
    status: string 
    badrooms: number
    bathrooms: number
    total_area: number
    car_spaces: number
    //Back
    metrics: string
    outdoor_features: string[]
    indoor_features: string[]
    climat_control: string[]
    // More information
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean
};

export interface Garages {
    additional_filters: string[]
    status: string 
    total_area: number
    metrics: string
    // More information
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean
};

export interface StorageRooms {
    status: string 
    total_area: number
    metrics: string
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean      
};

export interface Office {
    layout: string 
    status: string 
    total_area: number
    metrics: string
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean      
};


export interface commercialProperties {
    commercial_properties: string[]
    commercial_location: string[]
    additional_filters: string[]
    status: string 
    total_area: number
    metrics: string
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean      
};

export interface Buildings {
    status: string 
    total_area: number
    metrics: string
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean      
};

export interface Land {
    status: string 
    total_area: number
    metrics: string
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean      
};

export interface RuralFarm {
    type_of_property: string[]
    additional_filters: string[]
    availability_from: string
    availability_to: string
    status: string 
    total_area: number
    metrics: string
    is_agent: boolean
    rental_detail: rental_detail[]
    price: RentalPriceInput
    phones: phones[]
    has_repossesed: boolean      
};

export interface Move {
       location_type: string[]
       services: string[]
       rental_detail: any  
};

export interface Renovation {
    country_ids: string
    city_ids: string
    exterior: exterior
    interior: exterior
    interior_and_exterior: exterior
    timing: string
    rental_detail: any  

};

export interface Materials {
    materials: string 
    rental_detail: any    
};

export interface addRealEstate {
    location?: any
    company_id?: string
    rental_info?: rental_info
    rental_detail?: rental_detail[]
    phones?: phones[]
    price?: RentalPriceInput
    who_live?: string[]
    status?: string
    badrooms?: number
    bathrooms?: number
    total_area?: number
    floor?: number
    floors?: number
    car_spaces?: number
    rooms?: number
    property_types?: string[]
    type_of_land?: string[]
    outdoor_features?: string[]
    indoor_features?: string[]
    climat_control?: string[]
    commercial_properties?: string[]
    commercial_locations?: string[]
    additional_filters?: string[]
    type_of_property?: string[]
    location_type?: string[]
    country_ids?: string[]
    city_ids?: string[]
    services?: string[]
    materials?: string[]
    layout?: string
    building_use?: string
    availability_from?: string
    availability_to?: string
    exterior?: exterior
    interior?: exterior
    interior_and_exterior?: exterior
    timing?: string
    is_agent?: boolean
    has_repossesed?: boolean
    metrict_type?: string
};

interface rental_info {
    deal_type: string
    property_type: string
    location: any
    expired_days: number
    post_currency: string
}