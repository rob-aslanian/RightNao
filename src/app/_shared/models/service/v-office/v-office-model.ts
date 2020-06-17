 

interface LocationInput {
        city?: any
        country_id?: string
}

export interface QualificationsInput {
    skills?: {
        id?:string,
        skill?:string
    }[]
    toolTechnology?: {
        id?: string,
        tool_Technology?: string,
        rank?: any
    }[]
    languages?: {
        id?: string,
        language?: string,
        rank?: any
    }[]
}

export interface ICreateOffice {
        name?: string
        mainCategory?: string[]
        location?: LocationInput
        description?: string
        qualifications?: QualificationsInput
}

export interface IQualification {
        qualifications?: QualificationsInput
        office_id?: string 
        isMe?: boolean 
}

export interface IServices {
        office_id?: string
        isMe?: boolean
        services?: any
}

export interface Iheader {
        name?: string
        location?: { city?: string , country?: string }
        office_id?: string
        id?: string
        isMe?: boolean
        isOut?: boolean
        return_date?: string
        category?: string
        isCompanyAcitve?: boolean
        created_at?: string
        description: string
        languages?: any[]
        avatar?: string
        originAvatar?: string
}
 
export interface Idescription  {
        company_id?: string
        office_id?: string
        description?: string
}

export interface isMe {
        isMe?: boolean
        companyID?: string
        userID?: string
        id?: string
}



export type status = 'status_unknown' | 'status_activate' | 'status_deactivate' | 'status_draft' | 'status_paused' | 'status_closed' | 'status_rejected';

export type order_type = 'seller'  | 'buyer';

export type order_status = 'any' | 'new' | 'in_progress' | 'out_of_schedule' | 'delivered' | 'completed' | 'canceled' | 'disputed' ;

export enum statusEmum {
        any = "Any",
        new = "New",
        in_progress = "In progress",
        out_of_schedule = "Out of schedule",
        delivered = "Delivered",
        completed = "Completed",
        canceled = "Canceled",
        disputed = "Dispusted",
}





