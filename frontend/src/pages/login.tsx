import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from "react-router"
import { Input } from '../components/Input'
import { Label } from '../components/Label'
import { Field } from '../components/Field'

export interface IFormData{
    email: string
    password: string
}

export function Login(){
    const { handleSubmit, register } = useForm<IFormData>()
    
    let navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormData> = async (formData) => {
        const { data, status } = await axios.post('http://localhost:3000/auth', formData, {headers: {'Content-Type': 'application/json'}})
        if(status === 200){
            const accessToken = data?.payload?.accessToken
            const refreshToken = data?.payload?.refreshToken
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            navigate("/dashboard");
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field>
                <Label forField="email">Email:</Label>
                <Input type="email" id="email" {...register('email')}/>
            </Field>

            <Field>
                <Label forField="password">Password:</Label>
                <Input type="password" id="password" {...register('password')}/>
            </Field>

            <button type="submit">Login</button>
        </form>
    )
}