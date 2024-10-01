// @ts-nocheck

import Exception from '@/components/Exception';
import { ProLayout } from '@ant-design/pro-components';
import {
  Link,
  matchRoutes,
  Outlet,
  useAccessMarkedRoutes,
  useAppData,
  useIntl,
  useLocation,
  useModel,
  useNavigate,
  type IRoute,
} from '@umijs/max';
import { useMemo } from 'react';
import userConfig from '../../../config/defaultSettings';
import Logo from '../../../public/icons/icon-128x128.png';

enum KeyLayout {
  MAIN = 'main',
}
// Filter out the routes that need to be displayed, where filterFn refers to the levels that should not be displayed
const filterRoutes = (routes: IRoute[], filterFn: (route: IRoute) => boolean) => {
  if (routes.length === 0) {
    return [];
  }

  let newRoutes = [];
  for (const route of routes) {
    const newRoute = { ...route };
    if (filterFn(route)) {
      if (Array.isArray(newRoute.routes)) {
        newRoutes.push(...filterRoutes(newRoute.routes, filterFn));
      }
    } else {
      if (Array.isArray(newRoute.children)) {
        newRoute.children = filterRoutes(newRoute.children, filterFn);
        newRoute.routes = newRoute.children;
      }
      newRoutes.push(newRoute);
    }
  }

  return newRoutes;
};

// Format the routes to handle inconsistent menu paths caused by wrappers
const mapRoutes = (routes: IRoute[]) => {
  if (routes.length === 0) {
    return [];
  }
  return routes.map((route) => {
    // Need to make a copy, otherwise it will contaminate the original data
    const newRoute = { ...route };
    if (route.originPath) {
      newRoute.path = route.originPath;
    }

    if (Array.isArray(route.routes)) {
      newRoute.routes = mapRoutes(route.routes);
    }

    if (Array.isArray(route.children)) {
      newRoute.children = mapRoutes(route.children);
    }

    return newRoute;
  });
};

export default (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientRoutes, pluginManager } = useAppData();
  const initialInfo = (useModel && useModel('@@initialState')) || {
    initialState: undefined,
    loading: false,
    setInitialState: null,
  };
  const { initialState, loading, setInitialState } = initialInfo;
  const { formatMessage } = useIntl();
  const runtimeConfig = pluginManager.applyPlugins({
    key: 'layout',
    type: 'modify',
    initialValue: {
      ...initialInfo,
    },
  });

  // The current implementation of layout and wrapper is achieved through parent routes, which leads to redundant levels in the route data.
  // When consumed by proLayout, the menu cannot be displayed correctly. Here, we filter out the redundant data.
  const routesForMenu = clientRoutes
    .find((route) => route.path === '/')
    .routes.find((item) => item?.key === KeyLayout.MAIN);
  const newRoutes = filterRoutes([routesForMenu], (route) => {
    return !!route.isLayout || !!route.isWrapper;
  });
  const [route] = useAccessMarkedRoutes(mapRoutes(newRoutes));

  const matchedRoute = useMemo(
    () => matchRoutes(route.children, location.pathname)?.pop?.()?.route,
    [location.pathname],
  );

  return (
    <ProLayout
      route={route}
      location={location}
      title={userConfig.title || 'ant-design-pro'}
      navTheme="dark"
      siderWidth={256}
      onMenuHeaderClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate('/');
      }}
      formatMessage={userConfig.formatMessage || formatMessage}
      menu={{ locale: userConfig.locale }}
      logo={Logo}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            // handle wildcard route path, for example /slave/* from qiankun
            <Link
              to={menuItemProps.path.replace('/*', '')}
              target={menuItemProps.target}
            >
              {defaultDom}
            </Link>
          );
        }
        return defaultDom;
      }}
      itemRender={(route, _, routes) => {
        const { breadcrumbName, title, path } = route;
        const label = title || breadcrumbName;
        const last = routes[routes.length - 1];
        if (last) {
          if (last.path === path || last.linkPath === path) {
            return <span>{label}</span>;
          }
        }
        return <Link to={path}>{label}</Link>;
      }}
      disableContentMargin
      fixSiderbar
      fixedHeader
      {...runtimeConfig}
      rightContentRender={
        runtimeConfig.rightContentRender !== false &&
        ((layoutProps) => {
          const dom = getRightRenderContent({
            runtimeConfig,
            loading,
            initialState,
            setInitialState,
          });
          if (runtimeConfig.rightContentRender) {
            return runtimeConfig.rightContentRender(layoutProps, dom, {
              // BREAK CHANGE userConfig > runtimeConfig
              userConfig,
              runtimeConfig,
              loading,
              initialState,
              setInitialState,
            });
          }
          return dom;
        })
      }
    >
      <Exception
        route={matchedRoute}
        noFound={runtimeConfig?.noFound}
        notFound={runtimeConfig?.notFound}
        unAccessible={runtimeConfig?.unAccessible}
        noAccessible={runtimeConfig?.noAccessible}
      >
        {runtimeConfig.childrenRender ? (
          runtimeConfig.childrenRender(<Outlet />, props)
        ) : (
          <Outlet />
        )}
      </Exception>
    </ProLayout>
  );
};
