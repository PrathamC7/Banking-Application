import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const BankingContext = createContext();

function BankingProvider({ children }) {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const {userDetail} = useContext(AuthContext)
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
        console.log("BankingContext userDetail:", userDetail);
    }, [userDetail]);

    const deposit = () => {
        setBalance((current) => current + 1000);
    };

    const withdraw = async (amount) => {
        if (!Number.isFinite(amount) || amount <= 0) {
            toast.error("Enter an amount greater than zero");
            return;
        }

        if (amount > balance) {
            toast.error("Not enough balance");
            return;
        }
        // console.log(userDetail)
        if (!userDetail?.email) {
            toast.error("Customer details are unavailable. Please log in again.");
            return;
        }
        try{
            const response = await api.post("/customer/transaction", {email : userDetail["email"], description : "string", transaction_type : "WITHDRAW", "amount" : amount});
            // console.log(response.data.amount)
            setBalance(response?.data?.amount)
            await fetchBalance();
            toast.success("amount withdrawn successfull");
        }
        catch(error){
            toast.error("something went wrong");
        }
        // setBalance();
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