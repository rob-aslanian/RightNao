const list: any[] = [
    {
      img: 'assets/img/ads/adCategory/647.svg',
      name: 'People',
      coloredImg: 'assets/img/225.svg',
    },
    {
      img: 'assets/img/Landing-page/new_landing/businesses_1.svg',
      name: 'Businesses',
      coloredImg: 'assets/img/Landing-page/new_landing/businesses_2.svg',
    },
    {
      img: 'assets/img/Landing-page/new_landing/professionals_1.svg',   
      name: 'Professionals',
      coloredImg: 'assets/img/Landing-page/new_landing/professionals_2.svg',
    },
    {
      img: 'assets/img/Landing-page/new_landing/hypercoins_1.svg',
      name: 'HyperCoins',
      coloredImg: 'assets/img/Landing-page/new_landing/hypercoins_2.svg',
    },
    {
      img:  'assets/img/Landing-page/new_landing/chatnao_1.svg',
      name: 'ChatNao',
      coloredImg: 'assets/img/Landing-page/new_landing/chatnao_2.svg'
    },
    {
      img:  'assets/img/Landing-page/new_landing/portfolio_1.svg',
      name: 'Portfolio',
      coloredImg: 'assets/img/Landing-page/new_landing/portfolio_2.svg'
    },
  ];


  const classifiedAds = [
      {
          lgImage: 'assets/img/Landing-page/new_landing/jobs.png',
          mediumImage: 'assets/img/Landing-page/new_landing/sm-jobs.png',
          title: 'Jobs',
          amount: '2,982',
        link: ''
      },
      {
        lgImage: 'assets/img/Landing-page/new_landing/estate.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-estate.png',
        title: 'Real Estate',
        amount: '2,345',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/car.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-car.png',
        title: 'Vehichles',
        amount: '5,138',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/cat.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-cat.png',
        title: 'Pet & Plants',
        amount: '1,348',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/chair.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-chair.png',
        title: 'For Sale',
        amount: '8,147',
        link: '/for-sale/landing-page'
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/laptop.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-laptop.png',
        title: 'Electronics & Mobile',
        amount: '1,348',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/community.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-community.png',
        title: 'Fashion & clothing',
        amount: '8,147',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/butter.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-butter.png',
        title: 'Healthy & Beaty',
        amount: '1,984',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/statistics.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-statistics.png',
        title: 'Services',
        amount: '938',
        link: '/ads-services/landing-page'
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/calendar.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-calendar.png',
        title: 'Events',
        amount: '245',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/hands.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-hands.png',
        title: 'Community',
        amount: '684',
        link: ''
    },
    {
        lgImage: 'assets/img/Landing-page/new_landing/heart.png',
        mediumImage: 'assets/img/Landing-page/new_landing/sm-heart.png',
        title: 'Personals',
        amount: '306',
        link: ''
    },
      
  ];

  const searchRoutes: any[] = [
      {
          name: 'Jobs',
          route: '/search/job'
      },
      {
        name: 'People',
        route: '/search/people'
     },
     {
        name: 'Businesses',
        route: '/search/all'
     },
     {
        name: 'Professionals',
        route: '/search/all'
     },
     {
        name: 'Portfolios',
        route: '/search/all'
    },
    {
        name: 'Groups',
        route: '/search/all'
    },
    {
        name: 'Services',
        route: '/search/service'
    },
    {
        name: 'Service requests',
        route: '/search/service_request'
    }
  ];

  const classFields: any[] = [
    {
        name: 'Real Estate',
        route: '/search/all'
    },
    {
        name: 'Vehicles',
        route: '/search/all'
    },
    {
        name: 'Pets & Plants',
        route: '/search/all'
    },
    {
        name: 'For Sale',
        route: '/search/all'
    },
    {
        name: 'Electronics & Mobile',
        route: '/search/all'
    },
    {
        name: 'Services',
        route: '/search/all'
    },
    {
        name: 'Community',
        route: '/search/all'
    },
    {
        name: 'Personals',
        route: '/search/all'
    }
  ];

  export { list, classifiedAds, searchRoutes, classFields };