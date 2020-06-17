import { ILink } from "../user/experience.interface";
import { IFile } from "../files.interface";

export interface IAwards{
    awards?:IAward[],
    companyId?:string;
    isAdmin?:boolean;
    langs?:string[];
}

export interface IAward{
    id?:string;
    title?: string;
    issuer?: string;
    year?: number;
    files_id?:string[];
    file?: IFile[]
    link?:ILink[];


    _close?:boolean;
    _type?:string;
}