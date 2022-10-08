import {Navigate, useRoutes} from 'react-router-dom';
import {MetaRule, onRouteBeforeRule, RouteObjectRule} from './guard';

interface MetaRuleDefine extends MetaRule {
  auth?: boolean
}

interface RouterRule extends RouteObjectRule {
  meta?: MetaRuleDefine
}

export const routes: RouterRule[] = [
  {
    path: '/*',
    element: <Navigate to="/test" replace></Navigate>
  },
  {
    path: '/login',
    meta: {
      auth: false,
      title: '登录页'
    },
    page: () => import('../views/login')
  },
  {
    path: '/test',
    meta: {
      auth: true,
      title: '主页'
    },
    page: () => import('../views/home'),
    children: [
      {
        path: ':id',
        meta: {},
        page: () => import('../views/home')
      }
    ]
  }
];

// 根据路径获取路由
const checkAuth = (routers: Array<RouteObjectRule>, path: string): any => {
  for (const data of routers) {
    if (data.path === path) return data;
    if (data.children) {
      const res = checkAuth(data.children, path);
      if (res) return res;
    }
  }
  return null;
};

// 单个页面鉴权
export const checkRouterAuth = (path: string) => checkAuth(routes, path);

// 全局路由守卫
export const onRouteBefore: onRouteBeforeRule = (meta, to) => {
  const {auth, title} = meta;
  if (title) {
    document.title = title || 'React App';
  }
  // return to;
  // 权限验证
  return (auth && !localStorage.getItem('access_token')) ? '/login' : to;
};

const Routes = () => (
  useRoutes(routes)
);

export default Routes;