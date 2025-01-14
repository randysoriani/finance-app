import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form'
import { axiosClient } from "../helper/axios"

export interface IFormData{
    name: string
    description: string
    agency: number
    account: number
    institution_id: string
}

export function NewAccountForm(){
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [institutions, setInstitutions] = useState<[]>([])

    const { handleSubmit, register } = useForm<IFormData>()

    function getInstitutionsList(){
        axiosClient.get('institutions')
            .then(response => {
                setInstitutions(response.data.institutions)
                setIsLoading(false)
            })
    }

    const onSubmit: SubmitHandler<IFormData> = async (data) => {
        const accessToken = localStorage.getItem('accessToken')
        await axiosClient.post('accounts', data, {headers: {'Authorization': 'Bearer ' + accessToken}})
    }
    
    useEffect( ()=>{
        getInstitutionsList()
    }, [])

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register('name')} />
            </fieldset>
            <fieldset>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" {...register('description')} />
            </fieldset>
            <fieldset>
                <label htmlFor="agency">Agency:</label>
                <input type="number" id="agency" {...register('agency')} />
            </fieldset>
            <fieldset>
                <label htmlFor="account">Account:</label>
                <input type="number" id="account" {...register('account')} />
            </fieldset>
            <fieldset>
                <label htmlFor="institution">Institution:</label>
                <select id="Institution_id" {...register('institution_id')} >
                    { isLoading === false && institutions?.map((item: any) => 
                        <option key={item.id} value={item.id} >{item.name}</option>)}
                </select>
            </fieldset>
            <button type="submit" disabled={isLoading}>Create</button>
        </form>
    )
}