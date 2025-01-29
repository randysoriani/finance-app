import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { SectionHeader } from "../components/SectionHeader";
import { SlGraph } from "react-icons/sl";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Modal } from "../components/Modal";
import { useEffect, useState } from "react";
import { axiosClient } from "../helper/axios";

export function Investments(){
    const [isNewInvestmentFormVisible, setIsNewInvestmentFormVisible] = useState<boolean>(false)

    function closeModalForm(){
        setIsNewInvestmentFormVisible(false)
    }

    return(
        <>
            <Modal title='New account form' open={isNewInvestmentFormVisible} onClose={closeModalForm} >
                <NewInvestmentForm />
            </Modal>
            <SectionHeader title='Investments' subtitle="Control all investments" icon={<SlGraph size={38}/>} />

            <Button onClick={() => {setIsNewInvestmentFormVisible(true)}}>New investment</Button>
            
        </>
    )
}

export interface IFormData{
    id: string
    number: string
    tax_b3: number
    tax_register: number
    tax_emoluments: number
    bid_total: number
    date: Date
    lines: [
        { id: string, investments_id: string, ticker: string, qty: number, price: number, type: string}
    ]
}

export interface IAccount{
    id: string
    name: string
}

export function NewInvestmentForm(){
    const { register, handleSubmit, control } = useForm()
    const [ accounts, setAccounts ] = useState<[]>([])
    const { fields, remove, append } = useFieldArray({control, name: 'lines'})

    function getAccountsList(){
        axiosClient.get('accounts')
            .then(response => {
                setAccounts(response.data.accounts)
            })
    }
    
    useEffect( ()=>{
        getAccountsList()
    }, [])

    const submitData = async (data: any) => {
        await axiosClient.post('trades', data)
    };

    return(
        <form onSubmit={handleSubmit(submitData)}>
            <div className='bg-white p-4 rounded shadow-sm'>
                <div className='flex gap-2'>
                    <Field>
                        <Label forField='account_id'>Account:</Label>
                        <select id="account_id" {...register('account_id')}>
                            { accounts?.map((account: IAccount) => <option key={account.id} value={account.id}>{account.name}</option>)}
                        </select>
                    </Field>

                    <Field>
                        <Label forField="number" >Doc number</Label>
                        <Input {...register('doc_number')} />
                    </Field>

                    <Field>
                        <Label forField="date" >Date</Label>
                        <Input {...register('date')} />
                    </Field>
                </div>

                <div className='flex gap-2'>
                    <Field>
                        <Label forField="tax_b3" >Tax B3</Label>
                        <Input {...register('tax_b3')} />
                    </Field>

                    <Field>
                        <Label forField="tax_register" >Tax register</Label>
                            <Input {...register('tax_register')} />
                    </Field>

                    <Field>
                        <Label forField="tax_perquisite" >Tax perquisite</Label>
                        <Input {...register('tax_perquisite')} />
                    </Field>
                </div>

                <div>
                    <div className='flex justify-between mt-4 items-center'>
                        <h3>Lines</h3>
                        <Button onClick={() => append({})}>Add line</Button>
                    </div>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className='flex gap-2 align-bottom items-end space-y-4'>
                                <Field>
                                    <Label forField="type" >Type</Label>
                                    <Input {...register(`lines.${index}.type`)} />
                                </Field>

                                <Field>
                                    <Label forField="ticker" >Ticker</Label>
                                    <Input {...register(`lines.${index}.ticker`)} />
                                </Field>

                                <Field>
                                    <Label forField="qty" >Qty</Label>
                                    <Input {...register(`lines.${index}.qty`)} />
                                </Field>

                                <Field>
                                    <Label forField="price" >Price</Label>
                                    <Input {...register(`lines.${index}.price`)} />
                                </Field>

                                <Button onClick={() => remove(index)} kind="Icon">
                                    <RiDeleteBin6Fill />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Button type='submit' onClick={handleSubmit(submitData)}>Submit</Button>
        </form>
    )
}