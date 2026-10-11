import { useContext, useState } from "react";
import { BankingContext } from "../../context/BankingContext";

function WithdrawForm() {
    const { withdraw, balance } = useContext(BankingContext);
    const [amount, setAmount] = useState("");

    const handleWithdraw = (e) => {
        e.preventDefault();
        withdraw(Number(amount));
    };

    return (
        <form onSubmit={handleWithdraw}>
            <h2>Withdraw funds</h2>
            <label>
                Amount
                <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Withdraw</button>
        </form>
    );
}

export default WithdrawForm;
