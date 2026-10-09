import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export const BankingContext = createContext();

function BankingProvider({ children }) {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBalance = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/customer/");

            setBalance(response.data.balance);
            toast.success("Balance fetched successfully!");
        } catch (error) {
            const message =
                error.response?.data?.detail ||
                "Something went wrong";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    const deposit = () => {
        setBalance((current) => current + 1000);
    };

    const withdraw = () => {
        setBalance((current) => current - 1000);
    };

    const setCustomerBalance = (amount) => {
        setBalance(amount);
    };

    return (
        <BankingContext.Provider
            value={{
                balance,
                loading,
                error,
                fetchBalance,
                deposit,
                withdraw,
                setCustomerBalance
            }}
        >
            {children}
        </BankingContext.Provider>
    );
}

export default BankingProvider;