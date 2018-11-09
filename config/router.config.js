export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  //exceptions
  {
    path: '/exception',
    routes: [
      { path: '/exception', component: '/Exception/404' },
      { path: '/exception/404', component: '/Exception/404' },
      { path: '/exception/403', component: '/Exception/403' },
      { path: '/exception/500', component: '/Exception/500' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['ADMIN', 'FSMS1', 'FSMS2'],
    routes: [
      // dashboard
      { path: '/', redirect: '/main/home' },
      { path: '/main/profile', component: './User/Profile' },
      {
        path: '/main/home',
        name: 'home',
        icon: 'faHome',
        component: './HomePage/HomePage',
      },
      {
        path: '/rpmu',
        icon: 'faUserMd',
        name: 'rpmu',
        routes: [
          { path: '/rpmu', redirect: '/rpmu/payments' },
          {
            path: '/rpmu/payments',
            icon: 'faMoneyBill',
            name: 'payments',
            component: './Payments/PaymentsPage',
            authority: ['ADMIN'],
          },
          {
            path: '/rpmu/searcher',
            icon: 'faSearch',
            name: 'searcher',
            component: './SearchPhysical/Searcher',
            authority: ['ADMIN', 'FSMS2'],
          },
        ],
      },
      {
        path: '/refunds',
        icon: 'faCreditCard',
        name: 'refunds',
        routes: [
          { path: '/refunds', redirect: '/refunds/reestr' },
          {
            path: '/refunds/requests',
            name: 'requests',
            icon: 'faListAlt',
            component: './Requests/Requests',
            authority: ['ADMIN', 'FSMS1', 'FSMS2'],
          },//Заявки
          {
            path: '/refunds/reestr',
            icon: 'faListAlt',
            name: 'reestr',
            component: './Main/MainView',
            authority: ['ADMIN', 'FSMS1', 'FSMS2'],
          },
          {
            path: '/refunds/calendar',
            icon: 'faCalendarAlt',
            name: 'calendar',
            component: './Calendar/CalendarView',
            authority: ['ADMIN', 'FSMS2'],
          },
          {
            path: '/refunds/templates_view',
            icon: 'faFileInvoice',
            name: 'templates_view',
            component: './Templates/Template',
            authority: ['ADMIN', 'FSMS2'],
          },
          {
            path: '/refunds/stat',
            icon: 'faChartBar',
            name: 'stat',
            component: './StaticticsView/StaticticsView',
            authority: ['ADMIN', 'FSMS1', 'FSMS2'],
          },
        ],
      },
      {
        path: '/options',
        name: 'options',
        icon: 'faUserCog',
        component: './Options/Options',
        authority: ['ADMIN'],
      },
      {
        path: '/reports',
        icon: 'faFileExcel',
        name: 'reports',
        component: './Reports/ReportsPage',
        authority: ['ADMIN', 'FSMS2'],
      },
      {
        path: '/journal',
        icon: 'faBookOpen',
        name: 'journal',
        component: './Journal/JournalPage',
        authority: ['ADMIN', 'FSMS2'],
      },

      {
        component: '404',
      },
    ],
  },
];
