 

export class urlLinks {
    
    profileUrl: string;
    userId:     string;
    activeProfile: string ;
    isMale: boolean ;

    constructor( profileUrl, userId, activeProfile, isMale ) {
        this.profileUrl = profileUrl;
        this.userId = userId;   
        this.activeProfile =  activeProfile;
        this.isMale = isMale;
    }
    getLinks() {
         if( this.activeProfile === 'user' ) {
              return this.getUserLinks();
         }
         else {
              return  this.getCompanyLinks();
         }
    }
 

    getCompanyLinks() {
        return   [
            {
                name: "Company",
                icon: 'assets/img/menu-icons/new/profile-company.svg',
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Profile',
                        icon: 'assets/img/menu-icons/new/profile_6.svg',
                        path: this.profileUrl
                    },
                    { 
                        name: 'Web Page',
                        icon: 'assets/img/menu-icons/new/newsfeed_2.svg',
                        path: '/comming_soon/web_page'
                    },
                    { 
                        name: 'My Wall',
                        icon: 'assets/img/menu-icons/new/newsfeed_2.svg',
                        path: `${this.profileUrl}/wall/${this.userId}`
                        
                    },
                    { 
                        name: 'Network',
                        icon: 'assets/img/menu-icons/new/network_2.svg',
                        path: '/network-company/landing'
                    },
                    { 
                        name: 'Contacts',
                        icon: 'assets/img/menu-icons/new/contact_3.svg',
                        path: '/comming_soon/contacts'
                    },
                    { 
                        name: 'Groups',
                        icon: 'assets/img/menu-icons/new/group_2.svg',
                        path: '/comming_soon/groups'
                    },
                    { 
                        name: 'Brand',
                        icon: 'assets/img/menu-icons/new/business_2.svg',
                        path: '/comming_soon/brand'
                    },
                    { 
                        name: 'Saves',
                        icon: 'assets/img/menu-icons/new/saves_3.svg',
                        path: '/comming_soon/saves'
                    },
                    { 
                        name: 'Advertise',
                        icon: 'assets/img/menu-icons/new/ads_2.svg',
                        path: '/ads'
                    },
                    { 
                        name: 'Badges',
                        icon: 'assets/img/menu-icons/new/badges_3.svg',
                        path: '/comming_soon/badges'
                    }
                ]
            },
            {
                name:"Interact",
                icon:'assets/img/menu-icons/new/interact_2.svg',
                hasChildren: true,
                childrens:[
                    { 
                        name: 'ChatNao',
                        icon: 'assets/img/menu-icons/new/chatnao_2.svg',
                        path: '/messaging'
                    },
                    { 
                        name: 'Email',
                        icon: 'assets/img/menu-icons/new/email_3.svg',
                        path: '/comming_soon/email'
                    },
                    { 
                        name: 'News Feed',
                        icon: 'assets/img/menu-icons/new/network_2.svg',
                        path: `/news_feed` 
                    },
                    { 
                        name: 'Call',
                        icon: 'assets/img/menu-icons/new/call_3.svg',
                        path: '/comming_soon/call'
                    },
                    { 
                        name: 'Calendar',
                        icon: 'assets/img/menu-icons/new/calendar_3.svg',
                        path: '/comming_soon/calendar'
                    },
                    { 
                        name: 'Tasks',
                        icon: 'assets/img/menu-icons/new/tasks_3.svg',
                        path: '/comming_soon/tasks'
                    },
                    { 
                        name: 'Notes',
                        icon: 'assets/img/menu-icons/new/notes_3.svg',
                        path: '/comming_soon/notes'
                    },
                    {
                        name: 'Notice Board',
                        path: '/comming_soon/notice_board',
                        icon: ''
                    },
                    {
                        name: 'Whiteboard',
                        path: '/comming_soon/whiteboard',
                        icon: ''
                    },
                    {
                        name: 'Storage',
                        path: '/comming_soon/stoarage',
                        icon: ''
                    }
                ]
            },
            {
                name:"HRM",
                icon:"assets/img/menu-icons/new/job_2.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Post a Job',
                        icon: 'assets/img/menu-icons/new/post_2.svg',
                        path: '/jobs/company/post-a-job'
                    },
                    { 
                        name: 'Candidates',
                        icon: 'assets/img/menu-icons/new/candidates_2.svg',
                        path: '/search/candidate'
                    },
                    { 
                        name: 'Jobs',
                        icon: 'assets/img/menu-icons/new/job_2.svg',
                        path: '/jobs/company/dashboard/my-jobs'
                    },
                    { 
                        name: 'Career Center',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/career_center/company/my_center'
                    },
                    { 
                        name: 'Volunteer',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/volunteer'
                    },
                    { 
                        name: 'Internship',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/intership'
                    },
                    { 
                        name: 'Exchange',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/exchange'
                    },
                ]
            },
            {
                name:"Services",
                icon:"assets/img/menu-icons/new/services_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Requests',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/services/requests'
                    },
                    { 
                        name: 'Manage',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/services/manage'
                    },
                    { 
                        name: 'Services',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/services/main'
                    },
                ]
            },
            {
                name:"Products",
                icon:"assets/img/menu-icons/new/products_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Products',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/products'
                    },
                    { 
                        name: 'Second-hand',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/second-hand'
                    },
                    { 
                        name: 'My Orders',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/my_orders'
                    },
                    { 
                        name: 'Group Deals',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/group_deals'
                    },
                    { 
                        name: 'Auction',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/auction'
                    },
                    { 
                        name: 'Reviews',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/reviews'
                    },
                    { 
                        name: 'Affiliate',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/affiliate'
                    },
                    { 
                        name: 'Discounts',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/discounts'
                    }
                ]
            },
            {
                name:"Search",
                icon:"assets/img/menu-icons/new/search_2.svg",
                disabled: false,
                path: '/search',
                hasChildren: false,
                childrens:[ ]
            },
            {
                name:"Finance",
                icon:"assets/img/menu-icons/new/finance_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Wallet',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/wallet'
                    },
                    { 
                        name: 'Exchange',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/exchange'
                    },
                    { 
                        name: 'Crowdfund',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/crowdfund'
                    },
                    { 
                        name: 'Donate',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/donate'
                    },
                    { 
                        name: 'Sponsoring',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/sponsoring'
                    },
                    { 
                        name: 'Credit',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/credit'
                    },
                    { 
                        name: 'Insurance',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/insurance'
                    },
                    { 
                        name: 'Investment',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/investment'
                    },
                    
                 ]
            },
            {
                name:"Maps",
                icon:"assets/img/menu-icons/new/maps_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[ 
                    { 
                        name: 'Maps',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/maps'
                    },
                    { 
                        name: 'Directions',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/directions'
                    },
                    { 
                        name: 'Interactive',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/interactive'
                    },
                    { 
                        name: 'My Maps',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/my_maps'
                    },
                    { 
                        name: 'Weather',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/weather'
                    },
                    { 
                        name: 'Economics',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/economics'
                    },
                    { 
                        name: 'Satellite',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/satelite'
                    },
                    { 
                        name: 'Planning',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/planning'
                    },
    
                ]
            },
            {
                name:"Play",
                icon:"assets/img/menu-icons/new/play_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Photos',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/play'
                    },
                    { 
                        name: 'Pictures',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/pictures'
                    },
                    { 
                        name: 'Videos',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/videos'
                    },
                    { 
                        name: 'Movies',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/movies'
                    },
                    { 
                        name: 'Audio',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/audio'
                    },
                    { 
                        name: 'Music',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/music'
                    },
                    { 
                        name: 'Podcasts',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/products'
                    },
                    { 
                        name: 'Radio',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/radio'
                    },
                    { 
                        name: 'Games',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/games'
                    },
                    { 
                        name: 'm-Games',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/m-games'
                    },
                    
    
                 ]
            },
            {
                name:"Living",
                icon:"assets/img/menu-icons/new/living_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Rent',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/rent'
                    },
                    { 
                        name: 'Travel',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/travel'
                    },
                    { 
                        name: 'Eat',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/eat'
                    },
                    { 
                        name: 'Shop',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/shop'
                    },
                    { 
                        name: 'Attractions',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/attractions'
                    },
                    { 
                        name: 'Planning',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/planning'
                    },
                    { 
                        name: 'Health',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/health'
                    },
                    { 
                        name: 'Esthetics',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/esthetics'
                    },
                 ]
            },
            {
                name:"Events",
                icon:"assets/img/menu-icons/new/email_3.svg",
                disabled: false,
                hasChildren: false,
                path: '/comming_soon/events',
                childrens:[ ]

            },
            {
                name:"More",
                icon:"assets/img/menu-icons/new/more_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Feedback',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/registration/feedback'
                    },
                    { 
                        name: 'Help',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/help'
                    },
                    { 
                        name: 'I Will',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/i_will'
                    },
                 ]
            }
     
         ]
   
    }

    getUserLinks() {
        return   [
            {
                name: "Digital Me",
                icon: this.isMale ? 'assets/img/menu-icons/new/digital_2_1.svg' : 'assets/img/menu-icons/new/digital_1_1.svg',
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Profile',
                        icon: 'assets/img/menu-icons/new/profile_2.svg',
                        path: this.profileUrl
                    },
                    { 
                        name: 'Portfolio',
                        icon: 'assets/img/menu-icons/new/portfolio_3.svg',
                        path: `${this.profileUrl}/portfolio/${this.userId}`
                    },
                    { 
                        name: 'My Wall',
                        icon: 'assets/img/menu-icons/new/newsfeed_2.svg',
                        path: `${this.profileUrl}/wall/${this.userId}`
                    },
                    { 
                        name: 'Network',
                        icon: 'assets/img/menu-icons/new/network_2.svg',
                        path: '/network/landing'
                    },
                    { 
                        name: 'Contacts',
                        icon: 'assets/img/menu-icons/new/contact_3.svg',
                        path: '/network/contacts'
                    },
                    { 
                        name: 'Groups',
                        icon: 'assets/img/menu-icons/new/group_2.svg',
                        path: '/comming_soon/groups'
                    },
                    { 
                        name: 'My Business',
                        icon: 'assets/img/menu-icons/new/business_2.svg',
                        path: '/services/my-business'
                    },
                    { 
                        name: 'Saves',
                        icon: 'assets/img/menu-icons/new/saves_3.svg',
                        path: '/comming_soon/saves'
                    },
                    { 
                        name: 'Statistics',
                        icon: 'assets/img/menu-icons/new/statistics_2.svg',
                        path: '/comming_soon/statistic'
                    },
                    { 
                        name: 'Reward',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/reward'
                    },
                    { 
                        name: 'Badges',
                        icon: 'assets/img/menu-icons/new/badges_3.svg',
                        path: '/comming_soon/badges'
                    }
                ]
            },
            {
                name:"Interact",
                icon:'assets/img/menu-icons/new/interact_2.svg',
                hasChildren: true,
                childrens:[
                    { 
                        name: 'ChatNao',
                        icon: 'assets/img/menu-icons/new/chatnao_2.svg',
                        path: '/messaging'
                    },
                    { 
                        name: 'Email',
                        icon: 'assets/img/menu-icons/new/email_3.svg',
                        path: '/comming_soon/email'
                    },
                    { 
                        name: 'News Feed',
                        icon: 'assets/img/menu-icons/new/newsfeed_2.svg',
                        path: `/news_feed`
                    },
                    { 
                        name: 'Call',
                        icon: 'assets/img/menu-icons/new/call_3.svg',
                        path: '/comming_soon/call'
                    },
                    { 
                        name: 'Calendar',
                        icon: 'assets/img/menu-icons/new/calendar_3.svg',
                        path: '/comming_soon/calendar'
                    },
                    { 
                        name: 'Tasks',
                        icon: 'assets/img/menu-icons/new/tasks_3.svg',
                        path: '/comming_soon/tasks'
                    },
                    { 
                        name: 'Notes',
                        icon: 'assets/img/menu-icons/new/notes_3.svg',
                        path: '/comming_soon/notes'
                    },
                    {
                        name: 'Notice Board',
                        path: '/comming_soon/notice_board',
                        icon: 'assets/img/menu-icons/new/Icn2.svg'
                    },
                    {
                        name: 'Whiteboard',
                        path: '/comming_soon/whiteboard',
                        icon: 'assets/img/menu-icons/new/Icn2.svg'
                    },
                    {
                        name: 'Storage',
                        path: '/comming_soon/storage',
                        icon: 'assets/img/menu-icons/new/Icn2.svg'
                    }
                ]
            },
            {
                name:"Work",
                icon:"assets/img/menu-icons/new/job_2.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Jobs',
                        icon: 'assets/img/menu-icons/new/job_2.svg',
                        path: '/jobs/user'
                    },
                    { 
                        name: 'Career',
                        icon: 'assets/img/menu-icons/new/career_2.svg',
                        path: '/jobs/user/carrer-interest'
                    },
                    { 
                        name: 'Career Center',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/career_center/user'
                    },
                    { 
                        name: 'Manage',
                        icon: 'assets/img/menu-icons/new/manage_2.svg',
                        path: '/jobs/user/dashboard/saved'
                    },

                    { 
                        name: 'Advertise',
                        icon: 'assets/img/menu-icons/new/ads_2.svg',
                        path: '/ads'
                    },

                    { 
                        name: 'Volunteer',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/volunteer',
                    },
                    { 
                        name: 'Internship',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/internship',
                    },
                    { 
                        name: 'Exchange',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/exchange',
                    },
                ]
            },
            {
                name:"Services",
                icon:"assets/img/menu-icons/new/services_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Requests',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/services/requests'
                    },
                    { 
                        name: 'Manage',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/services/manage',
                    },
                    { 
                        name: 'Services',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/services/main',
                    },
                ]
            },
            {
                name:"Products",
                icon:"assets/img/menu-icons/new/products_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Products',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/products',
                    },
                    { 
                        name: 'Second-hand',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/second_hand',
                    },
                    { 
                        name: 'My Orders',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/my_orders',
                    },
                    { 
                        name: 'Group Deals',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/group_deals',
                    },
                    { 
                        name: 'Auction',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/auction',
                    },
                    { 
                        name: 'Reviews',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/reviews',
                    },
                    { 
                        name: 'Affiliate',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/affiliate',
                    },
                    { 
                        name: 'Discounts',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/discounts',
                    }
                ]
            },
            {
                name:"Search",
                icon:"assets/img/menu-icons/new/search_2.svg",
                disabled: false,
                path: '/search',
                hasChildren: false,
                childrens:[ ]
            },
            {
                name:"Finance",
                icon:"assets/img/menu-icons/new/finance_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Wallet',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/wallet'
                    },
                    { 
                        name: 'Exchange',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/exchange',
                    },
                    { 
                        name: 'Crowdfund',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/crowdfund',
                    },
                    { 
                        name: 'Donate',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/donate',
                    },
                    { 
                        name: 'Sponsoring',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/sponsoring',
                    },
                    { 
                        name: 'Credit',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/credit',
                    },
                    { 
                        name: 'Insurance',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/insurance',
                    },
                    { 
                        name: 'Investment',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/investment',
                    },
                    
                 ]
            },
            {
                name:"Maps",
                icon:"assets/img/menu-icons/new/maps_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[ 
                    { 
                        name: 'Maps',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/maps',
                    },
                    { 
                        name: 'Directions',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/directions',
                    },
                    { 
                        name: 'Interactive',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/interactive',
                    },
                    { 
                        name: 'My Maps',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/my_maps',
                    },
                    { 
                        name: 'Weather',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/weather',
                    },
                    { 
                        name: 'Economics',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/economics',
                    },
                    { 
                        name: 'Satellite',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/satellite',
                    },
                    { 
                        name: 'Planning',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/planning',
                    },
    
                ]
            },
            {
                name:"Play",
                icon:"assets/img/menu-icons/new/play_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Photos',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/photos',
                    },
                    { 
                        name: 'Pictures',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/pictures',
                    },
                    { 
                        name: 'Videos',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/videos',
                    },
                    { 
                        name: 'Movies',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/movies',
                    },
                    { 
                        name: 'Audio',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/audio',
                    },
                    { 
                        name: 'Music',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/music',
                    },
                    { 
                        name: 'Podcasts',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/podcasts',
                    },
                    { 
                        name: 'Radio',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/radio',
                    },
                    { 
                        name: 'Games',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/games',
                    },
                    { 
                        name: 'm-Games',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/m-Games',
                    },
                    
    
                 ]
            },
            {
                name:"Living",
                icon:"assets/img/menu-icons/new/living_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Rent',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/rent',
                    },
                    { 
                        name: 'Travel',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/travel',
                    },
                    { 
                        name: 'Eat',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/eat',
                    },
                    { 
                        name: 'Shop',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/shop',
                    },
                    { 
                        name: 'Attractions',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/attractions',
                    },
                    { 
                        name: 'Planning',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/planning',
                    },
                    { 
                        name: 'Health',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/healt',
                    },
                    { 
                        name: 'Esthetics',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/esthetics',
                    }
                 ]
            },
            {
                name:"Classifields",
                icon:"assets/img/menu-icons/new/ads_2.svg",
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Real Estate',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/real-estate/landing/DealType_Any'
                    },
                    { 
                        name: 'Vechiles',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/cars/landing/CAR'
                    },
                    { 
                        name: 'Pets & Plants',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/pets/landing/Category_Animals'
                    },
                    { 
                        name: 'Services',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/ads-services/landing-page'
                    },
                    { 
                        name: 'For-Sale',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/for-sale/landing-page',
                    },
                    { 
                        name: 'Community',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/for-sale/landing-page/ads'
                    },
                    { 
                        name: 'Others',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/Others'
                    },
                 ]
            },

            {
                name:"More",
                icon:"assets/img/menu-icons/new/events_3.svg",
                disabled: false,
                hasChildren: true,
                childrens:[
                    { 
                        name: 'Feedback',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/registration/feedback'
                    },
                    { 
                        name: 'Help',
                        icon: 'assets/img/menu-icons/new/Icn2.svg',
                        path: '/comming_soon/help',
                    },
                    // { 
                        
                    //     name: 'I Will',
                    //     icon: '',
                    //     path: ''
                    // },
                 ]
            }
            /// Shared Links ////
         ]
   
    }
    
};
