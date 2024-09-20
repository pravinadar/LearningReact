import UserContext from "./UserContext"
import { useState } from "react"


const UserContextProvider=({children})=>{

    const [User, setUser] = useState(null)

    return(
        <UserContext.Provider value={{User,setUser}}>
        {childern}
        </UserContext.Provider>

    )
}

export default UserContextProvider 