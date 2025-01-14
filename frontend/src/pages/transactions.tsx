import { useState } from "react";
import { Link } from "react-router";
import { NewAccountForm } from "../components/NewAccountForm";
import { NewTransactionForm } from "../components/NewTransactionForm";

export function Transactions(){
    const [isNewAccountFormVisible, setIsNewAccountFormVisible] = useState<boolean>(false)
    const [isNewTransactionFormVisible, setIsNewTransactionFormVisible] = useState<boolean>(false)

    return(
        <div>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/transactions">Transactions</Link>
            </aside>
            <main>
                <h2>Transactions</h2>
                <button onClick={() => {setIsNewAccountFormVisible(true)}}>New account</button>
                { isNewAccountFormVisible && <NewAccountForm /> }

                <button onClick={() => {setIsNewTransactionFormVisible(true)}}>New transaction</button>
                { isNewTransactionFormVisible && <NewTransactionForm /> }
            </main>
        </div>
    )
}