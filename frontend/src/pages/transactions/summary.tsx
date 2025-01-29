import { useState, useEffect } from "react"
import { axiosClient } from "../../helper/axios"
import { NewTransactionForm } from "../../components/NewTransactionForm"
import { Modal } from "../../components/Modal"
import { Button } from "../../components/Button"
import { TiThMenu } from "react-icons/ti"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"

interface ITransaction {
    id: string
    date: string
    type: string
    description: string
    amount: number
    category?: {
        name: string
    }
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

    function closeModalForm(){
        setIsNewTransactionFormVisible(false)
    }

    useEffect(()=>{
        getLastTransactions()
    }, [])

    return(
        <>
            <Modal title='New account form' open={isNewTransactionFormVisible} onClose={closeModalForm} >
                <NewTransactionForm />
            </Modal>

            <Button onClick={() => {setIsNewTransactionFormVisible(true)}} kind="Ghost" >New transaction</Button>
        
            <div className='bg-white p-4 rounded shadow-sm mt-8'>
                <h2 className='text-gray-600 uppercase text-xs font-semibold mb-4'>Last transactions</h2>
                { transactions.length > 0 && 
                    <table className='border-gray-50 border-2 border-solid'>
                        <thead className='bg-gray-50'>
                            <tr className='text-gray-400 text-xs uppercase'>
                                <th className='p-1 pl-4 text-left'>Date</th>
                                <th className='p-1 text-left'>Type</th>
                                <th className='p-1 text-left'>Description</th>
                                <th className='p-1 text-left'>Category</th>
                                <th className='p-1 text-left'>Amount</th>
                                <th className='p-1 text-left'>From</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(line => 
                                <tr key={line.id} className='border-b-2 border-gray-200'>
                                    <td className='py-2 pr-8 pl-4'>{printDate.format(new Date(line.date))}</td>
                                    <td className='py-2 pr-8'>
                                        <span className={`rounded-2xl text-sm px-4 ${line.type === 'Debit' ? 'bg-red-400' : 'bg-green-400' }`}>{line.type}</span>
                                    </td>
                                    <td className='py-2 pr-8'>{line.description}</td>
                                    <td className='py-2 pr-8'>{line.category?.name ? line.category?.name : ''}</td>
                                    <td className='py-2 pr-8 font-semibold'>
                                        <div className='flex gap-2 items-center justify-end'>
                                            {line.type === 'Debit' ? <FaArrowDown size={10} /> : <FaArrowUp size={10} /> }
                                            <span>{formatter.format(line.amount / 100)}</span>
                                        </div>
                                    </td>
                                    <td className='py-2 pr-8'>{line.account.name}</td>
                                    <td className='py-2 pr-8'><TiThMenu /></td>
                                </tr>    
                            )}
                        </tbody>
                    </table>
                }
            </div>
        </>
    )
}


const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const printDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short'
})