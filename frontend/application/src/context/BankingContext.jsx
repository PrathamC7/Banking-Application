import { useState, createContext } from "react";

export const BankingContext = createContext();
function BankingProvider({children}){
    const [balance, setBalance] = useState(0)
    const deposit = () =>{
        setBalance(balance + 1000);
    }
    const withdraw = () =>{
        setBalance(balance - 1000);
    }
    const setCustomerBalance = (amount) => {
        setBalance(amount);
    }
    return <>
        <BankingContext.Provider value={{balance, deposit, withdraw, setCustomerBalance}}>
            {children}
        </BankingContext.Provider>
        </>
}
export default BankingProvider