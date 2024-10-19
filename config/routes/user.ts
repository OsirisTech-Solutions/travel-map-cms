const places = {
  path: '/user-management',
  name: 'user-management',
  icon: 'user',
  routes: [
    {
      path: '/user-management',
      redirect: '/user-management/list',
    },
    {
      name: 'list',
      path: '/user-management/list',
      component: './user-management/list',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: true,
    },
  ],
};
export default places;
