import React from 'react'
import { useState } from 'react'

function Login() {

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const handleSubmit = () => {

    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder='username'
                value={Username}
                onChange={(e) => { setUsername(e.target.value) }} />

            <div></div>

            <input type="text" placeholder='password' value={Password}
                onChange={(e) => { setPassword(e.target.value) }} />

            <div></div>
            
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login
