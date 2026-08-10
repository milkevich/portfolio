import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RouteveilProvider, RouteveilView } from 'routeveil/react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RouteveilProvider>
        <RouteveilView>
          <App />
        </RouteveilView>
      </RouteveilProvider>
    </BrowserRouter>
  </StrictMode>,
)
