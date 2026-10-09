import { useContext } from "react";
import { BankingContext} from "../../context/BankingContext";

function BalanceCard() {
    const { balance, loading, error, fetchBalance } =
        useContext(BankingContext);

    if (loading) {
        return <h2>Loading balance...</h2>;
    }

    if (error) {
        return (
            <>
                <p>{error}</p>
                <button onClick={fetchBalance}>Retry</button>
            </>
        );
    }

    return (
        <>
            <h1>THE CURRENT BALANCE IS {balance}</h1>
            <button onClick={fetchBalance}>Refresh Balance</button>
        </>
    );
}

export default BalanceCard;