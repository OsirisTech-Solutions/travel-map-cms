const home = {
  path: '/home-management',
  name: 'home-management',
  icon: 'database',
  routes: [
    {
      path: '/home-management',
      redirect: '/home-management/list',
    },
    {
      name: 'list',
      path: '/home-management/list',
      component: './home-management/list',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: true,
    },
    {
      name: 'create',
      path: '/home-management/create',
      component: './home-management/create',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: true,
    },
    {
      name: 'edit',
      path: '/home-management/edit/:id',
      component: './home-management/edit',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: true,
    }
  ],
};
export default home;
