import { useState, useEffect } from "react"
import { axiosClient } from "../../helper/axios"
import { NewTransactionForm } from "../../components/NewTransactionForm"

interface ITransaction {
    id: string
    date: string
    type: string
    description: string
    amount: number
    account: {
        name: string
    }
}

export function Summary(){
    const [transactions, setTransactions] = useState<ITransaction[]>([])
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

            <button onClick={() => {setIsNewTransactionFormVisible(true)}}>New transaction</button>
            { isNewTransactionFormVisible && <NewTransactionForm /> }
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