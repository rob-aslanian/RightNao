import { ILocation } from "../shared/location.interface";
import { IMediaFile } from "../shared/files.interface";
import { IMediaLink } from "../shared/links.interface";
import { IFile } from "../files.interface";

export interface IEducation{
    id?: string ;
    school?:string;
    degree?:string;
    field_study?:string;
    grade?: string;
    start_date?: string;
    finish_date?:string;
    currently_study?: boolean;
    description?: string;
    file?: IFile[];
    files_id?:string[];
    link?:IMediaLink[];
    links?:IMediaLink[];

    _type?:string;
    _close?:boolean;

}
