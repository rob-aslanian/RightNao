 
 
type Condition_Used =  'Condition_New' | 'Condition_Used' |  'Condition_New_Without_Tag';
type price_type = 'PriceType_AddPrice' | 'PriceType_PriceRange' | 'PriceType_Negotiable' | 'PriceType_Free';


interface IPrice {
    price_type: price_type
    fix_price: number
    min_price: number
    max_price: number
    currency:  number;
} 

interface IPhone {
    country_code_id: number
    number: string
}
 
interface Price {
    price_type: IPrice
    fix_price: number
    currency: string
}

interface IDetail {
    title: string
    description: string

}
interface ILocation {
    country_id: string
    city: ICity
}

interface ICity {
    id: string
    city: string
}

export interface IAddforSale{ 
    product?: string
    category?: string
    sub_category?: string
    condition?: Condition_Used
    price?:  Price
    expired_days?: number
    post_currency?: string
    detail?: IDetail
    phones?: IPhone[]
    location?: ILocation
}