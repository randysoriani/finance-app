import axios from 'axios'
import {  SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from "react-router"

export interface IFormData{
    email: string
    password: string
}

export function Register(){
    const { handleSubmit, register } = useForm<IFormData>()
    
    let navigate = useNavigate();

    const onSubmit: SubmitHandler<IFormData> = async (formData) => {
        const { data, status } = await axios.post('http://localhost:3000/users', formData, {headers: {'Content-Type': 'application/json'}})
        if(status === 201){
            const accessToken = data.payload.accessToken
            const refreshToken = data.payload.refreshToken
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            navigate("/dashboard");
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" {...register('email')} />
            </fieldset>

            <fieldset>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" {...register('password')} />
            </fieldset>

            <button type="submit">Register</button>
        </form>
    )
}