// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    analytic: path(ROOTS_DASHBOARD, '/automat'),
    automatDefinitions: path(ROOTS_DASHBOARD, '/definitions'),
    booking: path(ROOTS_DASHBOARD, '/systemSettings'),
    // inventory: path(ROOTS_DASHBOARD, '/inventory'),
    sales: path(ROOTS_DASHBOARD, '/sales'),
    banking: path(ROOTS_DASHBOARD, '/listUsers'),
  },
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  automat: {
    root: path(ROOTS_DASHBOARD, '/automat'),
    detail: path(ROOTS_DASHBOARD, '/automat/detail'),
    list: path(ROOTS_DASHBOARD, '/automat/list'),
    definitions: path(ROOTS_DASHBOARD, '/automat/definitions'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/reports/lockevents'),
    profile: path(ROOTS_DASHBOARD, '/reports/completed'),
    account: path(ROOTS_DASHBOARD, '/reports/allevents'),
  },
  report: {
    root: path(ROOTS_DASHBOARD, '/reports'),
    salesReport: path(ROOTS_DASHBOARD, '/reports/salesReport'),
    paymentReport: path(ROOTS_DASHBOARD, '/reports/paymentReport'),
  },
  product: path(ROOTS_DASHBOARD, '/product'),
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
