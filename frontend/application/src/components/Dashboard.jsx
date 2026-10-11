import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BalanceCard from "./customer/BalanceCard";
import WithdrawForm from "./customer/WithdrawForm";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
    const { userDetail, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <main>
            <h1>Account dashboard</h1>
            <p>Signed in as {userDetail?.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <BalanceCard />
            <WithdrawForm />
        </main>
    );
}

export default Dashboard;
