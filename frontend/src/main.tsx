import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { App } from './App.tsx'
import { Register } from './pages/register.tsx'
import { Dashboard } from './pages/dasboard.tsx'
import { Transactions } from './pages/transactions.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/transactions' element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
