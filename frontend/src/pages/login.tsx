import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from "react-router"
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
        <main className='bg-gray-100 flex items-center justify-center h-screen'>
            <div className='p-4 shadow bg-white rounded'>
                <form onSubmit={handleSubmit(onSubmit)}
                      className=' max-w-fit flex flex-col gap-4'>
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
                <NavLink to='/register'
                    className='mt-2 block text-center'>
                    Register new user</NavLink>
            </div>
	    </main>
    )
}