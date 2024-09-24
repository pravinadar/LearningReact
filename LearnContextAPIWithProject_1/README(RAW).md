made the Context folder where the UserContext.js file is created and created context using createContext(), put it in a variable and exported it
const UserContext = createContext()

how it works is :
now when i use 'UserContext' as a wrapper for example
<UserContext.Provider value={/* some value */}>
    <Anything/>
    <Card>
        <Data/>
    </Card>
</UserContext.Provider>

This value prop is the data or state that you want to make accessible to all the components within this Provider. Then, you can access this value in any child component using useContext(UserContext).

Then made the UserContextProvider.jsx file where i made 
```jsx
import UserContext from "./UserContext"
import { useState } from "react"


const UserContextProvider=({children})=>{

    const [User, setUser] = useState(null)

    return(
        <UserContext.Provider value={{User,setUser}}>
        {children}
        </UserContext.Provider>

    )
}

export default UserContextProvider 
```

and then we did this in the App.jsx
```jsx
import { useState } from 'react'
import Login from './Components/Login'
import Profile from './Components/Profile'
import UserContextProvider from './Context/UserContextProvider'

function App() {

  return (
    <>
      <UserContextProvider>

        <Login />         {/*  made login and profile components in the components folder */}

        <Profile />

      </UserContextProvider>

    </>
  )
}
export default App

```
Login.jsx
```jsx
import React, { useContext } from 'react'
import { useState } from 'react'
import UserContext from '../Context/UserContext'

function Login() {

    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({Username,Password})

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

```

Profile.jsx

```jsx
import React from 'react'
import { useContext } from 'react'
import UserContext from '../Context/UserContext'

function Profile() {

  const { User } = useContext(UserContext)

  return (
    <div>
      <h1>Profile</h1>
      {User ? (
        <>
          <p>Username: {User.Username}</p>
          <p>Password: {User.Password}</p>
        </>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  )
}

export default Profile


```

