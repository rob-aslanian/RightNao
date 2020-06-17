export interface IFile{
    id?:string;
    file?: any;
    icon?:string,
    name?:string,
    ext?:string,
    isImage?:boolean;
    address?:string;
    mime_type?:string;
    status?:string;
    base64?:string;
}