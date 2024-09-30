const places = {
  path: '/places-management',
  name: 'places-management',
  icon: 'picture',
  routes: [
    {
      path: '/places-management',
      redirect: '/places-management/list',
    },
    {
      name: 'list',
      path: '/places-management/list',
      component: './places-management/list',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: true,
    },
  ],
};
export default places;
