const product = {
  path: '/product-management',
  name: 'product-management',
  icon: 'product',
  routes: [
    {
      path: '/product-management',
      redirect: '/product-management/list',
    },
    {
      name: 'list',
      path: '/product-management/list',
      component: './product-management/list',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: false,
    },
    {
      name: 'list',
      path: '/product-management/create-product',
      component: './product-management/create-product',
      wrappers: ['@/wrappers/auth'],
      hideInMenu: true,
    },
  ],
};
export default product;
