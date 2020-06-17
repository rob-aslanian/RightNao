import { IFile } from "../files.interface";
import { ILink, IAddLink } from "./experience.interface";

export interface IAccomplishent{
    accomplishments?:IAccomplishents[],
    isAdmin?:boolean;
}


export interface IAccomplishents{
    id?:string;
    title?: string;
    name?:string;
    issuer?: string;
    date?: string;
    publication?:string;
    certification_authority?: string;
    license_number?: string;
    start_date?: string;
    finish_date?: string;
    is_expire?: boolean;
    url?: string;
    description?: string;
    score?: number;

    file?: IFile[]
    link?: ILink[];
    files_id?: string[];
    links_Id?: IAddLink[];
    publisher?:string
    _type?:string;
    _close?:boolean;
    __typename?:string;
}

