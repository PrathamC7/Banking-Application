import { useState, createContext, useEffect, useContext, useCallback } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const BankingContext = createContext();

function BankingProvider({ children }) {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, userDetail } = useContext(AuthContext);
    const [error, setError] = useState("");

    const fetchBalance = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/customer/");
            setBalance(response.data.balance);
        } catch (error) {
            const message =
                error.response?.data?.detail ||
                "Something went wrong";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBalance();
        } else {
            setBalance(null);
            setLoading(false);
        }
    }, [fetchBalance, isAuthenticated]);

    const withdraw = async (amount) => {
        if (!Number.isFinite(amount) || amount <= 0) {
            toast.error("Enter an amount greater than zero");
            return;
        }

        if (balance == null) {
            toast.error("Balance is not available. Please refresh and try again.");
            return;
        }
        if (amount > balance) {
            toast.error("Not enough balance");
            return;
        }
        if (!userDetail?.email) {
            toast.error("Customer details are unavailable. Please log in again.");
            return;
        }
        try {
            await api.post("/customer/transaction/", {
                email: userDetail.email,
                description: "Withdrawal",
                transaction_type: "WITHDRAW",
                amount,
            });
            await fetchBalance();
            toast.success("Withdrawal completed.");
        } catch (error) {
            toast.error(error.response?.data?.detail || "Withdrawal failed.");
        }
    };

    return (
        <BankingContext.Provider
            value={{
                balance,
                loading,
                error,
                fetchBalance,
                withdraw,
            }}
        >
            {children}
        </BankingContext.Provider>
    );
}

export default BankingProvider;
