import { FormEvent, useState } from "react"
import axios from 'axios'

export function Register(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function handleFormSubmit(e: FormEvent){
        e.preventDefault()
        const { data, status } = await axios.post('http://localhost:3000/users', {email, password}, {headers: {'Content-Type': 'application/json'}})
        if(status === 201){
            console.log('Success: ', data)
        }
    }

    return(
        <form onSubmit={handleFormSubmit}>
            <fieldset>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </fieldset>

            <fieldset>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </fieldset>

            <button type="submit">Register</button>
        </form>
    )
}