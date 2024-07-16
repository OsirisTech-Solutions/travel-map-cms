import {store} from '@/redux/store'
import {FC} from 'react'
import {Provider} from 'react-redux'

const BlankLayout: FC<{children: React.ReactNode}>  = ({children}) => <>
  <Provider store={store}>
    {children}
  </Provider>
</>

export default BlankLayout
