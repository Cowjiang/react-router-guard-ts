import {useRoutes, Navigate, useLocation, RouteObject} from 'react-router-dom';
import React, {ReactNode, Suspense, lazy} from 'react';

interface FunctionRule {
  (): any,
}

// meta规则
interface MetaRule {
  auth?: boolean, //是否需要登录验证
  title?: string, //页面标题
  [name: string]: any //其他参数
}

// 路由规则
interface RouteObjectRule extends RouteObject {
  children?: RouteObjectRule[], //子路由
  page?: FunctionRule, //route导入页面的对象，使用示例：() => import('home.tsx')
  path?: string, //页面路径
  redirect?: string, //重定向地址 ，常用于设置页面默认地址
  meta?: MetaRule, //页面参数
}

interface onRouteBeforeRule<meta = MetaRule, to = string> {
  (meta: meta, to: to): any | never
}

type LoadingEleRule = ReactNode;

// 守卫规则
interface GuardRule {
  routers: RouteObjectRule[],
  onRouterBefore: onRouteBeforeRule,
  loading?: LoadingEleRule
}

let onRouterBefore: onRouteBeforeRule;
let RouterLoading: FunctionRule;

// 路由守卫
function Guard({element, meta}: { element: JSX.Element, meta: MetaRule }) {
  const {pathname} = useLocation();
  const nextPath = onRouterBefore ? onRouterBefore(meta, pathname) : pathname;
  if (nextPath && nextPath !== pathname) {
    element = <Navigate to={nextPath} replace={true} />;
  }
  return element;
}

// 路由懒加载
function lazyLoadRouters(page: FunctionRule, meta?: MetaRule): JSX.Element {
  meta = meta || {};
  const LazyElement = lazy(page);
  const GetElement = () => {
    return (
      <Suspense fallback={<RouterLoading />}>
        <LazyElement />
      </Suspense>
    );
  };
  return <Guard element={<GetElement />} meta={meta} />;
}

// 路由转换
function transRoutes(routes: RouteObjectRule[]): RouteObjectRule[] {
  const list: RouteObjectRule[] = [];
  routes.forEach(route => {
    const obj = {...route};
    obj.redirect && (obj.element = <Navigate to={obj.redirect} replace={true} />);
    obj.page && (obj.element = lazyLoadRouters(obj.page, obj.meta));
    obj.children && (obj.children = transRoutes(obj.children));
    ['redirect', 'page', 'meta'].forEach(name => delete obj[name as keyof typeof obj]);
    list.push(obj)
  });
  return list;
}

export type {
  RouteObjectRule,
  MetaRule,
  FunctionRule,
  onRouteBeforeRule,
  LoadingEleRule
};

function RouterGuard(params: GuardRule) {
  onRouterBefore = params.onRouterBefore;
  RouterLoading = () => params.loading || <></>;
  return useRoutes(transRoutes(params.routers));
}

export default RouterGuard;