import '../main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

// import { App } from './App.tsx'
import { Register } from './pages/register.tsx'
import { Dashboard } from './pages/dasboard.tsx'
import { Transactions } from './pages/transactions/index.tsx'
import { Login } from './pages/login.tsx'
import { Main } from './pages/main.tsx'
import { Accounts } from './pages/transactions/accounts.tsx'
import { Summary } from './pages/transactions/summary.tsx'
import { Investments } from './pages/investments.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<App />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Main />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/transactions' element={<Transactions />}>
            <Route index={true} element={<Summary />} />
            <Route path='/transactions/accounts' element={<Accounts />} />
          </Route>
          <Route path='/investments' element={<Investments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
