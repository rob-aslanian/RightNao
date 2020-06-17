
export const BannerAdvirtismentType = [
    {
        type:"user_profile_and_network",
        name:"Ad in User Profile and Netwok"
    },
    {
        type:"company_organization_and_network",
        name:"Ad in Companies & Organizations Profile and Netwok"
    },
    {
        type:"user_job",
        name:"Ad in Jobs"
    },
    {
        type:"company_organization_and_job",
        name:"Ad in Companies & Organizations Jobs"
    },
]

export const adCategories = [
    {
        title: 'General Ad',
        icon: 'assets/img/ads/adCategory/702.svg',
        formats: ['IMAGE', 'RESPONSIVE', 'SPOTLIGHT', 'SINGLE_IMAGE', 'CAROUSEL', 'VIDEO', 'MESSAGE'],
        type: 'banner',
        active: true
    },
    {
        title: 'Candidate Ad',
        icon: 'assets/img/ads/adCategory/647.svg',
        formats: ['SIDE_PIN_2', 'HEAD_PIN_2', 'CANDIDATE_SEARCH'],
        type: 'candidate',
        active: true
    },
    {
        title: 'Professional Ad',
        icon: 'assets/img/ads/adCategory/648.svg',
        formats: ['SIDE_PIN_2', 'HEAD_PIN_2', 'PROFESSIONAL_SEARCH'],
        type: 'professional',
        active: true
    },
    {
        title: 'Company Ad',
        icon: 'assets/img/ads/adCategory/649.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'BUSINESS_SEARCH'],
        type: 'company',
        active: true
    },
    {
        title: 'Organization Ad',
        icon: 'assets/img/ads/adCategory/650.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'BUSINESS_SEARCH'],
        type: 'organization',
        active: false
    },
    {
        title: 'Office Ad',
        icon: 'assets/img/ads/adCategory/703.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'OFFICE_SEARCH'],
        type: 'office',
        active: true
    },
    {
        title: 'Service Ad',
        icon: 'assets/img/ads/adCategory/710.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'SERVICE_SEARCH'],
        type: 'service',
        active: true
    },
    {
        title: 'Shop Ad',
        icon: 'assets/img/ads/adCategory/704.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'SHOP_SEARCH'],
        type: 'shop',
        active: false
    },
    {
        title: 'Product Ad',
        icon: 'assets/img/ads/adCategory/709.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'PRODUCT_SEARCH'],
        type: 'product',
        active: false
    },
    {
        title: 'Job Ad',
        icon: 'assets/img/ads/adCategory/705.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'JOB_SEARCH'],
        type: 'job',
        active: true
    },
    {
        title: 'Real Estate Ad',
        icon: 'assets/img/ads/adCategory/706.svg',
        formats: ['SIDE_PIN_1', 'HEAD_PIN_1', 'ESTATE_SEARCH'],
        type: 'real_estate',
        active: false
    },
    {
        title: 'Auto Indusry Ad',
        icon: 'assets/img/ads/adCategory/707.svg',
        formats: [],
        type: 'auto',
        active: false
    },
    {
        title: 'Brand Ad',
        icon: 'assets/img/ads/adCategory/708.svg',
        formats: [],
        type: 'brand',
        active: false
    }
]


export const adFormats = {
    'IMAGE': {
        title: 'Image Ad',
        type: 'IMAGE',
        icon: 'assets/img/ads/adFormats/banner.svg',
        description: 'Create ads using a single image that will show up in the right column banner ad'
    },
    'RESPONSIVE': {
        title: 'Responsive Ad',
        type: 'RESPONSIVE',
        icon: 'assets/img/ads/adFormats/responsive.svg',
        description: 'Create ads using a single image and text that will show up in the right column banner ad'
    },
    'SPOTLIGHT': {
        title: 'Spotlight Ad',
        type: 'SPOTLIGHT',
        icon: 'assets/img/ads/adFormats/spotlight.svg',
        description: 'Create text-based ads that will show up in the right column banner ad'
    },
    'SINGLE_IMAGE': {
        title: 'Single Image Ad',
        type: 'SINGLE_IMAGE',
        icon: 'assets/img/ads/adFormats/single_image.svg',
        description: 'Create ads using a single image that will show up in the newsfeed'
    },
    'CAROUSEL': {
        title: 'Carousel Image Ad',
        type: 'CAROUSEL',
        icon: 'assets/img/ads/adFormats/carousel.svg',
        description: 'Create ads with 2 or more images that will show up in the newsfeed'
    },
    'MESSAGE': {
        title: 'Message Ad',
        type: 'MESSAGE',
        icon: 'assets/img/ads/adFormats/message.svg',
        description: 'Create ads that are delivered to your target audience`s Rightnao messaging'
    },
    'SIDE_PIN_1': {
        title: 'Side Pin Ad',
        type: 'SIDE_PIN',
        icon: 'assets/img/ads/adFormats/side_pin_1.svg',
        description: 'Ad is delivered to your target audience`s on side bar of the feed'
    },
    'HEAD_PIN_1': {
        title: 'Head Pin Ad',
        type: 'HEAD_PIN',
        icon: 'assets/img/ads/adFormats/head_pin_1.svg',
        description: 'Ad is delivered to your target audience`s on head bar of the feed'
    },
    'PROFESSIONAL_SEARCH': {
        title: 'Professional Search Ad',
        type: 'PROFESSIONAL_SEARCH',
        icon: 'assets/img/ads/adFormats/professional.svg',
        description: 'Ads show up as a top result of the professional search'
    },
    'BUSINESS_SEARCH': {
        title: 'BusinessSearch Ad',
        type: 'BUSINESS_SEARCH',
        icon: 'assets/img/ads/adFormats/business.svg',
        description: 'Ads show up as a top result of the business search'
    },
    'OFFICE_SEARCH': {
        title: 'Office Search Ad',
        type: 'OFFICE_SEARCH', //OFFICE_SEARCH
        icon: 'assets/img/ads/adFormats/office.svg',
        description: 'Ads show yp a top result of the office search'
    },
    'VIDEO': {
        title: 'Video Ad',
        type: 'VIDEO',
        icon: 'assets/img/ads/adFormats/video.svg',
        description: 'Create ads using a video that will show up newsfeed'
    },
    'SERVICE_SEARCH': {
        title: 'Service Search Ad',
        type: 'SERVICE_SEARCH',
        icon: 'assets/img/ads/adFormats/service.svg',
        description: 'Ads show up as a top result of the service search'
    },
    'SHOP_SEARCH': {
        title: 'Shop Search Ad',
        type: 'SHOP_SEARCH',
        icon: 'assets/img/ads/adFormats/shop.svg',
        description: 'Ads show up as a top result of the shop search'
    },
    'PRODUCT_SEARCH': {
        title: 'Product Search Ad',
        type: 'PRODUCT_SEARCH',
        icon: 'assets/img/ads/adFormats/product.svg',
        description: 'Ads show up as a top result of the product search'
    },
    'ESTATE_SEARCH': {
        title: 'Real Estate Search Ad',
        type: 'ESTATE_SEARCH',
        icon: 'assets/img/ads/adFormats/real_estate.svg',
        description: 'Ads show up as a top result of the real estate search'
    },
    'JOB_SEARCH': {
        title: 'Job Search Ad',
        type: 'JOB_SEARCH',
        icon: 'assets/img/ads/adFormats/jobs.svg',
        description: 'Ads show up as a top result of the job search'
    },
    'SIDE_PIN_2': {
        title: 'Side Pin Ad',
        type: 'SIDE_ROUND_PIN',
        icon: 'assets/img/ads/adFormats/side_pin_2.svg',
        description: 'Ad is delivered to your target audience`s on side bar of the feed'
    },
    'HEAD_PIN_2': {
        title: 'Head Pin Ad',
        type: 'HEAD_ROUND_PIN',
        icon: 'assets/img/ads/adFormats/head_pin_2.svg',
        description: 'Ad is delivered to your target audience`s on head bar of the feed'
    },
    'CANDIDATE_SEARCH': {
        title: 'Candidate Search Ad',
        type: 'CANDIDATE_SEARCH',
        icon: 'assets/img/ads/adFormats/candidate.svg',
        description: 'Ads show up as a top result of the candidate search'
    }

}

export const campaignStatus = {
    'draft': {
        text: 'Draft',
        icon: ''
    },
    'active': {
        text:  'Active',
        icon: 'assets/img/211.svg' 
    },
    'in_active': {
        text:  'Inactive',
        icon: 'assets/img/163.svg' 
    },
    'not_running': {
        text:  'Not Running',
        icon: '' 
    },
    'rejected': {
        text:  'Rejected',
        icon: '' 
    },
    'paused': {
        text:  'Paused',
        icon: 'assets/img/214.svg' 
    },
    'complited': {
        text:  'Completed',
        icon: 'assets/img/213.svg' 
    },
}


