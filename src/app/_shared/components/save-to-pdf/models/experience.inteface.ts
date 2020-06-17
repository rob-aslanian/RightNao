export interface IExperience{
    title:string;
    company:string;
    startDate:Date;
    finishDate?:Date;
    currently?:boolean;
    location?:string;
    description?:string;
}