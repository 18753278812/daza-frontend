import Error404 from './components/_error/Error404';

import MainWrapper from './components/_wrapper/MainWrapper';
import SimpleWrapper from './components/_wrapper/SimpleWrapper';

import HomeIndex from './components/home/Index';

import AccountRegister from './components/account/Register';
import AccountLogin from './components/account/Login';
import AccountLogout from './components/account/Logout';
import AccountPasswordReset from './components/account/PasswordReset';
import AccountProfile from './components/account/Profile';

export default {
  '/': {
    component: MainWrapper,
    subRoutes: {
      '/': {
        component: HomeIndex,
      },
      '*': {
        component: Error404,
      },
    },
  },
  '/account': {
    component: SimpleWrapper,
    subRoutes: {
      '/register': {
        component: AccountRegister,
      },
      '/login': {
        component: AccountLogin,
      },
      '/logout': {
        component: AccountLogout,
      },
      '/password_reset': {
        component: AccountPasswordReset,
      },
    },
  },
  '/account/profile': {
    component: MainWrapper,
    subRoutes: {
      '/': {
        component: AccountProfile,
      },
    },
  },
  '*': {
    component: Error404,
  },
};
