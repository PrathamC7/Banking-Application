import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import AuthenticationProvider from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

            <AuthenticationProvider>
               <StrictMode>
                  <App/>
                  <ToastContainer
                  position = "top-right"
                  autoClose = {3000}
                  theme = "colored"
                  />
                </StrictMode>
            </AuthenticationProvider>

        </BrowserRouter>
 
)
