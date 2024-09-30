import { store } from '@/redux/store'
import { Outlet } from '@umijs/max'
import { FC } from 'react'
import { Provider } from 'react-redux'

const BlankLayout: FC = () => <>
  <Provider store={store}>
    <Outlet />
  </Provider>
</>

export default BlankLayout
