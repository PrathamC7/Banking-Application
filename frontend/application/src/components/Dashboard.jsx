import BalanceCard from "./customer/BalanceCard";
import WithdrawForm from "./customer/WithdrawForm";
import {AuthContext} from "../context/AuthContext"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const {isAuthenticated, logout} = useContext(AuthContext)
    const navigate = useNavigate();
    const handlelogout = ()=>{
        logout();
        navigate("/login", {replace : true})
    }
    return <>
                <h1>HELLO</h1>
                <h1>{isAuthenticated == null?  "Checking" : isAuthenticated == true ? "Loged In" : "Not Logged In"}</h1>
                <button onClick={handlelogout}>Logout</button>
                <BalanceCard/>
                <WithdrawForm/>
            </>
}

export default Dashboard