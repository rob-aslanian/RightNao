export type NewsFeedPostType = 'posts' | 'shares' | 'any' | "landing";


export type NewsFeedTagsType = 'user' | 'company' |
                               'community' | 'organization' | 'group';



export type NewsFeedLikeType = 'user' | 'company' | 'organization';

export const NEWS_FEED_REACTION = {
    no_reaction:{
        text:"Like",
        type:'no_reaction',
        img:"assets/img/506.svg"
    },
    like:{
        text:'Like',
        type:'like',
        img:'assets/img/500.svg',
        hidden:false
    },
    heart:{
        text:'Love',
        type:'heart',
        img:'assets/img/501.svg',
        hidden:false
    },
    clap:{
        text:'Congrats',
        type:'clap',
        img:'assets/img/504.svg',
        hidden:false
    },
    rocket:{
        text:'Brilliant',
        type:'rocket',
        img:'assets/img/505.svg',
        hidden:false
    },
    stop:{
        text:'Rejection',
        type:'stop',
        img:'assets/img/502.svg',
        hidden:false
    },
    hmm:{
        text:'Who cares',
        type:'hmm',
        img:'assets/img/503.svg',
        hidden:false
    },
    shit:{
        text:'Shit',
        type:'shit',
        img:'assets/img/shit.svg',
        hidden:true
    },
    _enum:['heart' , 'like' , 'clap' ,  'rocket' , 'stop' , 'hmm'  , 'shit']
}
