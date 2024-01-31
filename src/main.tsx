import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ReactGPT from './ReactGPT'
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactGPT />
    <Toaster position='top-right' />
  </React.StrictMode>,
)
