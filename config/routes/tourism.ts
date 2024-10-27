const tourism = {
  path: '/tourism',
  name: 'tourism-management',
  icon: 'appstore',
  routes: [
    {
      name: 'tourism',
      path: '/tourism',
      component: './tourism',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: true,
    },
  ],
};
export default tourism;
