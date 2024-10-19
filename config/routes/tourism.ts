const tourism = {
  path: '/tourism',
  name: 'tourism-management',
  icon: 'picture',
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
