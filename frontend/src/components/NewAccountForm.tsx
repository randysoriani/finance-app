import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form'
import { axiosClient } from "../helper/axios"
import { Field } from "./Field"
import { Label } from "./Label"
import { Input } from "./Input"

export interface IAccountForm{
    name: string
    description: string
    agency: number
    account: number
    institution_id: string
}

export function NewAccountForm(){
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [institutions, setInstitutions] = useState<[]>([])

    const { handleSubmit, register } = useForm<IAccountForm>()

    function getInstitutionsList(){
        axiosClient.get('institutions')
            .then(response => {
                setInstitutions(response.data.institutions)
                setIsLoading(false)
            })
    }

    const onSubmit: SubmitHandler<IAccountForm> = async (data) => {
        const accessToken = localStorage.getItem('accessToken')
        await axiosClient.post('accounts', data, {headers: {'Authorization': 'Bearer ' + accessToken}})
    }
    
    useEffect( ()=>{
        getInstitutionsList()
    }, [])

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <Label forField="name">Name:</Label>
                <Input type="text" id="name" {...register('name')} />
            </Field>
            <Field>
                <Label forField="description">Description:</Label>
                <Input type="text" id="description" {...register('description')} />
            </Field>
            <Field>
                <Label forField="agency">Agency:</Label>
                <Input type="number" id="agency" {...register('agency')} />
            </Field>
            <Field>
                <Label forField="account">Account:</Label>
                <Input type="number" id="account" {...register('account')} />
            </Field>
            <Field>
                <Label forField="institution">Institution:</Label>
                <select id="Institution_id" {...register('institution_id')} >
                    { isLoading === false && institutions?.map((item: any) => 
                        <option key={item.id} value={item.id} >{item.name}</option>)}
                </select>
            </Field>
            <button type="submit" disabled={isLoading}>Create</button>
        </form>
    )
}