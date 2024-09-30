// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';

import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name Enable hash mode
   * @description Include a hash suffix in the build artifacts to avoid browser caching and enable incremental releases.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Compatibility settings
   * @description Setting IE11 compatibility may not be perfect and requires checking all dependencies used.
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name Route configuration
   * @description Only files imported in the routes will be compiled.
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Theme configuration
   * @description Although called themes, it is actually just setting less variables.
   * @doc antd theme customization https://ant.design/docs/react/customize-theme
   * @doc umi theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // Set this to 'default' if you don't want to dynamically set the theme using configProvide
    // Only when set to 'variable', can configProvide be used to dynamically set the primary color scheme
    'root-entry-name': 'variable',
  },
  /**
   * @name Moment internationalization configuration
   * @description If internationalization is not required, enabling this can reduce the size of the JavaScript bundle.
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name Proxy configuration
   * @description Allows your local server to proxy requests to your server, enabling access to server data.
   * @see Note that proxies can only be used during local development and cannot be used after building.
   * @doc Proxy introduction https://umijs.org/docs/guides/proxy
   * @doc Proxy configuration https://umijs.org/docs/api/config#proxy
   */
  // proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name Fast refresh configuration
   * @description A nice hot-reloading component that preserves state during updates.
   */
  fastRefresh: true,
  //============== The following are max plugin configurations ===============
  /**
   * @name Data flow plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data flow that can be used to share data between plugins
   * @description Can be used to store some global data, such as user information or some global states, created at the beginning of the entire Umi project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name Layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'Ant Design Pro',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name Moment2dayjs plugin
   * @description Replaces moment in the project with dayjs.
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name Internationalization plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name Antd plugin
   * @description Includes the babel import plugin.
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name Network request configuration
   * @description Provides a unified network request and error handling solution based on axios and ahooks' useRequest.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name Access plugin
   * @description A permission plugin based on initialState, initialState must be enabled first.
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name Additional scripts in <head>
   * @description Configure additional scripts in <head>
   */
  headScripts: [
    // Solve the issue of white screen on initial load
    { src: '/scripts/loading.js', async: true },
  ],
  //================ pro plugin configurations =================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI plugin configuration
   * @description Generates serve and mock based on the openapi specification, reducing boilerplate code.
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     // Or use the online version
  //     // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
  //     schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   },
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //     projectName: 'swagger',
  //   },
  // ],
  mock: {
    include: ['mock/**/*', 'src/pages/**/_mock.ts'],
  },
  mfsu: {
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
});
