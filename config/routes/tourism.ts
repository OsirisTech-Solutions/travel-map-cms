const tourism = {
  path: '/tourism',
  name: 'Quản lý danh mục địa danh',
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
