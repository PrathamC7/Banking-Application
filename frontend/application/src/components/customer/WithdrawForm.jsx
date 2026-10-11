import { useContext, useEffect, useState } from "react"
import {BankingContext} from "../../context/BankingContext"

function WithdrawForm(){
    const {withdraw, balance} = useContext(BankingContext)
    const [amount, setAmount] = useState(0);
    const handleWithdraw = (e) => {
        e.preventDefault();
        withdraw(Number(amount))
    }
    console.log(amount)
    useEffect(()=>{

    },[balance])
    return<>
        <form onSubmit={handleWithdraw}>
            <h1>Current Balance : {balance}</h1>
            <input type="number" onChange={e=>setAmount(e.target.value)}/>
            <br />
            <br />
            <button type = "submit">Withdraw</button>
        </form>
    </>
}

export default WithdrawForm