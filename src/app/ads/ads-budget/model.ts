export const adsImpressions = [
    {
        name: '$50',
        description: '1,000 impressions',
        active: false,
        value: {
            price: 50,
            count: 1000
        }
    },
    {
        name: '$70',
        description: '3,000 impressions',
        active: false,
        value: {
            price: 70,
            count: 3000
        }
    },
    {
        name: 'Custom',
        description: 'Select impressions',
        active: false,
        value: {
            price: 0,
            count: 0
        }
    }
]
export const adsClicks = [
    {
        name: '$50',
        description: '100 Clicks',
        active: false,
        value: {
            price: 50,
            count: 100
        }
    },
    {
        name: '$70',
        description: '300 Clicks',
        active: false,
        value: {
            price: 70,
            count: 300
        }
    },
    {
        name: 'Custom',
        description: 'Select Clicks',
        active: false,
        value: {
            price: 0,
            count: 0
        }
    }
]

export const adsForwards = [
    {
        name: '$10',
        mark: '($1 per forward)',
        description: '10 forwards',
        active: false,
        price_per: 1,
        value: {
            price: 10,
            count: 10
        }
    },
    {
        name: '$30',
        mark: '($1 per forward)',
        description: '30 forwards',
        active: false,
        price_per: 1,
        value: {
            price: 30,
            count: 30
        }
    },
    {
        name: 'Custom',
        description: 'Select forwards and price per forward',
        active: false,
        price_per: 1,
        value: {
            price: 0,
            count: 0
        }
    }
]

export const adsReferrals = [
    {
        name: '$10',
        mark: '($1 per referrals)',
        description: '10 referrals',
        active: false,
        price_per: 1,
        value: {
            price: 10,
            count: 10
        }
    },
    {
        name: '$30',
        mark: '($1 per referrals)',
        description: '30 referrals',
        active: false,
        price_per: 1,
        value: {
            price: 30,
            count: 30
        }
    },
    {
        name: 'Custom',
        description: 'Select referrals and price per referral',
        active: false,
        price_per: 1,
        value: {
            price: 0,
            count: 0
        }
    }
]


export const openBox = {
    0: {
      title: 'impressions',  
      open: false,
      selectedCards: -1
    },
    1: {
        title: 'clicks',
      open: false,
      selectedCards: -1
    }
    ,
    2: {
        title: 'forwarding',
        open: false,
        selectedCards: -1
    },
    3: {
        title: 'referals',
        open: false,
        selectedCards: -1
    }
}