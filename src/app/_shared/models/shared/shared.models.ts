export const FileIcons = {
    zip:{ icon:'/assets/img/140.svg' },
    mp3:{ icon:'/assets/img/141.svg' },
    ppt:{ icon:'/assets/img/142.svg' },
    xls:{ icon:'/assets/img/143.svg' },
    xlsx:{ icon:'/assets/img/143.svg' },
    doc:{ icon:'/assets/img/144.svg' },
    pdf:{ icon:'/assets/img/145.svg' },
    _other:{ icon:'/assets/img/268.svg' },
}

export interface ICompanyConversation {
    companyId: string;
    name: string;
    avatar: string;
    id:string;
}

export const DATE_POSTED = [
    {id:'anytime',name:'Any Time'},
    {id:'past_24_hours',name:'Past 24 Hours'},
    {id:'past_week',name:'Past Week'},
    {id:'past_month',name:'Past Month'},
];

export interface IUserConversation {
    id?:string;
    name?:string;
    avatar?:string;
}

export interface IProfilePopup{
    profileId?:string,
    isCompany?:boolean,
    isFollowed?:boolean,
    isBlocked?:boolean,
    isFavorite?:boolean;
    isConnect?:boolean;
    isFriendRequest?:boolean;
    canAddInFavourites?: boolean;
}

export interface IProfilePopupSettings{
    right?:string | number;
    left?:string | number;
    top?:string | number;
    bottom?:string | number;
}

export interface IUserProfile {
    id?:string,
    url?: string;
    avatar?: string;
    firstname?: string;
    lastname?: string;
}


export interface ICompanyProfile {
    id?:string,
    url?: string;
    avatar?: string;
    name?:string;
}

export type FileType = 'image' | 'video' | 'other' | 'none';


export const Job_Period = [
    {id:'Any',name:'Any'},
    {id:'Month',name:'Monthly'},
    {id:'Hour',name:'Hourly'},
    {id:'Year',name:'Annual'},
];

export const DefaultDegrees = [
    {
        name:"Associate Degree",
        isSelected:false
    },
    {
        name:"Bachelor Degree",
        isSelected:false
    },
    {
        name:"Master Degree",
        isSelected:false
    },
    {
        name:"Doctoral Degree",
        isSelected:false
    },
    {
        name:"Professional Degree",
        isSelected:false
    },
]
export  enum LanguageEnum {
    "Beginner" = 1,
    "Elementary",
    "Intermediate",
    "Advanced",
    "Native"
}

export const ProfileCreated = {
    company:[
        {
            name:"Brand",
            icon:"assets/img/655.svg",
            disabled:true
        },
        {
            name:"v-Office",
            icon:"assets/img/653.svg",
            link:"/v-office/open",
        },
        {
            name:"v-Shop",
            icon:"assets/img/20.svg",
            disabled:true
        },
        {
            name:"Group",
            icon:"assets/img/651.svg",
            link:"/registration/groups",
        },
        {
            name:'My Business',
            icon:'assets/img/652.svg',
            disabled:false,
            link: '/services/my-business'
          }
    ],
    user:[
        {
          name:"Group",
          icon:"assets/img/651.svg",
          link:"/registration/groups"
        },
        {
          name:'My Business',
          icon:'assets/img/652.svg',
          disabled:false,
          link: '/services/my-business'
        }

    ]
}


export const RecommendationRelation = [
    {
        id:"experience",
        name:"%_% managed you directly"
    },
    {
        id:"experience",
        name:"%_% reported directly to you"
    },
    {
        id:"experience",
        name:"%_% was senior to you but didn't manage directly"
    },
    {
        id:"experience",
        name:"You were senior to %_% but didn't manage directly"
    },
    {
        id:"experience",
        name:"%_% worked with you but in different groups"
    },
    {
        id:"experience",
        name:"%_% worked with you but at different companies"
    },
    {
        id:"experience",
        name:"You were a client of %_%"
    },
    {
        id:"experience",
        name:"%_% was a client of yours"
    },
    {
        id:"education",
        name:"%_% taught you"
    },
    {
        id:"accomplishment",
        name:"%_% mentored you"
    },
    {
        id:"education",
        name:"You were students together"
    },
]