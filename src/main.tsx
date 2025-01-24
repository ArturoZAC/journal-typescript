import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { AppTheme } from './theme'
import { AppMainRouter } from './AppMainRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ store }>
      <AppTheme>
        <AppMainRouter />
      </AppTheme>
    </Provider>
  </StrictMode>,
)
