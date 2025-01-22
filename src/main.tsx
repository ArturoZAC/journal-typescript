import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { RouterProvider } from 'react-router-dom'
import { AppTheme } from './theme'
import { router } from './AppMainRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <AppTheme>
        <RouterProvider router={router}/>
      </AppTheme>
    </Provider>
  </StrictMode>,
)
