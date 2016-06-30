import Error404 from './components/_error/Error404';

import MainWrapper from './components/_wrapper/MainWrapper';
import SimpleWrapper from './components/_wrapper/SimpleWrapper';

import HomeIndex from './components/home/Index';
import HomeStatus from './components/home/Status';

import AccountRegister from './components/account/Register';
import AccountLogin from './components/account/Login';
import AccountLogout from './components/account/Logout';
import AccountPasswordReset from './components/account/PasswordReset';
import AccountProfile from './components/account/Profile';

import CategoryList from './components/category/CategoryList';
import CategoryDetail from './components/category/CategoryDetail';

import UserList from './components/user/UserList';
import UserDetail from './components/user/UserDetail';

import TagList from './components/tag/TagList';
import TagDetail from './components/tag/TagDetail';

import GroupList from './components/group/GroupList';
import GroupDetail from './components/group/GroupDetail';

import TweetCreate from './components/tweet/TweetCreate';
import TweetList from './components/tweet/TweetList';
import TweetDetail from './components/tweet/TweetDetail';

import PostCreate from './components/post/PostCreate';
import PostList from './components/post/PostList';
import PostDetail from './components/post/PostDetail';

import ArticleCreate from './components/article/ArticleCreate';
import ArticleList from './components/article/ArticleList';
import ArticleDetail from './components/article/ArticleDetail';

import EventCreate from './components/event/EventCreate';
import EventList from './components/event/EventList';
import EventDetail from './components/event/EventDetail';

import NotificationList from './components/notification/NotificationList';

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
      '/tags': {
        component: TagList,
      },
      '/tags/:name': {
        name: 'tag_detail',
        component: TagDetail,
      },
      '/groups': {
        component: GroupList,
      },
      '/groups/:id': {
        name: 'group_detail',
        component: GroupDetail,
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
      '/posts/create': {
        component: PostCreate,
      },
      '/posts': {
        component: PostList,
      },
      '/posts/:id': {
        name: 'post_detail',
        component: PostDetail,
      },
      '/articles/create': {
        component: ArticleCreate,
      },
      '/articles': {
        component: ArticleList,
      },
      '/articles/:id': {
        name: 'article_detail',
        component: ArticleDetail,
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
