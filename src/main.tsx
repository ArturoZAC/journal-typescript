import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'
import { JournalApp } from './JournalApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <JournalApp/>
    </BrowserRouter>
  </StrictMode>,
)
