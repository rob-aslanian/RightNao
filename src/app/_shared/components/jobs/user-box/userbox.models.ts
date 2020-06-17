export const UserBoxActions = [
    {   id:'Favorite',
        name:'Favorite',
        icon:'assets/img/164.svg'
    },
    {
        id:'In_review',
        name:'In Review',
        icon:'assets/img/220.svg'
    },
    {
        id:'Disqualified',
        name:'Disqualified',
        icon:'assets/img/219.svg'
    },
    {
        id:"None",
        name:'Remove',
        icon:'assets/img/165.svg'
    },
]

export interface ISetJobCategory {
    companyId?: string;
    jobId?: string;
    applicationId?: string;
    category?: JobCategory
}

export interface ISetSeenJob {
    companyId?: string;
    jobId?: string;
    applicationId?: string;
    seen?: boolean;
}

export type JobCategory = 'None' | 'Favorite' |
                          'In_review' | 'Disqualified';

export interface IEmitSetCategory {
    category:JobCategory , 
    userId:string
}