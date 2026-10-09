import { Routes, Route } from "react-router-dom";

import BankingProvider from "./context/BankingContext";

import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Customer from "./components/customer/Customer";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

    return (
        <>
        <BankingProvider>

                    <Routes>

                        {/* Public */}
                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        {/* Protected */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/customer"
                            element={
                                <ProtectedRoute>
                                    <Customer />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>

                </BankingProvider>
        </>
    );
}

export default App;