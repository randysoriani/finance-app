import { useState } from "react"

export function Login(){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function handleFormSubmit(e){
        e.preventDefault()
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

            <button type="submit">Login</button>
        </form>
    )
}