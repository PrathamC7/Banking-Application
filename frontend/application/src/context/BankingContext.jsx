import { useState, createContext } from "react";

export const BankingContext = createContext();
function BankingProvider({children}){
    const [balance, setBalance] = useState(10000)
    const deposit = () =>{
        setBalance(balance + 1000);
    }
    const withdraw = () =>{
        setBalance(balance - 1000);
    }
    return <>
        <BankingContext.Provider value={{balance, deposit, withdraw}}>
            {children}
        </BankingContext.Provider>
        </>
}
export default BankingProvider