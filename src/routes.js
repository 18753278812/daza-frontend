import Error404 from './components/_error/Error404';

import MainWrapper from './components/_wrapper/MainWrapper';
import SimpleWrapper from './components/_wrapper/SimpleWrapper';

import HomeIndex from './components/home/Index';
import HomeStatus from './components/home/Status';
import HomeDownloadApp from './components/home/DownloadApp';

import AccountRegister from './components/account/Register';
import AccountLogin from './components/account/Login';
import AccountLogout from './components/account/Logout';
import AccountPasswordReset from './components/account/PasswordReset';
import AccountSettings from './components/account/Settings';

import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';

import CategoryList from './components/category/CategoryList';
import CategoryDetail from './components/category/CategoryDetail';

import TopicCreate from './components/topic/TopicCreate';
import TopicList from './components/topic/TopicList';
import TopicDetail from './components/topic/TopicDetail';

import ArticleCreate from './components/article/ArticleCreate';
import ArticleShare from './components/article/ArticleShare';
import ArticleList from './components/article/ArticleList';
import ArticleDetail from './components/article/ArticleDetail';

import TweetCreate from './components/tweet/TweetCreate';
import TweetList from './components/tweet/TweetList';
import TweetDetail from './components/tweet/TweetDetail';

import EventCreate from './components/event/EventCreate';
import EventList from './components/event/EventList';
import EventDetail from './components/event/EventDetail';

import TagList from './components/tag/TagList';
import TagDetail from './components/tag/TagDetail';

import NotificationList from './components/notification/NotificationList';

// In-app
import InAppMainWrapper from './in-app-components/_wrapper/MainWrapper';
import InAppArticleDetail from './in-app-components/article/ArticleDetail';
import InAppEventDetail from './in-app-components/event/EventDetail';
import InAppError404 from './in-app-components/_error/Error404';

export default {
  '/': {
    component: MainWrapper,
    subRoutes: {
      '/': {
        component: HomeIndex,
      },
      '/status': {
        component: HomeStatus,
      },
      '/download': {
        component: HomeDownloadApp,
      },
      '/users': {
        component: UserList,
      },
      '/users/:id': {
        name: 'user_detail',
        component: UserDetail,
      },
      '/categories': {
        component: CategoryList,
      },
      '/categories/:id': {
        component: CategoryDetail,
      },
      '/topics/create': {
        component: TopicCreate,
      },
      '/topics': {
        component: TopicList,
      },
      '/topics/:id': {
        name: 'topic_detail',
        component: TopicDetail,
      },
      '/articles/create': {
        component: ArticleCreate,
      },
      '/articles/share': {
        component: ArticleShare,
      },
      '/articles': {
        component: ArticleList,
      },
      '/articles/:id': {
        name: 'article_detail',
        component: ArticleDetail,
      },
      '/tweets/create': {
        component: TweetCreate,
      },
      '/tweets': {
        component: TweetList,
      },
      '/tweets/:id': {
        name: 'tweet_detail',
        component: TweetDetail,
      },
      '/events/create': {
        component: EventCreate,
      },
      '/events': {
        component: EventList,
      },
      '/events/:id': {
        name: 'event_detail',
        component: EventDetail,
      },
      '/tags': {
        component: TagList,
      },
      '/tags/:name': {
        name: 'tag_detail',
        component: TagDetail,
      },
      '/notifications': {
        component: NotificationList,
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
  '/account/settings': {
    component: MainWrapper,
    subRoutes: {
      '/': {
        component: AccountSettings,
      },
    },
  },
  '/in-app': {
    component: InAppMainWrapper,
    subRoutes: {
      '/articles/:id': {
        name: 'in_app_article_detail',
        component: InAppArticleDetail,
      },
      '/events/:id': {
        name: 'in_app_event_detail',
        component: InAppEventDetail,
      },
      '*': {
        component: InAppError404,
      },
    },
  },
  '*': {
    component: Error404,
  },
};
