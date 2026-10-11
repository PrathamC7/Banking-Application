import { Navigate, Route, Routes } from "react-router-dom";
import BankingProvider from "./context/BankingContext";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <BankingProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BankingProvider>
    );
}

export default App;
