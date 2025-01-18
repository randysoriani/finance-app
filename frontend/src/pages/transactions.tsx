import { useState } from "react";
import { NewAccountForm } from "../components/NewAccountForm";
import { NewTransactionForm } from "../components/NewTransactionForm";
import { Sidemenu } from "../components/Sidemenu";

export function Transactions(){
    const [isNewAccountFormVisible, setIsNewAccountFormVisible] = useState<boolean>(false)
    const [isNewTransactionFormVisible, setIsNewTransactionFormVisible] = useState<boolean>(false)

    return(
        <div>
            <Sidemenu />
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