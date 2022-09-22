import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/cairo'
import '@fontsource/cairo/600.css'
import '@fontsource/cairo/700.css'
import '@fontsource/cairo/900.css'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
)
