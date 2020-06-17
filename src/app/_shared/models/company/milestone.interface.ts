export interface IMilestones{
    milestones:IMilestone[],
    companyId?:string;
    isAdmin?:boolean;
    langs?:string[];
}

export interface IMilestone{
    id?: string;
    title?: string;
    description?:string;
    year?: number;
    _type?:string;
    _close?:boolean;
}

