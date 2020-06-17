import { IFile } from "../files.interface";

export interface ICompanyGalleries {
    galleries?:ICompanyGallery[];
    isAdmin?:boolean;
    companyId?:string;
    
}

export interface ICompanyGallery{
    id?: string
    userID?: string
    companyID?: string
    officeID?: string
    files?: IFile[]
    created_at?: string;

    
    _close?:boolean;
    _type?:string;
}