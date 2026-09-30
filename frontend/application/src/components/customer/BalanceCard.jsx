
import { useContext } from "react"
import {BankingContext} from "../../context/BankingContext"
function BalanceCard(){
    const {balance} = useContext(BankingContext);
    return <>
        <h1>THE CURRENT BALANCE IS {balance}</h1>
    </>
}
export default BalanceCard