import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import SmoothScroll from '@/components/ui/smooth-scroll'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </React.StrictMode>,
)
