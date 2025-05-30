import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'; // <- Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <- JS opcional (con Popper)
import AppRouter from './router';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
