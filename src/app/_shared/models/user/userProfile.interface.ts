export interface IUserProfile {
    avatar?: string;
    id?: string;
    name?: string;
    url?: string;
    is_2fa_requeried?:boolean;
    sendOnEnter?:boolean;
    has_vOffice?:boolean;
    network_info?: INetwork;
    companies?: any[];
    gender?:string;
    email?:string;
}


interface INetwork {
    connections?: number
    followings?: number
    followers?: number
}

export interface ISavedUser  {
    id?:string;
    avatar?:string,
    username?:string,
    firstName?:string;
    lastName?:string;
    lastVisit?:number;
    status?:string;
    password?:string;

}