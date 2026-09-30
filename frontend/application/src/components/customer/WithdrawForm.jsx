import { useContext } from "react"
import {BankingContext} from "../../context/BankingContext"

function WithdrawForm(){
    const {withdraw} = useContext(BankingContext)
    return<>
        <button onClick={withdraw}>Withdraw 1000</button>
    </>
}

export default WithdrawForm