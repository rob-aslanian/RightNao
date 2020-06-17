import { IFile } from "../files.interface";
import { ILocation } from "../shared/location.interface";

export interface IUserExperience{
    id?: string;
    title?: string;
    company?: string;
    location?: ILocation;
    country?: string;
    start_date?: string;
    finish_date?: string;
    currently?: boolean;
    description?: string;
    file?: IFile[];
    link?: ILink[] | IAddLink[];

     
    _type?:string;
    _close?:boolean;

}


export interface IAddExperience{
    position?: string;
    company?: string
    city?:ILocation;
    city_id?: string;
    country?: string;
    start_date?: string;
    finish_date?: string;
    currently_work?: boolean;
    description?: string;
    links?:IAddLink[];         
    files_id?: string[];
    file?: IFile[];
    id?: string
}


export interface IAddLink{
    url?:string;
}


export interface ILink{
    id?: string;
    address?: string;
    url?:string;
}

