import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Root} from '../components/Root.tsx'
import './index.css'
//import './style/tailwind.css'
import { BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './AuthProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import ErrorBoundary from './services/ErrorBoundary.tsx'
import { LanguageProvider } from './lang/LanguageProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div style={{padding: 40, textAlign: "center", color: "#e53935"}}>¡Ha ocurrido un error inesperado! Por favor, recarga la página o contacta soporte.</div>}>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
        <AuthProvider>
          <Root/>
        </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
