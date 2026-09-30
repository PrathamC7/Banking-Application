import { useState } from 'react'
import './App.css'
import BankingProvider from "./context/BankingContext"
import Dashboard from './components/Dashboard'
function App() {

  return (
    <>
      <BankingProvider>
        <Dashboard/>
      </BankingProvider>
    </>
  )
}

export default App
