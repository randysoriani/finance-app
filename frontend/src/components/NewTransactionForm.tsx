import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { axiosClient } from "../helper/axios"

export interface IFormData{
    type: string
    account_id: string
    amount: number
    date: Date
    description: string
}

export interface IAccount{
    id: string
    name: string
}

export function NewTransactionForm(){
    const [ accounts, setAccounts ] = useState<[]>([])
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const { handleSubmit, register } = useForm<IFormData>()

    function getAccountsList(){
        axiosClient.get('accounts')
            .then(response => {
                setAccounts(response.data.accounts)
                setIsLoading(false)
            })
    }

    const onSubmit: SubmitHandler<IFormData> = async (data) => {
        await axiosClient.post('transactions', data)
    }
    
    useEffect( ()=>{
        getAccountsList()
    }, [])

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" {...register('type')} />
            </fieldset>

            <fieldset>
                <label htmlFor="account_id">Account:</label>
                <select id="account_id" {...register('account_id')}>
                    { accounts?.map((account: IAccount) => <option value={account.id}>{account.name}</option>)}
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="amount">Amount:</label>
                <input type="number" id="amonut" {...register('amount')} />
            </fieldset>

            <fieldset>
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" {...register('date')} />
            </fieldset>

            <fieldset>
                <label htmlFor="desc">Description:</label>
                <input type="text" id="description" {...register('description')} />
            </fieldset>

            <button type="submit" disabled={isLoading}>Create</button>
        </form>
    )
}