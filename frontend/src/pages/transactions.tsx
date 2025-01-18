import { useEffect, useState } from "react";
import { NewAccountForm } from "../components/NewAccountForm";
import { NewTransactionForm } from "../components/NewTransactionForm";
import { Sidemenu } from "../components/Sidemenu";
import { axiosClient } from "../helper/axios";

interface ITransactionDTO {
    id: string
    date: string
    type: string
    description: string
    amount: number
    account: {
        name: string
    }
}

export function Transactions(){
    const [transactions, setTransactions] = useState<ITransactionDTO[]>([])
    const [isNewAccountFormVisible, setIsNewAccountFormVisible] = useState<boolean>(false)
    const [isNewTransactionFormVisible, setIsNewTransactionFormVisible] = useState<boolean>(false)

    function getLastTransactions(){
        axiosClient.get('transactions')
            .then(response => {
                setTransactions(response.data.transactions)
            })
    }

    useEffect(()=>{
        getLastTransactions()
    }, [])

    return(
        <div>
            <Sidemenu />
            <main>
                <h2>Transactions</h2>
                <button onClick={() => {setIsNewAccountFormVisible(true)}}>New account</button>
                { isNewAccountFormVisible && <NewAccountForm /> }

                <button onClick={() => {setIsNewTransactionFormVisible(true)}}>New transaction</button>
                { isNewTransactionFormVisible && <NewTransactionForm /> }

                { transactions.length > 0 && 
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>From</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(line => 
                                <tr key={line.id}>
                                    <td>{printDate.format(new Date(line.date))}</td>
                                    <td>{line.type}</td>
                                    <td>{line.description}</td>
                                    <td>{formatter.format(line.amount / 100)}</td>
                                    <td>{line.account.name}</td>
                                </tr>    
                            )}
                        </tbody>
                    </table>
                }
            </main>
        </div>
    )
}


const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const printDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short'
})