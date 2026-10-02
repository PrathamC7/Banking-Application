import { useState } from 'react'
import './App.css'
import BankingProvider from "./context/BankingContext"
import Dashboard from './components/Dashboard'
import Customer from './components/customer/Customer'
import Login from './pages/Login'
function App() {

  return (
    <>
      
      <BankingProvider>
        <Login/>
        <Dashboard/>
      </BankingProvider>
      <Customer/>
    </>
  )
}

export default App
