import routes from './routes/index';

/**
 * @name Umi route configuration
 * @description Only supports configuration of path, component, routes, redirect, wrappers, name, and icon.
 * @param path Path only supports two placeholder configurations. The first is the dynamic parameter in the form of :id, and the second is the * wildcard, which can only appear at the end of the route string.
 * @param component Configuration of the React component path used for rendering after location and path matching. It can be an absolute path or a relative path. If it is a relative path, it will start from src/pages.
 * @param routes Configure sub-routes, usually used when you need to add a layout component for multiple paths.
 * @param redirect Configure route redirection.
 * @param wrappers Configure the wrapping component of the route component. Through the wrapping component, more functionality can be combined into the current route component. For example, it can be used for route-level permission verification.
 * @param name Configure the title of the route. By default, it reads the value of menu.ts in the internationalization file menu.xxxx. For example, if the name is set to login, it reads the value of menu.login in menu.ts as the title.
 * @param icon Configure the icon of the route. Refer to https://ant.design/components/icon-cn for the value. Note that the style suffix and case should be removed. For example, if you want to configure the icon as <StepBackwardOutlined />, the value should be stepBackward or StepBackward. If you want to configure the icon as <UserOutlined />, the value should be user or User.
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/',
    component: '@/layouts/BlankLayout',
    layout: false,
    routes: [
      {
        path: '/user',
        layout: false,
        routes: [
          {
            path: '/user/login',
            layout: false,
            name: 'login',
            component: './user/login',
          },
          {
            path: '/user',
            redirect: '/user/login',
          },
          {
            component: '404',
            path: '/user/*',
          },
        ],
      },
      {
        path: '/',
        layout: false,
        key: 'main',
        component: '@/layouts/BasicLayout',
        routes: [
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            routes: [
              {
                path: '/dashboard',
                redirect: '/dashboard/analysis',
              },
              {
                name: 'analysis',
                icon: 'smile',
                path: '/dashboard/analysis',
                component: './dashboard/analysis',
                wrappers: ['@/wrappers/auth'],
              },
            ],
          },
          // places management
          routes.places,
          {
            path: '/form',
            icon: 'form',
            name: 'form',
            routes: [
              {
                path: '/form',
                redirect: '/form/step-form',
              },
              {
                name: 'step-form',
                icon: 'smile',
                path: '/form/step-form',
                component: './form/step-form',
              },
            ],
          },
          {
            name: 'result',
            icon: 'CheckCircleOutlined',
            path: '/result',
            routes: [
              {
                path: '/result',
                redirect: '/result/success',
              },
              {
                name: 'success',
                icon: 'smile',
                path: '/result/success',
                component: './result/success',
              },
              {
                name: 'fail',
                icon: 'smile',
                path: '/result/fail',
                component: './result/fail',
              },
            ],
          },
          {
            name: 'exception',
            icon: 'warning',
            path: '/exception',
            routes: [
              {
                path: '/exception',
                redirect: '/exception/403',
              },
              {
                name: '403',
                icon: 'smile',
                path: '/exception/403',
                component: './exception/403',
              },
              {
                name: '404',
                icon: 'smile',
                path: '/exception/404',
                component: './exception/404',
              },
              {
                name: '500',
                icon: 'smile',
                path: '/exception/500',
                component: './exception/500',
              },
            ],
          },
          {
            path: '/',
            redirect: '/dashboard/analysis',
          },
        ],
      },
      {
        component: '404',
        path: '/*',
      },
    ],
  },
];
