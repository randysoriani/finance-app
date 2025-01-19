import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { axiosClient } from "../helper/axios"
import { Label } from './Label'
import { Input } from './Input'
import { Field } from './Field'

export interface ITransactionForm{
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
    const { handleSubmit, register } = useForm<ITransactionForm>()

    function getAccountsList(){
        axiosClient.get('accounts')
            .then(response => {
                setAccounts(response.data.accounts)
                setIsLoading(false)
            })
    }

    const onSubmit: SubmitHandler<ITransactionForm> = async (data) => {
        await axiosClient.post('transactions', data)
    }
    
    useEffect( ()=>{
        getAccountsList()
    }, [])

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <Label forField='type'>Type:</Label>
                <Input type="text" id="type" {...register('type')} />
            </Field>

            <Field>
                <Label forField='account_id'>Account:</Label>
                <select id="account_id" {...register('account_id')}>
                    { accounts?.map((account: IAccount) => <option value={account.id}>{account.name}</option>)}
                </select>
            </Field>

            <Field>
                <Label forField='amount'>Amount:</Label>
                <Input type="number" id="amonut" {...register('amount')} />
            </Field>

            <Field>
                <Label forField='date'>Date:</Label>
                <Input type="date" id="date" {...register('date')} />
            </Field>

            <Field>
                <Label forField='desc'>Description:</Label>
                <Input type="text" id="description" {...register('description')} />
            </Field>

            <button type="submit" disabled={isLoading}>Create</button>
        </form>
    )
}