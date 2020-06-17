 
export type IBuesniessModel = 'office' | 'shop';

export const buesniessModel = {
      office: {
        title: 'Service Office',
        open:  'Open a Service Office',
        type: 'office',
        path: '/v-office/open'
      },
      shop: {
        title: 'Shop',
        open:  'Open a Shop',
        type: "shop",
        path: '/'
      }
};